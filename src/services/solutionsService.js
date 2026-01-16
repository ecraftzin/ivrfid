import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all published solutions
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Array of solutions
 */
export const getAllSolutions = async (category = null) => {
  try {
    let query = supabase
      .from('solutions')
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
    console.error('Error fetching solutions:', error);
    throw error;
  }
};

/**
 * Fetch a single solution by slug
 * @param {string} slug - Solution slug
 * @returns {Promise<Object>} Solution object
 */
export const getSolutionBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const notFoundError = new Error(`Solution with slug "${slug}" not found`);
      notFoundError.isNotFound = true;
      throw notFoundError;
    }

    return data;
  } catch (error) {
    // Only log database errors, not "not found" errors
    if (!error.isNotFound) {
      console.error('Error fetching solution:', error);
    }
    throw error;
  }
};

/**
 * Fetch a single solution by ID
 * @param {string} id - Solution ID
 * @returns {Promise<Object>} Solution object
 */
export const getSolutionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error(`Solution with ID "${id}" not found`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching solution:', error);
    throw error;
  }
};

/**
 * Fetch solutions by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of solutions
 */
export const getSolutionsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('display_order', { ascending: true});

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching solutions by category:', error);
    throw error;
  }
};

/**
 * Fetch solution subcategories by category slug
 * @param {string} categorySlug - Category slug
 * @returns {Promise<Array>} Array of subcategories with solution count
 */
export const getSolutionSubcategoriesByCategory = async (categorySlug) => {
  try {
    // Convert slug to category name (replace underscores with spaces)
    const categoryName = categorySlug.replace(/_/g, ' ');

    // Get solutions in this category
    const { data: solutions, error: solError } = await supabase
      .from('solutions')
      .select('id')
      .ilike('category', categoryName)
      .eq('is_published', true);

    if (solError) throw solError;

    if (!solutions || solutions.length === 0) {
      return [];
    }

    // Get all solution IDs
    const solutionIds = solutions.map(s => s.id);

    // Get subcategories for these solutions
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select('*')
      .in('solution_id', solutionIds)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    // Since subcategories now belong to solutions, we show them as-is
    // Note: A subcategory now represents a feature/aspect of a single solution
    return data || [];
  } catch (error) {
    console.error('Error fetching solution subcategories:', error);
    throw error;
  }
};

/**
 * Fetch solutions by subcategory ID
 * Since subcategories now belong to solutions, this returns the parent solution
 * @param {string} subcategoryId - Subcategory ID
 * @returns {Promise<Array>} Array of solutions (typically just the parent solution)
 */
export const getSolutionsBySubcategory = async (subcategoryId) => {
  try {
    // Get the subcategory to find its parent solution
    const { data: subcategory, error: subError } = await supabase
      .from('solution_subcategories')
      .select('solution_id')
      .eq('id', subcategoryId)
      .maybeSingle();

    if (subError) throw subError;

    if (!subcategory || !subcategory.solution_id) {
      return [];
    }

    // Get the parent solution
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('id', subcategory.solution_id)
      .eq('is_published', true);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching solutions by subcategory:', error);
    throw error;
  }
};

/**
 * Fetch solution subcategory by slug
 * @param {string} slug - Subcategory slug
 * @returns {Promise<Object>} Subcategory object
 */
export const getSolutionSubcategoryBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const notFoundError = new Error(`Solution subcategory with slug "${slug}" not found`);
      notFoundError.isNotFound = true;
      throw notFoundError;
    }

    return data;
  } catch (error) {
    // Only log database errors, not "not found" errors
    if (!error.isNotFound) {
      console.error('Error fetching solution subcategory:', error);
    }
    throw error;
  }
};

/**
 * Search solutions
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching solutions
 */
export const searchSolutions = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%,overview.ilike.%${searchTerm}%`)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching solutions:', error);
    throw error;
  }
};

/**
 * Fetch subcategories for a specific solution
 * @param {string} solutionId - Solution ID
 * @returns {Promise<Array>} Array of subcategories
 */
export const getSubcategoriesBySolutionId = async (solutionId) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select('*')
      .eq('solution_id', solutionId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching solution subcategories:', error);
    throw error;
  }
};
