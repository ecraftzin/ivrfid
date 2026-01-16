import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSolutions } from '../services/adminSolutionsService';
import { getAllProducts } from '../services/adminProductsService';
import { getAllBlogPosts } from '../services/adminBlogService';
import Loading from '../../components/Loading/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    solutions: { total: 0, published: 0, draft: 0 },
    products: { total: 0, published: 0, draft: 0, featured: 0 },
    blog: { total: 0, published: 0, draft: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [solutionsRes, productsRes, blogRes] = await Promise.all([
        getAllSolutions(),
        getAllProducts(),
        getAllBlogPosts(),
      ]);

      // Calculate solutions stats
      const solutions = solutionsRes.data || [];
      const solutionsStats = {
        total: solutions.length,
        published: solutions.filter(s => s.is_published).length,
        draft: solutions.filter(s => !s.is_published).length,
      };

      // Calculate products stats
      const products = productsRes.data || [];
      const productsStats = {
        total: products.length,
        published: products.filter(p => p.is_published).length,
        draft: products.filter(p => !p.is_published).length,
        featured: products.filter(p => p.is_featured).length,
      };

      // Calculate blog stats
      const blog = blogRes.data || [];
      const blogStats = {
        total: blog.length,
        published: blog.filter(b => b.is_published).length,
        draft: blog.filter(b => !b.is_published).length,
      };

      setStats({
        solutions: solutionsStats,
        products: productsStats,
        blog: blogStats,
      });

      // Get recent activity (last 5 items updated)
      const allItems = [
        ...solutions.map(s => ({ ...s, type: 'solution' })),
        ...products.map(p => ({ ...p, type: 'product' })),
        ...blog.map(b => ({ ...b, type: 'blog' })),
      ];

      const recent = allItems
        .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
        .slice(0, 5);

      setRecentActivity(recent);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the IV RFID Solutions Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card solutions">
          <div className="stat-icon">💡</div>
          <div className="stat-content">
            <h3>Solutions</h3>
            <div className="stat-number">{stats.solutions.total}</div>
            <div className="stat-details">
              <span className="stat-badge published">{stats.solutions.published} Published</span>
              <span className="stat-badge draft">{stats.solutions.draft} Draft</span>
            </div>
          </div>
          <Link to="/admin/solutions" className="stat-link">Manage →</Link>
        </div>

        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Products</h3>
            <div className="stat-number">{stats.products.total}</div>
            <div className="stat-details">
              <span className="stat-badge published">{stats.products.published} Published</span>
              <span className="stat-badge draft">{stats.products.draft} Draft</span>
            </div>
          </div>
          <Link to="/admin/products" className="stat-link">Manage →</Link>
        </div>

        <div className="stat-card blog">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Blog Posts</h3>
            <div className="stat-number">{stats.blog.total}</div>
            <div className="stat-details">
              <span className="stat-badge published">{stats.blog.published} Published</span>
              <span className="stat-badge draft">{stats.blog.draft} Draft</span>
            </div>
          </div>
          <Link to="/admin/blog" className="stat-link">Manage →</Link>
        </div>

        <div className="stat-card featured">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Featured Products</h3>
            <div className="stat-number">{stats.products.featured}</div>
            <div className="stat-details">
              <span className="stat-badge info">Highlighted on homepage</span>
            </div>
          </div>
          <Link to="/admin/products" className="stat-link">View →</Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/solutions/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>New Solution</span>
          </Link>
          <Link to="/admin/products/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>New Product</span>
          </Link>
          <Link to="/admin/blog/new" className="action-btn">
            <span className="action-icon">➕</span>
            <span>New Blog Post</span>
          </Link>
          <Link to="/admin/media" className="action-btn">
            <span className="action-icon">🖼️</span>
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {item.type === 'solution' && '💡'}
                  {item.type === 'product' && '📦'}
                  {item.type === 'blog' && '📝'}
                </div>
                <div className="activity-content">
                  <h4>{item.title}</h4>
                  <p className="activity-meta">
                    <span className="activity-type">{item.type}</span>
                    <span className="activity-status">
                      {item.is_published ? '✓ Published' : '○ Draft'}
                    </span>
                    <span className="activity-date">
                      {new Date(item.updated_at || item.created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

