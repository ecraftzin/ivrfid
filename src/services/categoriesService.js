import { supabase } from '../lib/supabaseClient';

/**
 * Categories Service
 * Provides functions to fetch product and solution categories
 */

/**
 * Fetch all active product categories
 * @returns {Promise<Array>} Array of product categories
 */
export const getProductCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
};

/**
 * Fetch all active solution categories
 * @returns {Promise<Array>} Array of solution categories
 */
export const getSolutionCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching solution categories:', error);
    return [];
  }
};

/**
 * Fetch product category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category object
 */
export const getProductCategoryBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product category:', error);
    throw error;
  }
};

/**
 * Fetch solution category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category object
 */
export const getSolutionCategoryBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('solution_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching solution category:', error);
    throw error;
  }
};

export default {
  getProductCategories,
  getSolutionCategories,
  getProductCategoryBySlug,
  getSolutionCategoryBySlug,
};

