import { supabase } from '../../lib/supabaseClient';

/**
 * Storage Service
 * Handles file uploads and management using Supabase Storage
 */

const BUCKET_NAME = 'media'; // Default bucket name

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder path (e.g., 'solutions', 'products', 'blog')
 * @returns {Promise<{data: {path: string, url: string}, error: null} | {data: null, error: Error}>}
 */
export const uploadFile = async (file, folder = '') => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      data: {
        path: filePath,
        url: publicUrl
      },
      error: null
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { data: null, error };
  }
};

/**
 * Upload multiple files
 * @param {FileList|Array} files - Files to upload
 * @param {string} folder - Optional folder path
 * @returns {Promise<{data: Array, error: null} | {data: null, error: Error}>}
 */
export const uploadMultipleFiles = async (files, folder = '') => {
  try {
    const uploadPromises = Array.from(files).map(file => uploadFile(file, folder));
    const results = await Promise.all(uploadPromises);
    
    // Check if any uploads failed
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      throw new Error(`${errors.length} file(s) failed to upload`);
    }

    return {
      data: results.map(r => r.data),
      error: null
    };
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    return { data: null, error };
  }
};

/**
 * Delete a file from storage
 * @param {string} filePath - Path to the file in storage
 * @returns {Promise<{error: null} | {error: Error}>}
 */
export const deleteFile = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { error };
  }
};

/**
 * List files in a folder
 * @param {string} folder - Folder path
 * @returns {Promise<{data: Array, error: null} | {data: null, error: Error}>}
 */
export const listFiles = async (folder = '') => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    // Get public URLs for all files
    const filesWithUrls = data.map(file => {
      const filePath = folder ? `${folder}/${file.name}` : file.name;
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return {
        ...file,
        path: filePath,
        url: publicUrl
      };
    });

    return { data: filesWithUrls, error: null };
  } catch (error) {
    console.error('Error listing files:', error);
    return { data: null, error };
  }
};

/**
 * Get public URL for a file
 * @param {string} filePath - Path to the file
 * @returns {string} Public URL
 */
export const getPublicUrl = (filePath) => {
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  
  return publicUrl;
};

/**
 * Create storage bucket if it doesn't exist
 * Note: This requires service role key, should be done via Supabase dashboard
 */
export const createBucket = async (bucketName = BUCKET_NAME) => {
  try {
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating bucket:', error);
    return { data: null, error };
  }
};

export default {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  listFiles,
  getPublicUrl,
  createBucket,
};

