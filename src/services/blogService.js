import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all published blog posts
 * @param {number} limit - Optional limit
 * @returns {Promise<Array>} Array of blog posts
 */
export const getAllBlogPosts = async (limit = null) => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object>} Blog post object
 */
export const getBlogPostBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error(`Blog post with slug "${slug}" not found`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Fetch blog posts by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogPostsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    throw error;
  }
};

/**
 * Fetch recent blog posts
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} Array of recent blog posts
 */
export const getRecentBlogPosts = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    throw error;
  }
};

/**
 * Search blog posts
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching blog posts
 */
export const searchBlogPosts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw error;
  }
};

