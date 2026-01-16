import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getProductById,
  createProduct,
  updateProduct,
} from '../services/adminProductsService';
import { getAllProductCategories } from '../services/adminCategoriesService';
import Loading from '../../components/Loading/Loading';
import ImageUpload from '../components/ImageUpload';
import './ContentForm.css';
import './BlogForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    short_description: '',
    description: '',
    features: [],
    specifications: [],
    applications: [],
    image_url: '',
    images: [],
    is_published: false,
    is_featured: false,
    display_order: 0,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
  });

  const [featureInput, setFeatureInput] = useState('');
  const [specInput, setSpecInput] = useState('');
  const [appInput, setAppInput] = useState('');

  useEffect(() => {
    const initialize = async () => {
      await loadCategories();
      if (isEdit) {
        await loadProduct();
      } else {
        setLoading(false);
      }
    };
    initialize();
  }, [id]);

  const loadCategories = async () => {
    try {
      const { data, error } = await getAllProductCategories();
      if (error) throw error;
      setCategories(data || []);

      // Set default category if creating new product
      if (!isEdit && data && data.length > 0) {
        setFormData(prev => ({ ...prev, category: data[0].slug }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const loadProduct = async () => {
    try {
      const { data, error } = await getProductById(id);
      if (error) throw error;

      // Convert specifications object to array if needed
      let specifications = data.specifications || [];
      if (specifications && typeof specifications === 'object' && !Array.isArray(specifications)) {
        // Convert object to array of strings like "Key: Value"
        specifications = Object.entries(specifications).map(([key, value]) => `${key}: ${value}`);
      }

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || 'RFID_Tags',
        short_description: data.short_description || '',
        description: data.description || '',
        features: Array.isArray(data.features) ? data.features : [],
        specifications: specifications,
        applications: Array.isArray(data.applications) ? data.applications : [],
        image_url: data.image_url || '',
        images: data.images || [],
        is_published: data.is_published || false,
        is_featured: data.is_featured || false,
        display_order: data.display_order || 0,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: Array.isArray(data.meta_keywords) ? data.meta_keywords : [],
      });
    } catch (error) {
      toast.error('Failed to load product');
      console.error(error);
      navigate('/admin/products');
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

    // Auto-generate slug from title if creating new product
    if (name === 'title' && !isEdit) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addArrayItem = (field, value, setInput) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    setInput('');
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.slug) {
      toast.error('Title and slug are required');
      return;
    }

    setSaving(true);

    try {
      // Ensure arrays are properly formatted (not empty strings)
      const dataToSubmit = {
        ...formData,
        features: Array.isArray(formData.features) ? formData.features : [],
        specifications: Array.isArray(formData.specifications) ? formData.specifications : [],
        applications: Array.isArray(formData.applications) ? formData.applications : [],
        images: Array.isArray(formData.images) ? formData.images : [],
        meta_keywords: Array.isArray(formData.meta_keywords) ? formData.meta_keywords : [],
      };

      const { error } = isEdit
        ? await updateProduct(id, dataToSubmit)
        : await createProduct(dataToSubmit);

      if (error) throw error;

      toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/products');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} product`);
      console.error('Error updating product:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-form-page">
      <div className="page-header">
        <div>
          <h1>{isEdit ? 'Edit Product' : 'New Product'}</h1>
          <p>{isEdit ? 'Update product details' : 'Create a new product'}</p>
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
                placeholder="e.g., RFID On-Metal Tags"
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
                placeholder="e.g., rfid-on-metal-tags"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.length === 0 ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="display_order">Display Order</label>
              <input
                type="number"
                id="display_order"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="short_description">Short Description</label>
            <ReactQuill
              theme="snow"
              value={formData.short_description}
              onChange={(content) => setFormData(prev => ({ ...prev, short_description: content }))}
              modules={quillModules}
              placeholder="Brief description of the product..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Full Description</label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              modules={quillModules}
              placeholder="Detailed description of the product..."
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <ImageUpload
              currentImage={formData.image_url}
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              folder="products"
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Features</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('features', featureInput, setFeatureInput))}
              placeholder="Add a feature"
            />
            <button type="button" onClick={() => addArrayItem('features', featureInput, setFeatureInput)}>
              Add
            </button>
          </div>
          <div className="array-items">
            {formData.features.map((feature, index) => (
              <div key={index} className="array-item">
                <span>{feature}</span>
                <button type="button" onClick={() => removeArrayItem('features', index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Specifications</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={specInput}
              onChange={(e) => setSpecInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('specifications', specInput, setSpecInput))}
              placeholder="Add a specification"
            />
            <button type="button" onClick={() => addArrayItem('specifications', specInput, setSpecInput)}>
              Add
            </button>
          </div>
          <div className="array-items">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="array-item">
                <span>{spec}</span>
                <button type="button" onClick={() => removeArrayItem('specifications', index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Applications</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={appInput}
              onChange={(e) => setAppInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('applications', appInput, setAppInput))}
              placeholder="Add an application"
            />
            <button type="button" onClick={() => addArrayItem('applications', appInput, setAppInput)}>
              Add
            </button>
          </div>
          <div className="array-items">
            {formData.applications.map((app, index) => (
              <div key={index} className="array-item">
                <span>{app}</span>
                <button type="button" onClick={() => removeArrayItem('applications', index)}>×</button>
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
            <label htmlFor="meta_keywords">Meta Keywords (comma-separated)</label>
            <input
              type="text"
              id="meta_keywords"
              name="meta_keywords"
              value={Array.isArray(formData.meta_keywords) ? formData.meta_keywords.join(', ') : ''}
              onChange={(e) => {
                const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k);
                setFormData({ ...formData, meta_keywords: keywords });
              }}
              placeholder="keyword1, keyword2, keyword3"
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
              <span>Publish this product</span>
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
              <span>Feature this product</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

