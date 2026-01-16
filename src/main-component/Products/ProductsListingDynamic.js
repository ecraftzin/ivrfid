import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  getAllProducts
} from '../../services/productsService';
import { getProductCategories } from '../../services/categoriesService';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import FloatingContact from '../FloatingContact/FloatingContact';

const ProductsListingDynamic = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('products');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryBreadcrumb, setCategoryBreadcrumb] = useState('');

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try to get category description from location state
        if (location.state && location.state.categoryDescription && category) {
          setCategoryDescription(location.state.categoryDescription);
          if (location.state.categoryMeta && location.state.categoryMeta.breadcrumb_image_url) {
            setCategoryBreadcrumb(location.state.categoryMeta.breadcrumb_image_url);
          } else {
            setCategoryBreadcrumb('');
          }
        } else if (category) {
          // Fetch category details from API
          try {
            const categories = await getProductCategories();
            const normalizedUrlCategory = category.toLowerCase().replace(/[-_]/g, ' ');
            const urlLower = category.toLowerCase();
            
            // Try to match category by slug first (handles hyphens, punctuation, etc.),
            // then fall back to name-based matching for backward compatibility.
            const foundCategory = categories.find(cat => {
              if (cat && cat.slug && cat.slug.toLowerCase() === urlLower) {
                return true;
              }

              if (typeof cat === 'string') {
                const normalizedCatName = cat.toLowerCase().replace(/[-_]/g, ' ');
                return normalizedCatName === normalizedUrlCategory;
              } else if (cat && cat.name) {
                const normalizedCatName = cat.name.toLowerCase().replace(/[-_]/g, ' ');
                return normalizedCatName === normalizedUrlCategory;
              }
              return false;
            });

            if (foundCategory) {
              const catDesc = typeof foundCategory === 'string'
                ? `Browse our ${foundCategory.toLowerCase()} collection featuring high-quality products for industrial and commercial applications.`
                : foundCategory.description || `Browse our ${foundCategory.name.toLowerCase()} collection featuring high-quality products for industrial and commercial applications.`;
              
              setCategoryDescription(catDesc);
              // Use admin-provided breadcrumb image when available
              if (typeof foundCategory === 'object' && foundCategory.breadcrumb_image_url) {
                setCategoryBreadcrumb(foundCategory.breadcrumb_image_url);
              } else {
                setCategoryBreadcrumb('');
              }
            } else {
              // Default description if category not found
              const formattedTitle = category.replace(/[-_]/g, ' ');
              setCategoryDescription(`Browse our ${formattedTitle.toLowerCase()} collection featuring high-quality products for industrial and commercial applications.`);
              setCategoryBreadcrumb('');
            }
          } catch (err) {
            console.error('Error fetching category details:', err);
            // Default description on error
            const formattedTitle = category.replace(/[-_]/g, ' ');
            setCategoryDescription(`Explore our comprehensive ${formattedTitle.toLowerCase()} products.`);
          }
        } else {
          // All products page
          setCategoryDescription('Browse our comprehensive range of industrial products, materials, and equipment.');
        }

        // Fetch products
        if (category && !subcategory) {
          const data = await getAllProducts();
          
          const normalizedUrlCategory = category.toLowerCase().replace(/[-_]/g, ' ');
          
          const filteredData = data.filter(p => {
            const normalizedDbCategory = (p.category || '').toLowerCase().replace(/[-_]/g, ' ');
            return normalizedDbCategory === normalizedUrlCategory;
          });

          // Validate if category exists
          if (filteredData.length === 0) {
            const allCategories = [...new Set(data.map(p => 
              (p.category || '').toLowerCase().replace(/[-_]/g, ' ')
            ))];
            
            if (!allCategories.includes(normalizedUrlCategory)) {
              throw new Error(`Product category "${category.replace(/[-_]/g, ' ')}" not found`);
            }
          }

          setProducts(filteredData);
          setViewMode('products');
        } else if (category && subcategory) {
          setProducts([]);
          setViewMode('products');
        } else {
          const data = await getAllProducts();
          setProducts(data);
          setViewMode('products');
        }

        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, subcategory, location.state]);

  if (loading) {
    return <Loading message={viewMode === 'subcategories' ? "Loading subcategories..." : "Loading products..."} />;
  }

  if (error) {
    return (
      <Fragment>
        <Header />
        <main className="page_content about-page">
          <PageTitle pageTitle="Page Not Found" pagesub="" pageTop="" backgroundImage={categoryBreadcrumb} />
          <div className="container" style={{ padding: '60px 0', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🔍</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
              Content Not Found
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '30px', lineHeight: 1.6 }}>
              {error}
            </p>
            <Link
              to="/products"
              onClick={ClickHandler}
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#5227FF',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4119e6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5227FF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              View All Products
            </Link>
          </div>
        </main>
        <Footer />
        <Scrollbar />
      </Fragment>
    );
  }

  // Page title logic
  let pageTitle = 'Products';
  if (category) {
    pageTitle = category.replace(/_/g, ' ');
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || 'Other';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(product);
    return acc;
  }, {});

  // Check if no products found
  if (products.length === 0) {
    return (
      <Fragment>
        <Header />
        <main className="page_content about-page">
          <PageTitle
            pageTitle={pageTitle}
            pagesub=""
            pageTop=""
            backgroundImage={categoryBreadcrumb}
          />
          <div className="container" style={{ padding: '80px 0', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '30px', opacity: 0.3 }}>📦</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
              No Products Found
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '30px', lineHeight: 1.6 }}>
              We couldn't find any products in this category. The category may not exist or doesn't have any products yet.
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#5227FF',
                color: 'white',
                padding: '14px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(82, 39, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(82, 39, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(82, 39, 255, 0.3)';
              }}
            >
              ← Browse All Products
            </Link>
          </div>
        </main>
        <Footer />
        <Scrollbar />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        <Header />
        <main className="page_content about-page">
          <PageTitle
            pageTitle={pageTitle}
            // pagesub={categoryDescription}  // Category description added here
            pageTop=""
            backgroundImage={categoryBreadcrumb}
          />

          {/* Category Description Section */}
          {categoryDescription && category && !subcategory && (
            <div className="container" style={{ marginBottom: '40px' }}>
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '30px',
                border: '1px solid #e2e8f0',
                textAlign: 'left',
                marginTop: '20px'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#475569',
                  lineHeight: 1.6,
                  margin: 0,
                  // maxWidth: '800px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                  dangerouslySetInnerHTML={{ __html: categoryDescription }}
                  >
                  {/* {categoryDescription} */}
                </p>
              </div>
            </div>
          )}


          <section className="service_section section_space xb-hidden pb-0">
            <div className="container">
              {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
                <div key={categoryName} style={{ marginBottom: '60px' }}>
                  {!category && (
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      marginBottom: '30px',
                      color: '#1e293b'
                    }}>
                      {categoryName}
                    </h2>
                  )}
                  <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {categoryProducts.map((product) => (
                      <div 
                        className="col-lg-4 col-md-6 mt-30" 
                        key={product.id}
                        style={{ display: 'flex' }}
                      >
                        <Link
                          onClick={ClickHandler}
                          to={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.slug}`}
                          style={{
                            display: 'flex',
                            flex: 1,
                            textDecoration: 'none',
                            color: 'inherit'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            border: '1px solid #e5e7eb',
                            height: '100%',
                            width: '100%'
                          }}>
                            <div style={{
                              height: '250px',
                              width: '100%',
                              overflow: 'hidden',
                              background: product.image_url ? 'transparent' : 'linear-gradient(135deg, #5227FF 0%, #7c3aed 100%)',
                              position: 'relative',
                              flexShrink: 0
                            }}>
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.title}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    transition: 'transform 0.5s ease'
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white'
                                }}>
                                  <div style={{ fontSize: '1rem', opacity: 0.8, textAlign: 'center' }}>
                                    No Image
                                  </div>
                                </div>
                              )}
                            </div>
                            <div style={{
                              padding: '24px',
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                              <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                marginBottom: '12px',
                                color: '##07093b',
                                textAlign: 'center',
                                lineHeight: 1.4,
                                flexShrink: 0
                              }}>
                                {product.title}
                              </h3>
                              {/* {product.short_description && (
                                <p style={{
                                  color: '#64748b',
                                  fontSize: '0.95rem',
                                  lineHeight: 1.6,
                                  margin: 0,
                                  flex: 1,
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical'
                                }}
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                                >
                                </p>
                              )} */}
                              {/* Price section if available */}
                              {product.price && (
                                <div style={{
                                  marginTop: '12px',
                                  paddingTop: '12px',
                                  borderTop: '1px solid #f1f5f9',
                                  flexShrink: 0
                                }}>
                                  <span style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: '#5227FF'
                                  }}>
                                    ${parseFloat(product.price).toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <Scrollbar />
        <FloatingContact />
      </div>
    </Fragment>
  );
};

export default ProductsListingDynamic;