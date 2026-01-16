import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Successfully signed out');
      navigate('/admin/login');
    }
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/solutions', icon: '💡', label: 'Solutions' },
    { path: '/admin/solution-categories', icon: '🏷️', label: 'Solution Categories' },
    { path: '/admin/solution-subcategories', icon: '🔸', label: 'Solution Subcategories' },
    { path: '/admin/products', icon: '📦', label: 'Products' },
    { path: '/admin/product-categories', icon: '🔖', label: 'Product Categories' },
    { path: '/admin/product-subcategories', icon: '🔹', label: 'Product Subcategories' },
    { path: '/admin/blog', icon: '📝', label: 'Blog Posts' },
    { path: '/admin/media', icon: '🖼️', label: 'Media Library' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>IV RFID Admin</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            {sidebarOpen && (
              <>
                <div className="user-avatar">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="user-details">
                  <p className="user-email">{user?.email || 'Admin'}</p>
                </div>
              </>
            )}
          </div>
          <button className="btn-signout" onClick={handleSignOut}>
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

