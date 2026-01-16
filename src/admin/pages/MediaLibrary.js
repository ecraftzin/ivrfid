import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { uploadFile, listFiles, deleteFile } from '../services/storageService';
import Loading from '../../components/Loading/Loading';
import './MediaLibrary.css';

const MediaLibrary = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');

  useEffect(() => {
    loadFiles();
  }, [selectedFolder]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await listFiles(selectedFolder);
      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      toast.error('Failed to load files');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload only image files (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const { data, error } = await uploadFile(file, selectedFolder);
      if (error) throw error;

      toast.success('File uploaded successfully');
      loadFiles();
      
      // Copy URL to clipboard
      navigator.clipboard.writeText(data.url);
      toast.info('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to upload file');
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDelete = async (filePath, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      const { error } = await deleteFile(filePath);
      if (error) throw error;

      toast.success('File deleted successfully');
      loadFiles();
    } catch (error) {
      toast.error('Failed to delete file');
      console.error(error);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="media-library-page">
      <div className="page-header">
        <div>
          <h1>Media Library</h1>
          <p>Upload and manage images</p>
        </div>
      </div>

      <div className="media-toolbar">
        <div className="folder-selector">
          <label htmlFor="folder">Folder:</label>
          <select
            id="folder"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option value="">Root</option>
            <option value="solutions">Solutions</option>
            <option value="products">Products</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        <div className="upload-section">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className={`btn-upload ${uploading ? 'disabled' : ''}`}>
            {uploading ? '⏳ Uploading...' : '📤 Upload Image'}
          </label>
        </div>
      </div>

      <div className="media-grid">
        {files.length === 0 ? (
          <div className="no-files">
            <p>No files found in this folder</p>
            <p className="hint">Upload your first image to get started</p>
          </div>
        ) : (
          files.map((file, index) => (
            <div key={index} className="media-item">
              <div className="media-preview">
                <img src={file.url} alt={file.name} />
              </div>
              <div className="media-info">
                <p className="media-name" title={file.name}>{file.name}</p>
                <div className="media-actions">
                  <button
                    onClick={() => copyToClipboard(file.url)}
                    className="btn-copy"
                    title="Copy URL"
                  >
                    📋
                  </button>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-view"
                    title="View"
                  >
                    👁️
                  </a>
                  <button
                    onClick={() => handleDelete(file.path, file.name)}
                    className="btn-delete"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;

