import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { 
  getAllSolutions
} from '../../services/solutionsService';
import { getSolutionCategories, getSolutionCategoryBySlug } from '../../services/categoriesService';
import FloatingContact from '../FloatingContact/FloatingContact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faCheckCircle,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const SolutionsListingDynamic = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('solutions');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [pageTitle, setPageTitle] = useState('Solutions');
  const [categoryMeta, setCategoryMeta] = useState(null);

  // Whether the category description contains any non-whitespace content (strip HTML)
  const hasCategoryDescription = categoryDescription && String(categoryDescription).replace(/<[^>]*>/g, '').trim().length > 0;
  
  // Modal state
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Handle modal open
  const openModal = (solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSolution(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Focus modal when opened so keyboard/pointer are inside it
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      // allow paint before focusing
      setTimeout(() => {
        try { modalRef.current.focus(); } catch (e) { /* ignore */ }
      }, 0);
    }
  }, [isModalOpen]);

  // Prevent scrolling behind modal
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try to get description from location state first (faster)
        if (location.state && location.state.categoryDescription && category) {
          setCategoryDescription(location.state.categoryDescription);
          if (location.state.categoryName) {
            setPageTitle(location.state.categoryName);
          }
          // If caller provided a categoryMeta object in location state, use it
          if (location.state.categoryMeta) {
            setCategoryMeta(location.state.categoryMeta);
          } else {
            setCategoryMeta(null);
          }
        } else if (category) {
          // Fallback to API call for category details
          try {
            // Prefer fetching by slug first (handles routes like 'electronic-locking-solutions')
            let foundCategory = null;

            try {
              foundCategory = await getSolutionCategoryBySlug(category);
            } catch (slugErr) {
              // slug lookup may fail if slug does not match; we'll fall back to a full list search
              foundCategory = null;
            }

            if (!foundCategory) {
              const categories = await getSolutionCategories();
              const normalizedUrlCategory = category.toLowerCase().replace(/[-_]/g, ' ');

              // Find category details by name
              foundCategory = categories.find(cat => {
                if (typeof cat === 'string') {
                  const normalizedCatName = cat.toLowerCase().replace(/[-_]/g, ' ');
                  return normalizedCatName === normalizedUrlCategory;
                } else if (cat && cat.name) {
                  const normalizedCatName = cat.name.toLowerCase().replace(/[-_]/g, ' ');
                  return normalizedCatName === normalizedUrlCategory;
                }
                return false;
              });
            }

            if (foundCategory) {
              const catName = typeof foundCategory === 'string' ? foundCategory : foundCategory.name;
              // Use admin-provided description when available; otherwise leave empty
              const catDesc = typeof foundCategory === 'string' ? '' : (foundCategory.description ? foundCategory.description : '');

              setCategoryDescription(catDesc);
              setPageTitle(catName);
              setCategoryMeta(foundCategory);
            } else {
              // If category not found, use the URL param but do not set a generated description
              const formattedTitle = category.replace(/[-_]/g, ' ');
              setPageTitle(formattedTitle);
              setCategoryDescription('');
              setCategoryMeta(null);
            }
          } catch (categoryErr) {
            console.error('Error fetching category details:', categoryErr);
            // Use URL param as fallback but avoid setting dummy description
            const formattedTitle = category.replace(/[-_]/g, ' ');
            setPageTitle(formattedTitle);
            setCategoryDescription('');
          }
        }

        // Fetch solutions
        if (category && !subcategory) {
          const data = await getAllSolutions();
          
          // Normalize both the URL category and database categories for comparison
          const normalizedUrlCategory = category.toLowerCase().replace(/[-_]/g, ' ');
          
          const filteredData = data.filter(s => {
            const normalizedDbCategory = (s.category || '').toLowerCase().replace(/[-_]/g, ' ');
            return normalizedDbCategory === normalizedUrlCategory;
          });

          // Validate if category exists
          if (filteredData.length === 0) {
            const allCategories = [...new Set(data.map(s => 
              (s.category || '').toLowerCase().replace(/[-_]/g, ' ')
            ))];
            
            if (!allCategories.includes(normalizedUrlCategory)) {
              throw new Error(`Solution category "${category.replace(/[-_]/g, ' ')}" not found`);
            }
          }

          setSolutions(filteredData);
          setViewMode('solutions');
        } else if (category && subcategory) {
          setSolutions([]);
          setViewMode('solutions');
        } else {
          const data = await getAllSolutions();
          setSolutions(data);
          setViewMode('solutions');
          setPageTitle('All Solutions');
          setCategoryDescription(''); // do not show a generic description
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
    return <Loading message={viewMode === 'subcategories' ? "Loading subcategories..." : "Loading solutions..."} />;
  }

  if (error) {
    return (
      <Fragment>
        <Header />
        <main className="page_content about-page">
          <PageTitle pageTitle="Page Not Found" pagesub="" pageTop="" backgroundImage={categoryMeta?.breadcrumb_image_url || ''} />
          <div className="container" style={{ padding: '60px 0', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🔍</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
              Content Not Found
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '30px', lineHeight: 1.6 }}>
              {error}
            </p>
            <Link
              to="/solutions"
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
              View All Solutions
            </Link>
          </div>
        </main>
        <Footer />
        <Scrollbar />
      </Fragment>
    );
  }

  // Group solutions by category
  const groupedSolutions = solutions.reduce((acc, solution) => {
    const cat = solution.category || 'Other';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(solution);
    return acc;
  }, {});

  // Check if no solutions found
  if (solutions.length === 0) {
    return (
      <Fragment>
        <Header />
        <main className="page_content about-page">
          <PageTitle 
            pageTitle={pageTitle} 
            pagesub={categoryDescription} 
            pageTop="" 
            backgroundImage={categoryMeta?.breadcrumb_image_url || ''}
          />
          <div className="container" style={{ padding: '80px 0', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '30px', opacity: 0.3 }}>💡</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
              No Solutions Found
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '30px', lineHeight: 1.6 }}>
              We couldn't find any solutions in this category. The category may not exist or doesn't have any solutions yet.
            </p>
            <Link
              to="/solutions"
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
              ← Browse All Solutions
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
            pageTop="" 
            backgroundImage={categoryMeta?.breadcrumb_image_url || ''}
          />

          {/* Category-level external link (if provided) */}
          {category && categoryMeta && categoryMeta.link && (
            <div className="container" style={{ marginTop: '12px', textAlign: 'center' }}>
              <a
                href={categoryMeta.link}
                target={categoryMeta.link_target || '_blank'}
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button type="button" style={{
                  background: '#5227FF',
                  color: 'white',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  {categoryMeta.link_label || 'Visit'}
                </button>
              </a>
            </div>
          )}
          
          {/* Category Description Section */}
          {/* Render only when we have a category and non-empty description (no subcategory view) */}
          {category && !subcategory && hasCategoryDescription && (
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
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                  dangerouslySetInnerHTML={{ __html: categoryDescription }}
                />
              </div>
            </div>
          )}
          
          <section className="service_section section_space xb-hidden pb-0">
            <div className="container">
              {Object.entries(groupedSolutions).map(([categoryName, categorySolutions]) => (
                <div key={categoryName} style={{ marginBottom: '60px' }}>
                  {!category && (
                    <div style={{ marginBottom: '30px' }}>
                      <h2 style={{ 
                        fontSize: '2rem', 
                        fontWeight: '700', 
                        marginBottom: '10px',
                        color: '#1e293b'
                      }}>
                        {categoryName}
                      </h2>
                    </div>
                  )}
                  <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {categorySolutions.map((solution) => (
                      <div 
                        className="col-lg-4 col-md-6 mt-30" 
                        key={solution.id}
                        style={{ display: 'flex' }}
                      >
                        <div 
                          onClick={() => openModal(solution)}
                          style={{
                            display: 'flex',
                            flex: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer'
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
                            height: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(82, 39, 255, 0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                          }}
                          >
                            <div style={{
                              height: '250px',
                              width: '100%',
                              overflow: 'hidden',
                              background: solution.image_url ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              position: 'relative',
                              flexShrink: 0
                            }}>
                              {solution.image_url ? (
                                <img
                                  src={solution.image_url}
                                  alt={solution.title}
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
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '3rem',
                                  opacity: 0.7
                                }}>
                                  💡
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
                                color: '#07093b',
                                textAlign: 'center',
                                lineHeight: 1.4,
                                flexShrink: 0
                              }}>
                                {solution.title}
                              </h3>
                              {solution.short_description && (
                                <div
                                  style={{
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
                                  dangerouslySetInnerHTML={{ __html: solution.short_description }}
                                />
                              )}
                              <div style={{
                                marginTop: 'auto',
                                paddingTop: '15px',
                                textAlign: 'center',
                                flexShrink: 0
                              }}>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  fontSize: '0.9rem',
                                  fontWeight: '600',
                                  color: '#5227FF',
                                  backgroundColor: '#5227FF10',
                                  padding: '8px 16px',
                                  borderRadius: '20px',
                                  transition: 'all 0.2s ease'
                                }}>
                                  View Details
                                  <span style={{ fontSize: '0.8rem' }}>→</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
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

        {/* Solution Detail Modal */}
        {isModalOpen && selectedSolution && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000, /* higher than floating elements */
            padding: '20px',
            overflowY: 'auto',
            pointerEvents: 'auto'
          }}
          onClick={closeModal}
          >
            <div
              ref={modalRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              style={{
                background: 'white',
                borderRadius: '20px',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                zIndex: 100001,
                outline: 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f1f5f9',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.transform = 'rotate(0deg)';
                }}
              >
                <FontAwesomeIcon icon={faTimes} style={{ color: '#64748b', fontSize: '1.2rem' }} />
              </button>

              {/* Modal Content */}
              <div style={{
                padding: '40px'
              }}>
                {/* Hero Section */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{
                    background: '#e0e7ff',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '15px'
                  }}>
                    <span style={{ color: '#5227FF', fontWeight: '600', fontSize: '0.85rem' }}>
                      {selectedSolution.category || 'Solution'}
                    </span>
                  </div>
                  
                  <div className="row align-items-center">
                    <div className="col-lg-12">
                      <h1 style={{
                        color: '#1e293b',
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        margin: '0 0 15px 0',
                        lineHeight: '1.2'
                      }}>
                        {selectedSolution.title}
                      </h1>
                      
                      {selectedSolution.short_description && (
                        <p style={{
                          color: '#64748b',
                          fontSize: '1.1rem',
                          margin: 0,
                          lineHeight: '1.6'
                        }}
                          dangerouslySetInnerHTML={{ __html: selectedSolution.short_description }}
                        >
                          {/* {selectedSolution.short_description} */}
                        </p>
                      )}

                      {selectedSolution.overview && (
                        <div style={{
                          marginTop: '12px',
                          color: '#475569',
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          background: '#fbfbff',
                          padding: '12px',
                          borderRadius: '8px'
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Overview</h4>
                          <div dangerouslySetInnerHTML={{ __html: selectedSolution.overview }} />
                        </div>
                      )}
                    </div>
                    
                    {selectedSolution.image_url && (
                      <div className="col-lg-12">
                        <div style={{
                          background: 'white',
                          borderRadius: '15px',
                          padding: '20px',
                          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center'
                        }}>
                          <img 
                            src={selectedSolution.image_url} 
                            alt={selectedSolution.title}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              maxHeight: '250px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  {/* Main Content */}
                  <div className="col-lg-12">
                    {/* Description Section */}
                    {selectedSolution.description && (
                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '30px',
                        marginBottom: '25px'
                      }}>
                        <h2 style={{
                          color: '#1e293b',
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '15px'
                        }}>
                          Description
                        </h2>
                        <div
                          style={{
                            color: '#475569',
                            lineHeight: '1.7',
                            fontSize: '1rem'
                          }}
                          dangerouslySetInnerHTML={{ __html: selectedSolution.description }}
                        />
                      </div>
                    )}

                    {/* Features Section */}
                    {selectedSolution.features && selectedSolution.features.length > 0 && (
                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '30px',
                        marginBottom: '25px'
                      }}>
                        <h2 style={{
                          color: '#1e293b',
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '20px'
                        }}>
                          Key Features
                        </h2>
                        <div className="row">
                          {selectedSolution.features.map((feature, index) => (
                            <div key={index} className="col-md-6 mb-2">
                              <div style={{
                                display: 'flex',
                                gap: '10px',
                                padding: '12px',
                                background: 'white',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                              }}>
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  style={{ color: '#5227FF', fontSize: '1rem', marginTop: '2px', flexShrink: 0 }}
                                />
                                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                  {feature}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications Section */}
                    {selectedSolution.specifications && Object.keys(selectedSolution.specifications).length > 0 && (
                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '30px',
                        marginBottom: '25px'
                      }}>
                        <h2 style={{
                          color: '#1e293b',
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          marginBottom: '20px'
                        }}>
                          Technical Specifications
                        </h2>
                        <div style={{
                          background: 'white',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #e2e8f0'
                        }}>
                          {Object.entries(selectedSolution.specifications).map(([key, value], index) => (
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                padding: '12px 15px',
                                borderBottom: index < Object.keys(selectedSolution.specifications).length - 1 ? '1px solid #e2e8f0' : 'none',
                                background: index % 2 === 0 ? 'white' : '#f8fafc'
                              }}
                            >
                              <div style={{
                                flex: '0 0 40%',
                                fontWeight: '600',
                                color: '#1e293b',
                                fontSize: '0.9rem'
                              }}>
                                {key}
                              </div>
                              <div style={{
                                flex: '1',
                                color: '#475569',
                                fontSize: '0.9rem'
                              }}>
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="col-lg-4">
                    {/* Applications */}
                    {selectedSolution.applications && selectedSolution.applications.length > 0 && (
                      <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '25px',
                        marginBottom: '25px'
                      }}>
                        <h3 style={{
                          color: '#1e293b',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          marginBottom: '15px'
                        }}>
                          Applications
                        </h3>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {selectedSolution.applications.map((app, index) => (
                            <li
                              key={index}
                              style={{
                                padding: '8px 0',
                                borderBottom: index < selectedSolution.applications.length - 1 ? '1px solid #e2e8f0' : 'none',
                                color: '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.9rem'
                              }}
                            >
                              <FontAwesomeIcon icon={faChevronRight} style={{ color: '#5227FF', fontSize: '0.7rem' }} />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contact CTA */}
                    {/* <div style={{
                      background: 'linear-gradient(135deg, #5227FF, #5227FFdd)',
                      borderRadius: '12px',
                      padding: '25px',
                      color: 'white'
                    }}>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: 'white'
                      }}>
                        Interested in this solution?
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        marginBottom: '15px',
                        opacity: 0.95
                      }}>
                        Contact us for consultation, implementation, and support.
                      </p>
                      <Link
                        to="/contact"
                        onClick={closeModal}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'white',
                          color: '#5227FF',
                          padding: '10px 20px',
                          borderRadius: '25px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          marginBottom: '10px',
                          width: '100%',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        Request Consultation
                      </Link>
                      <a
                        href="tel:+971507899896"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '25px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          justifyContent: 'center'
                        }}
                      >
                        <FontAwesomeIcon icon={faPhone} />
                        Call Us
                      </a>
                    </div> */}

                    {/* Download Button if PDF exists */}
                    {/* {selectedSolution.pdf_url && (
                      <div style={{ marginTop: '20px' }}>
                        <a
                          href={selectedSolution.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#10b981',
                            color: 'white',
                            padding: '12px 20px',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            justifyContent: 'center'
                          }}
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          Download Brochure
                        </a>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SolutionsListingDynamic;