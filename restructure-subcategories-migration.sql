-- Migration: Restructure Subcategories to Belong to Products/Solutions
-- This changes subcategories from belonging to categories to belonging to individual items

-- Step 1: Drop existing foreign key constraints
ALTER TABLE product_subcategories DROP CONSTRAINT IF EXISTS product_subcategories_category_id_fkey;
ALTER TABLE solution_subcategories DROP CONSTRAINT IF EXISTS solution_subcategories_category_id_fkey;

-- Step 2: Rename category_id columns to product_id/solution_id
ALTER TABLE product_subcategories RENAME COLUMN category_id TO product_id;
ALTER TABLE solution_subcategories RENAME COLUMN category_id TO solution_id;

-- Step 3: Remove NOT NULL constraint to allow clearing old data
ALTER TABLE product_subcategories ALTER COLUMN product_id DROP NOT NULL;
ALTER TABLE solution_subcategories ALTER COLUMN solution_id DROP NOT NULL;

-- Step 4: Clear old data before adding foreign key constraints
-- The renamed columns still contain category IDs which don't exist in products/solutions tables
UPDATE product_subcategories SET product_id = NULL;
UPDATE solution_subcategories SET solution_id = NULL;

-- Step 5: Now add the foreign key constraints with clean data
ALTER TABLE product_subcategories
ADD CONSTRAINT product_subcategories_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE solution_subcategories
ADD CONSTRAINT solution_subcategories_solution_id_fkey 
FOREIGN KEY (solution_id) REFERENCES solutions(id) ON DELETE CASCADE;

-- Step 6: Remove subcategory_id from products and solutions tables
-- (Since subcategories now belong TO products, products don't reference subcategories)
ALTER TABLE products DROP COLUMN IF EXISTS subcategory_id;
ALTER TABLE solutions DROP COLUMN IF EXISTS subcategory_id;

-- Step 7: Drop existing RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON product_subcategories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON product_subcategories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON product_subcategories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON product_subcategories;

DROP POLICY IF EXISTS "Enable read access for all users" ON solution_subcategories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON solution_subcategories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON solution_subcategories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON solution_subcategories;

-- Step 8: Recreate RLS policies with new structure
CREATE POLICY "Enable read access for all users"
ON product_subcategories FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON product_subcategories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
ON product_subcategories FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
ON product_subcategories FOR DELETE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users"
ON solution_subcategories FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON solution_subcategories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
ON solution_subcategories FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
ON solution_subcategories FOR DELETE
USING (auth.role() = 'authenticated');

-- Note: After running this migration:
-- 1. All existing subcategories now have NULL product_id/solution_id
-- 2. Go to admin panel and reassign subcategories to their parent products/solutions
-- 3. Delete orphaned subcategories that don't have a parent
