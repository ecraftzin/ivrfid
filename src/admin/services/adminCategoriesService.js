import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Categories Service
 * Provides CRUD operations for managing categories in the admin panel
 */

// ============ PRODUCT CATEGORIES ============

export const getAllProductCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return { data: null, error };
  }
};

export const getProductCategoryById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product category:', error);
    return { data: null, error };
  }
};

export const createProductCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating product category:', error);
    return { data: null, error };
  }
};

export const updateProductCategory = async (id, categoryData) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update({ ...categoryData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating product category:', error);
    return { data: null, error };
  }
};

export const deleteProductCategory = async (id) => {
  try {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting product category:', error);
    return { error };
  }
};

export const toggleProductCategoryActiveStatus = async (id, currentStatus) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error toggling product category active status:', error);
    return { data: null, error };
  }
};

// ============ SOLUTION CATEGORIES ============

export const getAllSolutionCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution categories:', error);
    return { data: null, error };
  }
};

export const getSolutionCategoryById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution category:', error);
    return { data: null, error };
  }
};

export const createSolutionCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating solution category:', error);
    return { data: null, error };
  }
};

export const updateSolutionCategory = async (id, categoryData) => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .update({ ...categoryData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating solution category:', error);
    return { data: null, error };
  }
};

export const deleteSolutionCategory = async (id) => {
  try {
    const { error } = await supabase
      .from('solution_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting solution category:', error);
    return { error };
  }
};

export const toggleSolutionCategoryActiveStatus = async (id, currentStatus) => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error toggling solution category active status:', error);
    return { data: null, error };
  }
};

const adminCategoriesService = {
  getAllProductCategories,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  toggleProductCategoryActiveStatus,
  getAllSolutionCategories,
  getSolutionCategoryById,
  createSolutionCategory,
  updateSolutionCategory,
  deleteSolutionCategory,
  toggleSolutionCategoryActiveStatus,
};

export default adminCategoriesService;


