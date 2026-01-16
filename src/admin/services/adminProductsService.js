import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Products Service
 * Provides CRUD operations for managing products in the admin panel
 */

// Get all products (including unpublished)
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { data: null, error };
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating product:', error);
    return { data: null, error };
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating product:', error);
    return { data: null, error };
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error };
  }
};

// Toggle publish status
export const togglePublishStatus = async (id, currentStatus) => {
  try {
    const { data, error } = await supabase
      .from('products')
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

// Toggle featured status
export const toggleFeaturedStatus = async (id, currentStatus) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ is_featured: !currentStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return { data: null, error };
  }
};

// Update display order
export const updateDisplayOrder = async (id, newOrder) => {
  try {
    const { data, error } = await supabase
      .from('products')
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

// Duplicate product
export const duplicateProduct = async (id) => {
  try {
    const { data: original, error: fetchError } = await getProductById(id);
    if (fetchError) throw fetchError;

    const duplicate = {
      ...original,
      id: undefined,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      is_published: false,
      created_at: undefined,
      updated_at: undefined,
    };

    return await createProduct(duplicate);
  } catch (error) {
    console.error('Error duplicating product:', error);
    return { data: null, error };
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublishStatus,
  toggleFeaturedStatus,
  updateDisplayOrder,
  duplicateProduct,
};

