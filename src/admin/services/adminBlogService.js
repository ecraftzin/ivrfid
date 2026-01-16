import { supabase } from '../../lib/supabaseClient';

/**
 * Admin Blog Service
 * Provides CRUD operations for managing blog posts in the admin panel
 */

// Get all blog posts (including unpublished)
export const getAllBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { data: null, error };
  }
};

// Get blog post by ID
export const getBlogPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { data: null, error };
  }
};

// Create new blog post
export const createBlogPost = async (blogData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { data: null, error };
  }
};

// Update blog post
export const updateBlogPost = async (id, blogData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(blogData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { data: null, error };
  }
};

// Delete blog post
export const deleteBlogPost = async (id) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { error };
  }
};

// Toggle publish status
export const togglePublishStatus = async (id, currentStatus) => {
  try {
    const updateData = { is_published: !currentStatus };
    
    // If publishing, set published_at to now
    if (!currentStatus) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
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
      .from('blog_posts')
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

// Duplicate blog post
export const duplicateBlogPost = async (id) => {
  try {
    const { data: original, error: fetchError } = await getBlogPostById(id);
    if (fetchError) throw fetchError;

    const duplicate = {
      ...original,
      id: undefined,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      is_published: false,
      published_at: null,
      created_at: undefined,
      updated_at: undefined,
    };

    return await createBlogPost(duplicate);
  } catch (error) {
    console.error('Error duplicating blog post:', error);
    return { data: null, error };
  }
};

export default {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  togglePublishStatus,
  toggleFeaturedStatus,
  duplicateBlogPost,
};

