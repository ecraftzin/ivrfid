import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllProducts,
  deleteProduct,
  togglePublishStatus,
  toggleFeaturedStatus,
  duplicateProduct,
} from '../services/adminProductsService';
import Loading from '../../components/Loading/Loading';
import './ContentList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllProducts();
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const { error } = await deleteProduct(id);
      if (error) throw error;
      
      toast.success('Product deleted successfully');
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const { error } = await togglePublishStatus(id, currentStatus);
      if (error) throw error;
      
      toast.success(currentStatus ? 'Product unpublished' : 'Product published');
      loadProducts();
    } catch (error) {
      toast.error('Failed to update publish status');
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      const { error } = await toggleFeaturedStatus(id, currentStatus);
      if (error) throw error;
      
      toast.success(currentStatus ? 'Removed from featured' : 'Added to featured');
      loadProducts();
    } catch (error) {
      toast.error('Failed to update featured status');
      console.error(error);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const { error } = await duplicateProduct(id);
      if (error) throw error;
      
      toast.success('Product duplicated successfully');
      loadProducts();
    } catch (error) {
      toast.error('Failed to duplicate product');
      console.error(error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'published' && product.is_published) ||
      (filter === 'draft' && !product.is_published) ||
      (filter === 'featured' && product.is_featured);

    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-list-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage RFID tags and products</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <span>➕</span> Add New Product
        </Link>
      </div>

      <div className="content-filters">
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({products.length})
          </button>
          <button
            className={filter === 'published' ? 'active' : ''}
            onClick={() => setFilter('published')}
          >
            Published ({products.filter(p => p.is_published).length})
          </button>
          <button
            className={filter === 'draft' ? 'active' : ''}
            onClick={() => setFilter('draft')}
          >
            Draft ({products.filter(p => !p.is_published).length})
          </button>
          <button
            className={filter === 'featured' ? 'active' : ''}
            onClick={() => setFilter('featured')}
          >
            Featured ({products.filter(p => p.is_featured).length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="content-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="item-title">
                      <strong>{product.title}</strong>
                      <span className="item-slug">{product.slug}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{product.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${product.is_published ? 'badge-published' : 'badge-draft'}`}>
                      {product.is_published ? '✓ Published' : '○ Draft'}
                    </span>
                  </td>
                  <td>
                    {product.is_featured && <span className="badge" style={{background: '#fee140', color: '#856404'}}>⭐ Featured</span>}
                  </td>
                  <td>{new Date(product.updated_at || product.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/products/edit/${product.id}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(product.id, product.is_published)}
                        className="btn-icon"
                        title={product.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {product.is_published ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(product.id, product.is_featured)}
                        className="btn-icon"
                        title={product.is_featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {product.is_featured ? '⭐' : '☆'}
                      </button>
                      <button
                        onClick={() => handleDuplicate(product.id)}
                        className="btn-icon"
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
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

export default ProductsList;

