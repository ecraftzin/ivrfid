import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getProductSubcategoryById,
  createProductSubcategory,
  updateProductSubcategory,
} from '../services/adminProductSubcategoriesService';
import { getAllProducts } from '../services/adminProductsService';
import Loading from '../../components/Loading/Loading';
import ImageUpload from '../components/ImageUpload';
import './ContentForm.css';
import './BlogForm.css';

const ProductSubcategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    product_id: '',
    image_url: '',
    display_order: 0,
    is_active: true,
  });

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    loadProducts();
    if (isEdit) {
      loadSubcategory();
    }
  }, [id]);

  const loadProducts = async () => {
    const { data, error } = await getAllProducts();
    if (error) {
      toast.error('Failed to load products');
      console.error(error);
    } else {
      // Only show published products
      setProducts(data?.filter(p => p.is_published) || []);
    }
  };

  const loadSubcategory = async () => {
    setLoading(true);
    const { data, error } = await getProductSubcategoryById(id);
    if (error) {
      toast.error('Failed to load subcategory');
      console.error(error);
      navigate('/admin/product-subcategories');
    } else {
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        product_id: data.product_id || '',
        image_url: data.image_url || '',
        display_order: data.display_order || 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
      });
    }
    setLoading(false);
  };

  const generateSlug = (title) => {
    return title
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

    // Auto-generate slug from title if creating new subcategory
    if (name === 'title' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Subcategory title is required');
      return;
    }

    if (!formData.slug.trim()) {
      toast.error('Subcategory slug is required');
      return;
    }

    if (!formData.product_id) {
      toast.error('Parent product is required');
      return;
    }

    setSaving(true);

    const subcategoryData = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      description: formData.description,
      product_id: formData.product_id,
      image_url: formData.image_url || null,
      display_order: parseInt(formData.display_order) || 0,
      is_active: formData.is_active,
    };

    let result;
    if (isEdit) {
      result = await updateProductSubcategory(id, subcategoryData);
    } else {
      result = await createProductSubcategory(subcategoryData);
    }

    setSaving(false);

    if (result.error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} subcategory`);
      console.error(result.error);
    } else {
      toast.success(`Subcategory ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/product-subcategories');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-form-page">
      <div className="form-header">
        <h1>{isEdit ? 'Edit' : 'Add New'} Product Subcategory</h1>
        <button
          type="button"
          onClick={() => navigate('/admin/product-subcategories')}
          className="btn-secondary"
        >
          ← Back to Subcategories
        </button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="product_id">Parent Product *</label>
            <select
              id="product_id"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
            <small>This subcategory will belong to the selected product</small>
          </div>

          <div className="form-group">
            <label htmlFor="title">Subcategory Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., UHF RFID Tags"
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
              placeholder="e.g., uhf-rfid-tags"
              required
            />
            <small>URL-friendly version of the title (lowercase, hyphens only)</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              modules={quillModules}
              placeholder="Brief description of this subcategory..."
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
          <h2>Subcategory Image</h2>
          <p className="section-description">
            Upload an image to represent this subcategory. This will be displayed on the products page.
          </p>
          <ImageUpload
            currentImage={formData.image_url}
            onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            folder="subcategories/products"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/product-subcategories')}
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
            {saving ? 'Saving...' : (isEdit ? 'Update Subcategory' : 'Create Subcategory')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSubcategoryForm;
