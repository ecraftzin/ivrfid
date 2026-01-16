import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllProductCategories,
  deleteProductCategory,
  toggleProductCategoryActiveStatus,
} from '../services/adminCategoriesService';
import Loading from '../../components/Loading/Loading';
import './ContentList.css';

const ProductCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const { data, error } = await getAllProductCategories();
    if (error) {
      toast.error('Failed to load product categories');
      console.error(error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      const { error } = await deleteProductCategory(id);
      if (error) {
        toast.error('Failed to delete category. It may be in use by products.');
        console.error(error);
      } else {
        toast.success('Category deleted successfully');
        loadCategories();
      }
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    const { data, error } = await toggleProductCategoryActiveStatus(id, currentStatus);
    if (error) {
      toast.error('Failed to update category status');
      console.error(error);
    } else {
      toast.success(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      loadCategories();
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && category.is_active) ||
      (filter === 'inactive' && !category.is_active);

    const matchesSearch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-list-page">
      <div className="page-header">
        <div>
          <h1>Product Categories</h1>
          <p>Manage product categories and their settings</p>
        </div>
        <Link to="/admin/product-categories/new" className="btn-primary">
          <span>➕</span> Add New Category
        </Link>
      </div>

      <div className="filters-bar">
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({categories.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({categories.filter(c => c.is_active).length})
          </button>
          <button
            className={filter === 'inactive' ? 'active' : ''}
            onClick={() => setFilter('inactive')}
          >
            Inactive ({categories.filter(c => !c.is_active).length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="content-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Display Order</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="item-thumbnail">
                      <div style={{ marginBottom: '6px' }}>
                        {category.image_url ? (
                          <img 
                            src={category.image_url} 
                            alt={category.name}
                            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ) : (
                          <div style={{ 
                            width: '60px', 
                            height: '40px', 
                            backgroundColor: '#f0f0f0', 
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                          }}>
                            📷
                          </div>
                        )}
                      </div>

                      {category.breadcrumb_image_url && (
                        <div>
                          <img
                            src={category.breadcrumb_image_url}
                            alt={`${category.name} breadcrumb`}
                            style={{ width: '60px', height: '24px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="item-title">
                      <strong>{category.name}</strong>
                      {category.description && (
                        <span className="item-slug">{category.description.substring(0, 60)}...</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{category.slug}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', color: '#2c3e50' }}>{category.display_order}</span>
                  </td>
                  <td>
                    <span className={`badge ${category.is_active ? 'badge-published' : 'badge-draft'}`}>
                      {category.is_active ? '✓ Active' : '○ Inactive'}
                    </span>
                  </td>
                  <td>{new Date(category.updated_at || category.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/product-categories/edit/${category.id}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleToggleActive(category.id, category.is_active)}
                        className="btn-icon"
                        title={category.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {category.is_active ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="btn-icon btn-danger"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategoriesList;

