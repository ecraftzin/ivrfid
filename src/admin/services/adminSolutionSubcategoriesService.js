import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Solution Subcategories Service
 * Provides CRUD operations for managing solution subcategories in the admin panel
 */

export const getAllSolutionSubcategories = async () => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select(`
        *,
        solutions(id, title, category)
      `)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution subcategories:', error);
    return { data: null, error };
  }
};

export const getSolutionSubcategoriesBySolution = async (solutionId) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select('*')
      .eq('solution_id', solutionId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution subcategories by solution:', error);
    return { data: null, error };
  }
};

export const getSolutionSubcategoryById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution subcategory:', error);
    return { data: null, error };
  }
};

export const createSolutionSubcategory = async (subcategoryData) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .insert([subcategoryData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating solution subcategory:', error);
    return { data: null, error };
  }
};

export const updateSolutionSubcategory = async (id, subcategoryData) => {
  try {
    const { data, error } = await supabase
      .from('solution_subcategories')
      .update({ ...subcategoryData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating solution subcategory:', error);
    return { data: null, error };
  }
};

export const deleteSolutionSubcategory = async (id) => {
  try {
    const { error } = await supabase
      .from('solution_subcategories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting solution subcategory:', error);
    return { error };
  }
};
