import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../services/productsService';
import { getProductCategories } from '../../services/categoriesService';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faBox, 
  faIndustry, 
  faCogs, 
  faFlask, 
  faCube, 
  faShapes, 
  faSearch,
  faTags,
  faBarcode,
  faFingerprint
} from '@fortawesome/free-solid-svg-icons';
import FloatingContact from '../FloatingContact/FloatingContact';

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Single color scheme for all cards
  const primaryColor = '#5227FF';
  const secondaryColor = '#401EFF';
  const accentColor = '#8B5CF6';
  const textColor = '#1e293b';
  const lightBg = '#f8fafc';
  const borderColor = '#e2e8f0';
  const cardBg = '#ffffff';

  const iconMap = {
    'rfid': faFingerprint,
    'tag': faBarcode,
    'metal': faCube,
    'asset': faBox,
    'engineering': faCogs,
    'industrial': faIndustry,
    'laboratory': faFlask,
    'raw': faCube,
    'material': faCube,
    'spare': faShapes,
    'part': faCogs,
    'product': faTags,
    'test': faFlask,
    'default': faTags
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        const [dbCategories, products] = await Promise.all([
          getProductCategories(),
          getAllProducts()
        ]);
        
        const counts = {};
        products.forEach(product => {
          const cat = product.category || 'Other';
          counts[cat] = (counts[cat] || 0) + 1;
        });

        if (dbCategories && dbCategories.length > 0) {
          setCategories(dbCategories);
          setCategoryCounts(counts);
        } else {
          const uniqueCategories = [...new Set(products.map(p => p.category || 'Other'))];
          setCategories(uniqueCategories);
          setCategoryCounts(counts);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (categoryName) => {
    const lowerName = categoryName.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return iconMap.default;
  };

  const filteredCategories = categories.filter(category => {
    const categoryName = typeof category === 'string' ? category : category.name;
    return categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <Loading message="Loading categories..." />;
  }

  if (error) {
    return (
      <Fragment>
        <Header />
        <main className="page_content about-page">
          <PageTitle pageTitle="Categories" pagesub="" pageTop="" />
          <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
            <div style={{
              background: lightBg,
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              margin: '0 auto',
              border: `1px solid ${borderColor}`
            }}>
              <h3 style={{ 
                color: '#DC2626', 
                marginBottom: '15px',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                Error Loading Categories
              </h3>
              <p style={{ 
                color: '#64748b',
                fontSize: '1rem'
              }}>
                {error}
              </p>
            </div>
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
            pageTitle="Product Categories"
            pagesub=""
            pageTop=""
          />
          
          <section className="section_space" style={{ padding: '0 0 80px' }}>
            <div className="container">
              {/* Clean Search Section */}
              {/* <div className="row justify-content-center mb-40">
                <div className="col-lg-8">
                  <div style={{
                    position: 'relative',
                    marginBottom: '15px'
                  }}>
                    <FontAwesomeIcon 
                      icon={faSearch} 
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748b',
                        fontSize: '1rem'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 20px 14px 50px',
                        borderRadius: '10px',
                        border: `2px solid ${borderColor}`,
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        outline: 'none',
                        background: cardBg
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 3px ${primaryColor}10`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = borderColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    color: '#64748b',
                    padding: '0 5px'
                  }}>
                    <span>
                      {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} available
                    </span>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: primaryColor,
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </div>
              </div> */}

              {/* Consistent Categories Grid */}
              <div className="row g-4">
                {filteredCategories.map((category) => {
                  const categoryName = typeof category === 'string' ? category : category.name;
                  const categorySlug = typeof category === 'string' 
                    ? category.toLowerCase().replace(/\s+/g, '-') 
                    : category.slug;
                  const categoryDescription = typeof category === 'string'
                    ? `Explore our ${category.toLowerCase()} collection`
                    : category.description || `Browse ${categoryName.toLowerCase()} products`;
                  const categoryImage = typeof category === 'object' ? category.image_url : null;
                  const categoryIcon = getCategoryIcon(categoryName);
                  
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={categorySlug}>
                      <Link
                        to={`/products/${categorySlug}`}
                        style={{
                          textDecoration: 'none',
                          display: 'block',
                          height: '100%'
                        }}
                      >
                        <div style={{
                          background: cardBg,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          height: '100%',
                          border: `1px solid ${borderColor}`,
                          transition: 'all 0.3s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                          e.currentTarget.style.borderColor = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = borderColor;
                        }}
                        >
                          {/* Full-size Image Container */}
                          <div style={{
                            height: '180px',
                            position: 'relative',
                            overflow: 'hidden',
                            background: lightBg
                          }}>
                            {categoryImage ? (
                              <img 
                                src={categoryImage} 
                                alt={categoryName}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  transition: 'transform 0.5s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = 'scale(1)';
                                }}
                              />
                            ) : (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: primaryColor
                              }}>
                                <FontAwesomeIcon 
                                  icon={categoryIcon} 
                                  style={{ 
                                    fontSize: '3rem',
                                    opacity: 0.3
                                  }}
                                />
                              </div>
                            )}
                            
                            {/* Product Count Badge */}
                            {/* <div style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              background: 'rgba(255, 255, 255, 0.95)',
                              color: primaryColor,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: `1px solid ${borderColor}`
                            }}>
                              {categoryCounts[categoryName] || 0} items
                            </div> */}
                          </div>
                          
                          {/* Content Section */}
                          <div style={{ padding: '20px' }}>
                            {/* Category Name */}
                            <div style={{ marginBottom: '10px' }}>
                              {/* <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: textColor,
                                margin: 0,
                                lineHeight: 1.3
                              }}>
                                {categoryName}
                              </h3> */}
                              <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '800',
                                color: '#07093b',
                                margin: 0,
                                lineHeight: 1.3,
                                display: 'inline-block',
                                backgroundColor: '#07093b12',   // soft highlight
                                padding: '6px 12px',
                                borderRadius: '8px'
                              }}>
                                {categoryName}
                              </h3>
                            </div>
                            
                            {/* Description */}
                            {/* <p style={{
                              color: '#64748b',
                              fontSize: '0.85rem',
                              lineHeight: 1.5,
                              marginBottom: '20px',
                              minHeight: '40px'
                            }}>
                              {categoryDescription}
                            </p> */}
                            
                            {/* View Products Button */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingTop: '15px',
                              borderTop: `1px solid ${borderColor}`
                            }}>
                              <span style={{
                                color: primaryColor,
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                View Products
                                <FontAwesomeIcon 
                                  icon={faArrowRight} 
                                  style={{ fontSize: '0.7rem' }}
                                />
                              </span>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: `${primaryColor}10`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: primaryColor,
                                transition: 'all 0.2s ease'
                              }}>
                                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '0.8rem' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              
              {/* Empty State */}
              {filteredCategories.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px'
                }}>
                  <div style={{
                    background: lightBg,
                    borderRadius: '12px',
                    padding: '50px',
                    maxWidth: '500px',
                    margin: '0 auto',
                    border: `1px solid ${borderColor}`
                  }}>
                    <FontAwesomeIcon 
                      icon={faSearch} 
                      style={{
                        fontSize: '3rem',
                        color: primaryColor,
                        marginBottom: '20px',
                        opacity: 0.5
                      }}
                    />
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: textColor,
                      marginBottom: '10px'
                    }}>
                      No categories found
                    </h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.95rem',
                      marginBottom: '25px'
                    }}>
                      Try a different search term or browse all categories
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      style={{
                        background: primaryColor,
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = primaryColor;
                      }}
                    >
                      Show All Categories
                    </button>
                  </div>
                </div>
              )}
              
              {/* CTA Section */}
              {/* <div style={{
                background: lightBg,
                borderRadius: '12px',
                padding: '40px',
                marginTop: '60px',
                border: `1px solid ${borderColor}`
              }}>
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h4 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: textColor,
                      marginBottom: '10px'
                    }}>
                      Need custom products?
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#64748b',
                      marginBottom: 0,
                      lineHeight: 1.5
                    }}>
                      Request a quote for specialized industrial products
                    </p>
                  </div>
                  <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: primaryColor,
                        color: 'white',
                        padding: '12px 28px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = primaryColor;
                      }}
                    >
                      Request Quote
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              </div> */}
              
              {/* Stats Section */}
              {/* <div className="row mt-40 g-4">
                <div className="col-md-4">
                  <div style={{
                    background: cardBg,
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    border: `1px solid ${borderColor}`
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: primaryColor,
                      marginBottom: '8px'
                    }}>
                      {categories.length}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      Total Categories
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{
                    background: cardBg,
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    border: `1px solid ${borderColor}`
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: primaryColor,
                      marginBottom: '8px'
                    }}>
                      {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      Total Products
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div style={{
                    background: cardBg,
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    border: `1px solid ${borderColor}`
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: primaryColor,
                      marginBottom: '8px'
                    }}>
                      24/7
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      Support Available
                    </div>
                  </div>
                </div>
              </div> */}
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

export default ProductsPage;