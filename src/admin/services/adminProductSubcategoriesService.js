import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Product Subcategories Service
 * Provides CRUD operations for managing product subcategories in the admin panel
 */

export const getAllProductSubcategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .select(`
        *,
        products(id, title, category)
      `)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product subcategories:', error);
    return { data: null, error };
  }
};

export const getProductSubcategoriesByProduct = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product subcategories by product:', error);
    return { data: null, error };
  }
};

export const getProductSubcategoryById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product subcategory:', error);
    return { data: null, error };
  }
};

export const createProductSubcategory = async (subcategoryData) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .insert([subcategoryData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating product subcategory:', error);
    return { data: null, error };
  }
};

export const updateProductSubcategory = async (id, subcategoryData) => {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .update({ ...subcategoryData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating product subcategory:', error);
    return { data: null, error };
  }
};

export const deleteProductSubcategory = async (id) => {
  try {
    const { error } = await supabase
      .from('product_subcategories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting product subcategory:', error);
    return { error };
  }
};
