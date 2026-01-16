# Admin Panel Documentation

## Overview
This is a comprehensive admin panel for managing the IVRFID website content including Solutions, Products, Blog posts, and Media files.

## Features

### 🔐 Authentication
- Secure login with Supabase authentication
- Protected routes requiring authentication
- Session management with automatic logout

### 📊 Dashboard
- Overview of all content statistics
- Quick access to all sections
- Recent activity tracking

### 🛠️ Solutions Management
- Create, edit, and delete RFID solutions
- Rich text editor for detailed descriptions
- SEO optimization fields
- Publish/unpublish functionality
- Featured solutions highlighting
- Duplicate solutions for quick creation

### 📦 Products Management
- Manage RFID tags and products
- Category organization
- Features, specifications, and applications arrays
- Image management
- Display order control
- Featured products

### 📝 Blog Management
- Create and edit blog posts
- Rich text editor with formatting options
- Category and tag management
- Author attribution
- Featured image support
- SEO metadata
- Draft and publish workflow

### 🖼️ Media Library
- Upload images to Supabase Storage
- Organize files in folders
- Copy URLs to clipboard
- Delete unused files
- Image preview
- File size validation (max 5MB)
- Supported formats: JPEG, PNG, GIF, WebP

## Getting Started

### 1. Access the Admin Panel
Navigate to `/admin/login` in your browser.

### 2. Login Credentials
Use your Supabase authentication credentials to log in.

### 3. Navigation
Use the sidebar to navigate between different sections:
- Dashboard
- Solutions
- Products
- Blog
- Media Library

## Usage Guide

### Creating a Solution
1. Go to Solutions → Add New Solution
2. Fill in the required fields:
   - Title (required)
   - Slug (auto-generated from title)
   - Category
   - Description
3. Add features, benefits, and use cases
4. Set SEO metadata
5. Choose to publish immediately or save as draft
6. Click "Create Solution"

### Managing Products
1. Go to Products → Add New Product
2. Enter product details:
   - Title and slug
   - Category (RFID Tags, Metal Asset Tags, BLE Tags)
   - Short and full descriptions
3. Add features, specifications, and applications
4. Upload or link product image
5. Set display order for homepage
6. Configure SEO settings
7. Publish or save as draft

### Writing Blog Posts
1. Go to Blog → Add New Post
2. Enter post details:
   - Title and slug
   - Author name
   - Category
   - Excerpt
3. Write content using the rich text editor
4. Add tags for better organization
5. Upload featured image
6. Set SEO metadata
7. Publish or save as draft

### Uploading Media
1. Go to Media Library
2. Select a folder (solutions, products, blog, or root)
3. Click "Upload Image"
4. Select an image file (max 5MB)
5. URL is automatically copied to clipboard
6. Use the URL in your content

## Best Practices

### SEO Optimization
- Always fill in meta title, description, and keywords
- Use descriptive slugs (auto-generated but editable)
- Add alt text to images
- Keep meta descriptions under 160 characters

### Content Organization
- Use categories consistently
- Add relevant tags to blog posts
- Set appropriate display orders for products
- Use featured status sparingly for important content

### Image Management
- Optimize images before uploading
- Use descriptive file names
- Organize files in appropriate folders
- Delete unused images to save storage

### Publishing Workflow
1. Create content as draft
2. Review and edit
3. Set SEO metadata
4. Publish when ready
5. Monitor on public site

## Technical Details

### Technologies Used
- React 18
- React Router v6
- Supabase (Database + Storage + Auth)
- React Quill (Rich text editor)
- React Toastify (Notifications)

### File Structure
```
src/admin/
├── components/          # Reusable components
│   ├── AdminLayout.js   # Main layout with sidebar
│   ├── Sidebar.js       # Navigation sidebar
│   └── ProtectedRoute.js # Auth guard
├── contexts/            # React contexts
│   └── AuthContext.js   # Authentication state
├── pages/               # Admin pages
│   ├── Dashboard.js
│   ├── SolutionsList.js
│   ├── SolutionForm.js
│   ├── ProductsList.js
│   ├── ProductForm.js
│   ├── BlogList.js
│   ├── BlogForm.js
│   ├── MediaLibrary.js
│   └── Login.js
├── services/            # API services
│   ├── adminSolutionsService.js
│   ├── adminProductsService.js
│   ├── adminBlogService.js
│   └── storageService.js
└── README.md           # This file
```

## Troubleshooting

### Can't Login
- Check Supabase credentials
- Verify email is confirmed
- Check browser console for errors

### Upload Fails
- Ensure file is under 5MB
- Check file format (JPEG, PNG, GIF, WebP only)
- Verify Supabase storage bucket permissions

### Content Not Showing
- Check if content is published
- Verify slug is unique
- Check browser console for errors

## Support
For issues or questions, contact the development team.

