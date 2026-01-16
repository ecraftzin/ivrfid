import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
} from '../services/adminBlogService';
import { uploadFile } from '../services/storageService';
import Loading from '../../components/Loading/Loading';
import './ContentForm.css';
import './BlogForm.css';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: [],
    featured_image: '',
    is_published: false,
    is_featured: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  const [uploading, setUploading] = useState(false);

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadBlogPost();
    }
  }, [id]);

  const loadBlogPost = async () => {
    try {
      const { data, error } = await getBlogPostById(id);
      if (error) throw error;

      setFormData({
        ...data,
        tags: data.tags || [],
        author: data.author || '',
        category: data.category || '',
        excerpt: data.excerpt || '',
        featured_image: data.featured_image || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || '',
      });
    } catch (error) {
      toast.error('Failed to load blog post');
      console.error(error);
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'title' && !isEdit) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));
    setTagInput('');
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug) {
      toast.error('Title and slug are required');
      return;
    }

    setSaving(true);

    try {
      // Normalize array fields for DB (Supabase expects arrays for text[] columns)
      const payload = {
        ...formData,
        tags: Array.isArray(formData.tags) ? formData.tags : (formData.tags ? [formData.tags] : []),
        meta_keywords: Array.isArray(formData.meta_keywords)
          ? formData.meta_keywords
          : (typeof formData.meta_keywords === 'string' && formData.meta_keywords.trim()
            ? formData.meta_keywords.split(',').map(k => k.trim()).filter(Boolean)
            : []),
      };

      const { error } = isEdit
        ? await updateBlogPost(id, payload)
        : await createBlogPost(payload);

      if (error) throw error;

      toast.success(`Blog post ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/blog');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} blog post`);
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data, error } = await uploadFile(file, 'blog');
      if (error) throw error;
      setFormData(prev => ({ ...prev, featured_image: data.url }));
      toast.success('Image uploaded');
    } catch (err) {
      console.error('Upload error', err);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-form-page">
      <div className="page-header">
        <div>
          <h1>{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
          <p>{isEdit ? 'Update blog post' : 'Create a new blog post'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug *</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="featured_image">Featured Image URL</label>
            <input
              type="url"
              id="featured_image"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="featured_file">Upload Featured Image</label>
            <input
              type="file"
              id="featured_file"
              accept="image/*"
              onChange={handleFileUpload}
            />
            {uploading && <div className="uploading">Uploading...</div>}
            {formData.featured_image && (
              <div className="image-preview">
                <img src={formData.featured_image} alt="Preview" style={{ maxWidth: '200px', marginTop: '8px' }} />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Content</h2>
          <div className="form-group">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={quillModules}
              placeholder="Write your blog post content here..."
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Tags</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
            />
            <button type="button" onClick={addTag}>Add</button>
          </div>
          <div className="array-items">
            {formData.tags.map((tag, index) => (
              <div key={index} className="array-item">
                <span>{tag}</span>
                <button type="button" onClick={() => removeTag(index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>SEO Settings</h2>
          <div className="form-group">
            <label htmlFor="meta_title">Meta Title</label>
            <input
              type="text"
              id="meta_title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="meta_description">Meta Description</label>
            <textarea
              id="meta_description"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="meta_keywords">Meta Keywords</label>
            <input
              type="text"
              id="meta_keywords"
              name="meta_keywords"
              value={formData.meta_keywords}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Publishing</h2>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
              />
              <span>Publish this post</span>
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
              />
              <span>Feature this post</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/blog')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

