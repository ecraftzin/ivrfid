import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage2 from '../HomePage2/HomePage2';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import ContactPage from '../ContactPage/ContactPage';

// Dynamic Components
import SolutionsListingDynamic from '../Solutions/SolutionsListingDynamic';
import SolutionDetailDynamic from '../Solutions/SolutionDetailDynamic';
import SolutionSubcategoryDetail from '../Solutions/SolutionSubcategoryDetail';
import ProductsListingDynamic from '../Products/ProductsListingDynamic';
import ProductDetailDynamic from '../Products/ProductDetailDynamic';
import ProductSubcategoryDetail from '../Products/ProductSubcategoryDetail';

// Admin imports
import { AuthProvider } from '../../admin/contexts/AuthContext';
import ProtectedRoute from '../../admin/components/ProtectedRoute';
import AdminLayout from '../../admin/components/AdminLayout';
import Login from '../../admin/pages/Login';
import Dashboard from '../../admin/pages/Dashboard';
import SolutionsList from '../../admin/pages/SolutionsList';
import SolutionForm from '../../admin/pages/SolutionForm';
import ProductsList from '../../admin/pages/ProductsList';
import ProductForm from '../../admin/pages/ProductForm';
import BlogList from '../../admin/pages/BlogList';
import BlogForm from '../../admin/pages/BlogForm';
import MediaLibrary from '../../admin/pages/MediaLibrary';
import ProductCategoriesList from '../../admin/pages/ProductCategoriesList';
import ProductCategoryForm from '../../admin/pages/ProductCategoryForm';
import ProductSubcategoriesList from '../../admin/pages/ProductSubcategoriesList';
import ProductSubcategoryForm from '../../admin/pages/ProductSubcategoryForm';
import SolutionCategoriesList from '../../admin/pages/SolutionCategoriesList';
import SolutionCategoryForm from '../../admin/pages/SolutionCategoryForm';
import SolutionSubcategoriesList from '../../admin/pages/SolutionSubcategoriesList';
import SolutionSubcategoryForm from '../../admin/pages/SolutionSubcategoryForm';
import ProductsPage from '../Products/ProductsPage';
import SolutionCategories from '../Solutions/SolutionCategories';
import BlogPage from '../BlogPage/BlogPage';
import BlogDetails from '../BlogDetails/BlogDetails';


const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage2 />} />
            <Route path="home" element={<HomePage2 />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog-single/:slug" element={<BlogDetails />} />

            {/* Solutions Routes - Dynamic */}
            <Route path="solutions" element={<SolutionCategories />} />
            <Route path="solutions/:category/:subcategory/:slug" element={<SolutionDetailDynamic />} />
            <Route path="solutions/:category/subcategory/:subcategorySlug" element={<SolutionSubcategoryDetail />} />
            <Route path="solutions/:category/:slug" element={<SolutionDetailDynamic />} />
            <Route path="solutions/:category" element={<SolutionsListingDynamic />} />

            {/* Products Routes - Dynamic */}
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:category/:subcategory/:slug" element={<ProductDetailDynamic />} />
            <Route path="products/:category/subcategory/:subcategorySlug" element={<ProductSubcategoryDetail />} />
            <Route path="products/:category/:slug" element={<ProductDetailDynamic />} />
            <Route path="products/:category" element={<ProductsListingDynamic />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />

              {/* Solutions Routes */}
              <Route path="solutions" element={<SolutionsList />} />
              <Route path="solutions/new" element={<SolutionForm />} />
              <Route path="solutions/edit/:id" element={<SolutionForm />} />

              {/* Products Routes */}
              <Route path="products" element={<ProductsList />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />

              {/* Blog Routes */}
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/new" element={<BlogForm />} />
              <Route path="blog/edit/:id" element={<BlogForm />} />

              {/* Product Categories Routes */}
              <Route path="product-categories" element={<ProductCategoriesList />} />
              <Route path="product-categories/new" element={<ProductCategoryForm />} />
              <Route path="product-categories/edit/:id" element={<ProductCategoryForm />} />

              {/* Product Subcategories Routes */}
              <Route path="product-subcategories" element={<ProductSubcategoriesList />} />
              <Route path="product-subcategories/new" element={<ProductSubcategoryForm />} />
              <Route path="product-subcategories/edit/:id" element={<ProductSubcategoryForm />} />

              {/* Solution Categories Routes */}
              <Route path="solution-categories" element={<SolutionCategoriesList />} />
              <Route path="solution-categories/new" element={<SolutionCategoryForm />} />
              <Route path="solution-categories/edit/:id" element={<SolutionCategoryForm />} />

              {/* Solution Subcategories Routes */}
              <Route path="solution-subcategories" element={<SolutionSubcategoriesList />} />
              <Route path="solution-subcategories/new" element={<SolutionSubcategoryForm />} />
              <Route path="solution-subcategories/edit/:id" element={<SolutionSubcategoryForm />} />

              {/* Media Library */}
              <Route path="media" element={<MediaLibrary />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </div>
  );
}

export default AllRoute;
