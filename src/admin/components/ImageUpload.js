import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../services/storageService';
import './ImageUpload.css';

const ImageUpload = ({ currentImage, onImageUploaded, folder = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');

  const handleFileSelect = async (e) => {
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

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const { data, error } = await uploadFile(file, folder);
      if (error) throw error;

      toast.success('Image uploaded successfully');
      onImageUploaded(data.url);
      setPreviewUrl(data.url);
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
      setPreviewUrl(currentImage || '');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onImageUploaded('');
  };

  return (
    <div className="image-upload-container">
      <div className="image-upload-preview">
        {previewUrl ? (
          <div className="preview-wrapper">
            <img src={previewUrl} alt="Preview" />
            <button
              type="button"
              className="btn-remove-image"
              onClick={handleRemove}
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="preview-placeholder">
            <span>📷</span>
            <p>No image selected</p>
          </div>
        )}
      </div>

      <div className="image-upload-actions">
        <input
          type="file"
          id={`image-upload-${folder}`}
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: 'none' }}
        />
        <label
          htmlFor={`image-upload-${folder}`}
          className={`btn-upload-image ${uploading ? 'disabled' : ''}`}
        >
          {uploading ? '⏳ Uploading...' : '📤 Upload Image'}
        </label>
        <small className="upload-hint">
          Max 5MB • JPEG, PNG, GIF, WebP
        </small>
      </div>
    </div>
  );
};

export default ImageUpload;

