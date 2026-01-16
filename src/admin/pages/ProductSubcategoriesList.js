import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllProductSubcategories,
  deleteProductSubcategory,
} from '../services/adminProductSubcategoriesService';
import Loading from '../../components/Loading/Loading';
import './ContentList.css';

const ProductSubcategoriesList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await getAllProductSubcategories();

    if (error) {
      toast.error('Failed to load product subcategories');
      console.error(error);
    } else {
      setSubcategories(data || []);
    }

    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const { error } = await deleteProductSubcategory(id);
      if (error) {
        toast.error('Failed to delete subcategory. It may be in use by products.');
        console.error(error);
      } else {
        toast.success('Subcategory deleted successfully');
        loadData();
      }
    }
  };

  const filteredSubcategories = subcategories.filter(subcat => {
    const matchesStatusFilter = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && subcat.is_active) ||
      (statusFilter === 'inactive' && !subcat.is_active);

    const matchesSearch = 
      subcat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcat.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcat.products?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatusFilter && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-list-page">
      <div className="page-header">
        <div>
          <h1>Product Subcategories</h1>
          <p>Manage product subcategories and their settings</p>
        </div>
        <Link to="/admin/product-subcategories/new" className="btn-primary">
          <span>➕</span> Add New Subcategory
        </Link>
      </div>

      <div className="filters-bar">
        <div className="filter-tabs">
          <button
            className={statusFilter === 'all' ? 'active' : ''}
            onClick={() => setStatusFilter('all')}
          >
            All ({subcategories.length})
          </button>
          <button
            className={statusFilter === 'active' ? 'active' : ''}
            onClick={() => setStatusFilter('active')}
          >
            Active ({subcategories.filter(s => s.is_active).length})
          </button>
          <button
            className={statusFilter === 'inactive' ? 'active' : ''}
            onClick={() => setStatusFilter('inactive')}
          >
            Inactive ({subcategories.filter(s => !s.is_active).length})
          </button>
        </div>

        <div className="filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="content-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Parent Product</th>
              <th>Slug</th>
              <th>Display Order</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No subcategories found
                </td>
              </tr>
            ) : (
              filteredSubcategories.map((subcat) => (
                <tr key={subcat.id}>
                  <td>
                    <div className="item-thumbnail">
                      {subcat.image_url ? (
                        <img 
                          src={subcat.image_url} 
                          alt={subcat.title}
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
                  </td>
                  <td>
                    <div className="item-title">
                      <strong>{subcat.title}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">
                      {subcat.products?.title || 'No Product'}
                    </span>
                  </td>
                  {/* <td>
                    <span style={{ 
                      fontWeight: '600', 
                      color: '#2c3e50',
                      backgroundColor: '#e3f2fd',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.9rem'
                    }}>
                      {subcat.product_count || 0} {subcat.product_count === 1 ? 'product' : 'products'}
                    </span>
                  </td> */}
                  <td>
                    <span className="badge badge-category">{subcat.slug}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', color: '#2c3e50' }}>{subcat.display_order}</span>
                  </td>
                  <td>
                    <span className={`badge ${subcat.is_active ? 'badge-published' : 'badge-draft'}`}>
                      {subcat.is_active ? '✓ Active' : '○ Inactive'}
                    </span>
                  </td>
                  <td>{new Date(subcat.updated_at || subcat.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/product-subcategories/edit/${subcat.id}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(subcat.id, subcat.title)}
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

export default ProductSubcategoriesList;
