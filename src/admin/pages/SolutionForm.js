import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getSolutionById,
  createSolution,
  updateSolution,
} from '../services/adminSolutionsService';
import { getAllSolutionCategories } from '../services/adminCategoriesService';
import Loading from '../../components/Loading/Loading';
import ImageUpload from '../components/ImageUpload';
import './ContentForm.css';
import './BlogForm.css';

const SolutionForm = () => {
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
    overview: '',
    features: [],
    technologies: [],
    industries: [],
    benefits: [],
    use_cases: [],
    image_url: '',
    icon_name: '',
    color: '#5227FF',
    is_published: false,
    display_order: 0,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    // Link fields
    link: '',
    link_label: '',
    link_target: '_blank',
  });

  const [featureInput, setFeatureInput] = useState('');
  const [technologyInput, setTechnologyInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');
  const [useCaseInput, setUseCaseInput] = useState('');

  useEffect(() => {
    const initialize = async () => {
      await loadCategories();
      if (isEdit) {
        await loadSolution();
      } else {
        setLoading(false);
      }
    };
    initialize();
  }, [id]);

  const loadCategories = async () => {
    try {
      const { data, error } = await getAllSolutionCategories();
      if (error) throw error;
      setCategories(data || []);

      // Set default category if creating new solution
      if (!isEdit && data && data.length > 0) {
        setFormData(prev => ({ ...prev, category: data[0].slug }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const loadSolution = async () => {
    try {
      const { data, error } = await getSolutionById(id);
      if (error) throw error;

      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        category: data.category || '',
        short_description: data.short_description || '',
        overview: data.overview || '',
        features: data.features || [],
        technologies: data.technologies || [],
        industries: data.industries || [],
        benefits: data.benefits || [],
        use_cases: data.use_cases || [],
        image_url: data.image_url || '',
        icon_name: data.icon_name || '',
        color: data.color || '#5227FF',
        is_published: data.is_published || false,
        display_order: data.display_order || 0,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: Array.isArray(data.meta_keywords) ? data.meta_keywords : [],
        link: data.link || '',
        link_label: data.link_label || '',
        link_target: data.link_target || '_blank',
      });
    } catch (error) {
      toast.error('Failed to load solution');
      console.error(error);
      navigate('/admin/solutions');
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

    // Auto-generate slug from title
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
        technologies: Array.isArray(formData.technologies) ? formData.technologies : [],
        industries: Array.isArray(formData.industries) ? formData.industries : [],
        benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
        use_cases: Array.isArray(formData.use_cases) ? formData.use_cases : [],
        meta_keywords: Array.isArray(formData.meta_keywords) ? formData.meta_keywords : [],
      };

      const { error } = isEdit
        ? await updateSolution(id, dataToSubmit)
        : await createSolution(dataToSubmit);

      if (error) throw error;

      toast.success(`Solution ${isEdit ? 'updated' : 'created'} successfully`);
      navigate('/admin/solutions');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} solution`);
      console.error(error);
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
          <h1>{isEdit ? 'Edit Solution' : 'New Solution'}</h1>
          <p>{isEdit ? 'Update solution details' : 'Create a new RFID/BLE solution'}</p>
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
                placeholder="e.g., RFID Warehouse Management"
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
                placeholder="e.g., rfid-warehouse-management"
              />
              <small>URL-friendly version of the title</small>
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

          <div className="form-row">\n            <div className="form-group">
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
              placeholder="Brief one-line description..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="overview">Overview</label>
            <ReactQuill
              theme="snow"
              value={formData.overview}
              onChange={(content) => setFormData(prev => ({ ...prev, overview: content }))}
              modules={quillModules}
              placeholder="Detailed overview of the solution..."
            />
          </div>

          <div className="form-group">
            <label>Solution Image</label>
            <ImageUpload
              currentImage={formData.image_url}
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              folder="solutions"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="icon_name">Icon Name</label>
              <input
                type="text"
                id="icon_name"
                name="icon_name"
                value={formData.icon_name}
                onChange={handleChange}
                placeholder="e.g., faWarehouse, faBoxes, faCog"
              />
              <small>FontAwesome icon name (e.g., faWarehouse, faBoxes, faBook, faStore, faGem, faTshirt, faUserCheck, faSuitcase, faCog)</small>
            </div>

            <div className="form-group">
              <label htmlFor="color">Color (Hex)</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="#5227FF"
              />
              <small>Brand color is #5227FF (recommended for consistency)</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="link">External Link (optional)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com/resource"
              />
              <small>Optional link for this solution</small>
            </div>

            <div className="form-group">
              <label htmlFor="link_label">Link Label</label>
              <input
                type="text"
                id="link_label"
                name="link_label"
                value={formData.link_label}
                onChange={handleChange}
                placeholder="e.g., Learn more, View demo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link_target">Link Target</label>
              <select
                id="link_target"
                name="link_target"
                value={formData.link_target}
                onChange={handleChange}
              >
                <option value="_blank">_blank (new tab)</option>
                <option value="_self">_self (same tab)</option>
              </select>
            </div>
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
              placeholder="Add a feature and press Enter"
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
          <h2>Technologies</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('technologies', technologyInput, setTechnologyInput))}
              placeholder="Add a technology and press Enter"
            />
            <button type="button" onClick={() => addArrayItem('technologies', technologyInput, setTechnologyInput)}>
              Add
            </button>
          </div>
          <div className="array-items">
            {formData.technologies.map((tech, index) => (
              <div key={index} className="array-item">
                <span>{tech}</span>
                <button type="button" onClick={() => removeArrayItem('technologies', index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Industries</h2>
          <div className="array-input-group">
            <input
              type="text"
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArrayItem('industries', industryInput, setIndustryInput))}
              placeholder="Add an industry and press Enter"
            />
            <button type="button" onClick={() => addArrayItem('industries', industryInput, setIndustryInput)}>
              Add
            </button>
          </div>
          <div className="array-items">
            {formData.industries.map((industry, index) => (
              <div key={index} className="array-item">
                <span>{industry}</span>
                <button type="button" onClick={() => removeArrayItem('industries', index)}>×</button>
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
              placeholder="SEO title for search engines"
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
              placeholder="SEO description for search engines"
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
              <span>Publish this solution</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/solutions')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : (isEdit ? 'Update Solution' : 'Create Solution')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;

