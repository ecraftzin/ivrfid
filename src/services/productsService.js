import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all published products
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async (category = null) => {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object>} Product object
 */
export const getProductBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const notFoundError = new Error(`Product with slug "${slug}" not found`);
      notFoundError.isNotFound = true;
      throw notFoundError;
    }

    return data;
  } catch (error) {
    // Only log database errors, not "not found" errors
    if (!error.isNotFound) {
      console.error('Error fetching product:', error);
    }
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error(`Product with ID "${id}" not found`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

/**
 * Fetch product subcategories by category slug
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} Array of subcategories with product count
 */
export const getProductSubcategoriesByCategory = async (categorySlug) => {
  try {
    // Convert slug to category name (replace underscores with spaces)
    const categoryName = categorySlug.replace(/_/g, ' ');

    // Get products in this category
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id')
      .ilike('category', categoryName)
      .eq('is_published', true);

    if (prodError) throw prodError;

    if (!products || products.length === 0) {
      return [];
    }

    // Get all product IDs
    const productIds = products.map(p => p.id);

    // Get subcategories for these products
    const { data, error } = await supabase
      .from('product_subcategories')
      .select('*')
      .in('product_id', productIds)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    // Since subcategories now belong to products, we show them as-is
    // Note: A subcategory now represents a feature/aspect of a single product
    return data || [];
  } catch (error) {
    console.error('Error fetching product subcategories:', error);
    throw error;
  }
};

/**
 * Fetch products by subcategory ID
 * Since subcategories now belong to products, this returns the parent product
 * @param {string} subcategoryId - Subcategory ID
 * @returns {Promise<Array>} Array of products (typically just the parent product)
 */
export const getProductsBySubcategory = async (subcategoryId) => {
  try {
    // Get the subcategory to find its parent product
    const { data: subcategory, error: subError } = await supabase
      .from('product_subcategories')
      .select('product_id')
      .eq('id', subcategoryId)
      .maybeSingle();

    if (subError) throw subError;

    if (!subcategory || !subcategory.product_id) {
      return [];
    }

    // Get the parent product
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', subcategory.product_id)
      .eq('is_published', true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    throw error;
  }
};

/**
 * Fetch product subcategory by slug
 * @param {string} slug - Subcategory slug
 * @returns {Promise<Object>} Subcategory object
 */
export const getProductSubcategoryBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const notFoundError = new Error(`Product subcategory with slug "${slug}" not found`);
      notFoundError.isNotFound = true;
      throw notFoundError;
    }

    return data;
  } catch (error) {
    // Only log database errors, not "not found" errors
    if (!error.isNotFound) {
      console.error('Error fetching product subcategory:', error);
    }
    throw error;
  }
};

/**
 * Fetch featured products
 * @returns {Promise<Array>} Array of featured products
 */
export const getFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(6);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

/**
 * Search products
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Fetch subcategories for a specific product
 * @param {string} productId - Product ID
 * @returns {Promise<Array>} Array of subcategories
 */
export const getSubcategoriesByProductId = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching product subcategories:', error);
    throw error;
  }
};

