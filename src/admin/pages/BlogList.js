import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllBlogPosts,
  deleteBlogPost,
  togglePublishStatus,
  toggleFeaturedStatus,
  duplicateBlogPost,
} from '../services/adminBlogService';
import Loading from '../../components/Loading/Loading';
import './ContentList.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllBlogPosts();
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error('Failed to load blog posts');
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
      const { error } = await deleteBlogPost(id);
      if (error) throw error;
      
      toast.success('Blog post deleted successfully');
      loadPosts();
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error(error);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const { error } = await togglePublishStatus(id, currentStatus);
      if (error) throw error;
      
      toast.success(currentStatus ? 'Post unpublished' : 'Post published');
      loadPosts();
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
      loadPosts();
    } catch (error) {
      toast.error('Failed to update featured status');
      console.error(error);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const { error } = await duplicateBlogPost(id);
      if (error) throw error;
      
      toast.success('Blog post duplicated successfully');
      loadPosts();
    } catch (error) {
      toast.error('Failed to duplicate blog post');
      console.error(error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'published' && post.is_published) ||
      (filter === 'draft' && !post.is_published) ||
      (filter === 'featured' && post.is_featured);

    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="content-list-page">
      <div className="page-header">
        <div>
          <h1>Blog Posts</h1>
          <p>Manage blog articles and news</p>
        </div>
        <Link to="/admin/blog/new" className="btn-primary">
          <span>➕</span> Add New Post
        </Link>
      </div>

      <div className="content-filters">
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({posts.length})
          </button>
          <button
            className={filter === 'published' ? 'active' : ''}
            onClick={() => setFilter('published')}
          >
            Published ({posts.filter(p => p.is_published).length})
          </button>
          <button
            className={filter === 'draft' ? 'active' : ''}
            onClick={() => setFilter('draft')}
          >
            Draft ({posts.filter(p => !p.is_published).length})
          </button>
          <button
            className={filter === 'featured' ? 'active' : ''}
            onClick={() => setFilter('featured')}
          >
            Featured ({posts.filter(p => p.is_featured).length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
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
              <th>Author</th>
              <th>Status</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No blog posts found
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="item-title">
                      <strong>{post.title}</strong>
                      <span className="item-slug">{post.slug}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-category">{post.category || 'Uncategorized'}</span>
                  </td>
                  <td>{post.author || '-'}</td>
                  <td>
                    <span className={`badge ${post.is_published ? 'badge-published' : 'badge-draft'}`}>
                      {post.is_published ? '✓ Published' : '○ Draft'}
                    </span>
                    {post.is_featured && <span className="badge" style={{background: '#fee140', color: '#856404', marginLeft: '4px'}}>⭐</span>}
                  </td>
                  <td>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/blog/edit/${post.id}`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(post.id, post.is_published)}
                        className="btn-icon"
                        title={post.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {post.is_published ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(post.id, post.is_featured)}
                        className="btn-icon"
                        title={post.is_featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {post.is_featured ? '⭐' : '☆'}
                      </button>
                      <button
                        onClick={() => handleDuplicate(post.id)}
                        className="btn-icon"
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
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

export default BlogList;

