-- Add image_url column to product_categories table
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add image_url column to solution_categories table
ALTER TABLE solution_categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add breadcrumb (page title background) image column to product_categories table
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS breadcrumb_image_url TEXT;

-- Add breadcrumb (page title background) image column to solution_categories table
ALTER TABLE solution_categories ADD COLUMN IF NOT EXISTS breadcrumb_image_url TEXT;

-- Add comment to columns
COMMENT ON COLUMN product_categories.image_url IS 'URL of the category image stored in Supabase storage';
COMMENT ON COLUMN solution_categories.image_url IS 'URL of the category image stored in Supabase storage';
COMMENT ON COLUMN product_categories.breadcrumb_image_url IS 'URL of the page title (breadcrumb) background image stored in Supabase storage';
COMMENT ON COLUMN solution_categories.breadcrumb_image_url IS 'URL of the page title (breadcrumb) background image stored in Supabase storage';
