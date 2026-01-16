-- Database Migration for Subcategories Feature
-- This script adds subcategory tables and columns for products and solutions

-- ============================================
-- 1. Create Product Subcategories Table
-- ============================================
CREATE TABLE IF NOT EXISTS product_subcategories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category_id UUID NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_product_subcategories_category_id ON product_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_product_subcategories_slug ON product_subcategories(slug);
CREATE INDEX IF NOT EXISTS idx_product_subcategories_active ON product_subcategories(is_active);

-- ============================================
-- 2. Create Solution Subcategories Table
-- ============================================
CREATE TABLE IF NOT EXISTS solution_subcategories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category_id UUID NOT NULL REFERENCES solution_categories(id) ON DELETE CASCADE,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_solution_subcategories_category_id ON solution_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_solution_subcategories_slug ON solution_subcategories(slug);
CREATE INDEX IF NOT EXISTS idx_solution_subcategories_active ON solution_subcategories(is_active);

-- ============================================
-- 3. Add Subcategory Column to Products Table
-- ============================================
-- Check if column exists before adding
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'subcategory_id'
  ) THEN
    ALTER TABLE products ADD COLUMN subcategory_id UUID REFERENCES product_subcategories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON products(subcategory_id);

-- ============================================
-- 4. Add Subcategory Column to Solutions Table
-- ============================================
-- Check if column exists before adding
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'solutions' AND column_name = 'subcategory_id'
  ) THEN
    ALTER TABLE solutions ADD COLUMN subcategory_id UUID REFERENCES solution_subcategories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_solutions_subcategory_id ON solutions(subcategory_id);

-- ============================================
-- 5. Enable Row Level Security (RLS)
-- ============================================

-- Enable RLS for product_subcategories
ALTER TABLE product_subcategories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public product subcategories are viewable by everyone" ON product_subcategories;
DROP POLICY IF EXISTS "Authenticated users can manage product subcategories" ON product_subcategories;

-- Policy: Anyone can read active subcategories
CREATE POLICY "Public product subcategories are viewable by everyone"
  ON product_subcategories FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can manage all subcategories
CREATE POLICY "Authenticated users can manage product subcategories"
  ON product_subcategories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Enable RLS for solution_subcategories
ALTER TABLE solution_subcategories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public solution subcategories are viewable by everyone" ON solution_subcategories;
DROP POLICY IF EXISTS "Authenticated users can manage solution subcategories" ON solution_subcategories;

-- Policy: Anyone can read active subcategories
CREATE POLICY "Public solution subcategories are viewable by everyone"
  ON solution_subcategories FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can manage all subcategories
CREATE POLICY "Authenticated users can manage solution subcategories"
  ON solution_subcategories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 6. Add Trigger for Updated Timestamp
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for product_subcategories
DROP TRIGGER IF EXISTS update_product_subcategories_updated_at ON product_subcategories;
CREATE TRIGGER update_product_subcategories_updated_at
  BEFORE UPDATE ON product_subcategories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for solution_subcategories
DROP TRIGGER IF EXISTS update_solution_subcategories_updated_at ON solution_subcategories;
CREATE TRIGGER update_solution_subcategories_updated_at
  BEFORE UPDATE ON solution_subcategories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Migration Complete
-- ============================================
-- This migration adds:
-- 1. product_subcategories table with all necessary fields
-- 2. solution_subcategories table with all necessary fields
-- 3. subcategory_id column to products table
-- 4. subcategory_id column to solutions table
-- 5. Appropriate indexes for performance
-- 6. Row Level Security policies
-- 7. Auto-update triggers for updated_at timestamps
