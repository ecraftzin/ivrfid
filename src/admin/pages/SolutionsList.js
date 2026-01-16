import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllSolutions,
  deleteSolution,
  togglePublishStatus,
  duplicateSolution,
} from '../services/adminSolutionsService';
import Loading from '../../components/Loading/Loading';
import './ContentList.css';

const SolutionsList = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllSolutions();
      if (error) throw error;
      setSolutions(data || []);
    } catch (error) {
      toast.error('Failed to load solutions');
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
      const { error } = await deleteSolution(id);
      if (error) throw error;
      
      toast.success('Solution deleted successfully');
      loadSolutions();
    } catch (error) {
      toast.error('Failed to delete solution');
      console.error(error);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const { error } = await togglePublishStatus(id, currentStatus);
      if (error) throw error;
      
      toast.success(currentStatus ? 'Solution unpublished' : 'Solution published');
      loadSolutions();
    } catch (error) {
      toast.error('Failed to update publish status');
      console.error(error);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const { error } = await duplicateSolution(id);
      if (error) throw error;
      
      toast.success('Solution duplicated successfully');
      loadSolutions();
    } catch (error) {
      toast.error('Failed to duplicate solution');
      console.error(error);
    }
  };

  const filteredSolutions = solutions.filter(solution => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'published' && solution.is_published) ||
      (filter === 'draft' && !solution.is_published);

    const matchesSearch = 
      solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-list-page">
      <div className="page-header">
        <div>
          <h1>Solutions</h1>
          <p>Manage RFID and BLE solutions</p>
        </div>
        <Link to="/admin/solutions/new" className="btn-primary">
          <span>➕</span> Add New Solution
        </Link>
      </div>

      <div className="content-filters">
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({solutions.length})
          </button>
          <button
            className={filter === 'published' ? 'active' : ''}
            onClick={() => setFilter('published')}
          >
            Published ({solutions.filter(s => s.is_published).length})
          </button>
          <button
            className={filter === 'draft' ? 'active' : ''}
            onClick={() => setFilter('draft')}
          >
            Draft ({solutions.filter(s => !s.is_published).length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search solutions..."
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
              <th>Order</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSolutions.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No solutions found
                </td>
              </tr>
            ) : (
              filteredSolutions.map((solution) => (
                <tr key={solution.id}>
                  <td>
                    <div className="item-title">
                      <strong>{solution.title}</strong>
                      <span className="item-slug">{solution.slug}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{solution.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${solution.is_published ? 'badge-published' : 'badge-draft'}`}>
                      {solution.is_published ? '✓ Published' : '○ Draft'}
                    </span>
                  </td>
                  <td>{solution.display_order || '-'}</td>
                  <td>{new Date(solution.updated_at || solution.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/solutions/edit/${solution.id}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(solution.id, solution.is_published)}
                        className="btn-icon"
                        title={solution.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {solution.is_published ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={() => handleDuplicate(solution.id)}
                        className="btn-icon"
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDelete(solution.id, solution.title)}
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

export default SolutionsList;

