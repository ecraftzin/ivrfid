import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Solutions Service
 * Provides CRUD operations for managing solutions in the admin panel
 */

// Get all solutions (including unpublished)
export const getAllSolutions = async () => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return { data: null, error };
  }
};

// Get solution by ID
export const getSolutionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching solution:', error);
    return { data: null, error };
  }
};

// Create new solution
export const createSolution = async (solutionData) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .insert([solutionData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating solution:', error);
    return { data: null, error };
  }
};

// Update solution
export const updateSolution = async (id, solutionData) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .update(solutionData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating solution:', error);
    return { data: null, error };
  }
};

// Delete solution
export const deleteSolution = async (id) => {
  try {
    const { error } = await supabase
      .from('solutions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting solution:', error);
    return { error };
  }
};

// Toggle publish status
export const togglePublishStatus = async (id, currentStatus) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .update({ is_published: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return { data: null, error };
  }
};

// Update display order
export const updateDisplayOrder = async (id, newOrder) => {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .update({ display_order: newOrder })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating display order:', error);
    return { data: null, error };
  }
};

// Duplicate solution
export const duplicateSolution = async (id) => {
  try {
    // First, get the solution to duplicate
    const { data: original, error: fetchError } = await getSolutionById(id);
    if (fetchError) throw fetchError;

    // Create a copy with modified title and slug
    const duplicate = {
      ...original,
      id: undefined, // Remove ID to create new record
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      is_published: false,
      created_at: undefined,
      updated_at: undefined,
    };

    return await createSolution(duplicate);
  } catch (error) {
    console.error('Error duplicating solution:', error);
    return { data: null, error };
  }
};

export default {
  getAllSolutions,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution,
  togglePublishStatus,
  updateDisplayOrder,
  duplicateSolution,
};

