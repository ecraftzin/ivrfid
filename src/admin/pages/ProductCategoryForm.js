import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
} from '../services/adminCategoriesService';
import Loading from '../../components/Loading/Loading';
import ImageUpload from '../components/ImageUpload';
import './ContentForm.css';

const ProductCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    breadcrumb_image_url: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    setLoading(true);
    const { data, error } = await getProductCategoryById(id);
    if (error) {
      toast.error('Failed to load category');
      console.error(error);
      navigate('/admin/product-categories');
    } else {
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        image_url: data.image_url || '',
        breadcrumb_image_url: data.breadcrumb_image_url || '',
        display_order: data.display_order || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
      });
    }
    setLoading(false);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from name if creating new category
    if (name === 'name' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (!formData.slug.trim()) {
      toast.error('Category slug is required');
      return;
    }

    setSaving(true);

    const categoryData = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      image_url: formData.image_url || null,
      breadcrumb_image_url: formData.breadcrumb_image_url || null,
      display_order: parseInt(formData.display_order) || 0,
      is_active: formData.is_active,
    };

    let result;
    if (isEdit) {
      result = await updateProductCategory(id, categoryData);
    } else {
      result = await createProductCategory(categoryData);
    }

    setSaving(false);

    if (result.error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} category`);
      console.error(result.error);
    } else {
      toast.success(`Category ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/product-categories');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-form-page">
      <div className="form-header">
        <h1>{isEdit ? 'Edit' : 'Add New'} Product Category</h1>
        <button
          type="button"
          onClick={() => navigate('/admin/product-categories')}
          className="btn-secondary"
        >
          ← Back to Categories
        </button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., RFID Tags"
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
              placeholder="e.g., rfid-tags"
              required
            />
            <small>URL-friendly version of the name (lowercase, hyphens only)</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            {/* <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this category"
              rows="3"
            /> */}
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              modules={quillModules}
              placeholder="Brief description of the category..."
            />
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
              <small>Lower numbers appear first</small>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                <span>Active (visible on website)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Category Image</h2>
          <p className="section-description">
            Upload an image to represent this category. This will be displayed on the products page.
          </p>
          <ImageUpload
            currentImage={formData.image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            folder="categories/products"
          />
        </div>

        <div className="form-section">
          <h2>Page Title Background (Breadcrumb)</h2>
          <p className="section-description">
            Upload a background image for the page title / breadcrumb area. This image will be used in the front-end `PageTitle` component if provided.
          </p>
          <ImageUpload
            currentImage={formData.breadcrumb_image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, breadcrumb_image_url: url }))}
            folder="categories/products/breadcrumbs"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/product-categories')}
            className="btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : (isEdit ? 'Update Category' : 'Create Category')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCategoryForm;

