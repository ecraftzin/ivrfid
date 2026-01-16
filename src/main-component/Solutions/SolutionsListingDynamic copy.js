import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { 
  getAllSolutions
} from '../../services/solutionsService';
import { getSolutionCategories } from '../../services/categoriesService';
import FloatingContact from '../FloatingContact/FloatingContact';

const SolutionsListingDynamic = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('solutions');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [pageTitle, setPageTitle] = useState('Solutions');

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

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
        } else if (category) {
          // Fallback to API call for category details
          try {
            const categories = await getSolutionCategories();
            const normalizedUrlCategory = category.toLowerCase().replace(/[-_]/g, ' ');
            
            // Find category details
            const foundCategory = categories.find(cat => {
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
              const catName = typeof foundCategory === 'string' ? foundCategory : foundCategory.name;
              const catDesc = typeof foundCategory === 'string' 
                ? `Explore our comprehensive ${catName.toLowerCase()} solutions designed for your business needs.`
                : foundCategory.description || `Explore our comprehensive ${catName.toLowerCase()} solutions designed for your business needs.`;
              
              setCategoryDescription(catDesc);
              setPageTitle(catName);
            } else {
              // If category not found in categories API, use the URL param
              const formattedTitle = category.replace(/[-_]/g, ' ');
              setPageTitle(formattedTitle);
              setCategoryDescription(`Explore our comprehensive ${formattedTitle.toLowerCase()} solutions designed for your business needs.`);
            }
          } catch (categoryErr) {
            console.error('Error fetching category details:', categoryErr);
            // Use URL param as fallback
            const formattedTitle = category.replace(/[-_]/g, ' ');
            setPageTitle(formattedTitle);
            setCategoryDescription(`Explore our comprehensive ${formattedTitle.toLowerCase()} solutions.`);
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
          setCategoryDescription('Browse our comprehensive range of industrial and business solutions.');
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
          <PageTitle pageTitle="Page Not Found" pagesub="" pageTop="" />
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
            // pagesub={categoryDescription} 
            pageTop="" 
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
                      {/* <p style={{
                        fontSize: '1.1rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        maxWidth: '800px'
                      }}>
                        {defaultDescriptions[categoryName] || `Explore our comprehensive ${categoryName.toLowerCase()} solutions designed for your business needs.`}
                      </p> */}
                    </div>
                  )}
                  <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {categorySolutions.map((solution) => (
                      <div 
                        className="col-lg-4 col-md-6 mt-30" 
                        key={solution.id}
                        style={{ display: 'flex' }}
                      >
                        <Link 
                          onClick={ClickHandler} 
                          to={`/solutions/${solution.category.toLowerCase().replace(/\s+/g, '-')}/${solution.slug}`}
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

// Add defaultDescriptions for the main component
// const defaultDescriptions = {
//   'Warehousing Solutions': 'Streamline your storage and inventory management with smart warehousing solutions.',
//   'Industrial Automation': 'Automate processes for increased efficiency and reduced operational costs.',
//   'Supply Chain': 'Optimize your supply chain with end-to-end visibility and control.',
//   'Quality Control': 'Implement robust quality assurance systems and inspection solutions.',
//   'Process Optimization': 'Enhance operational efficiency through process analysis and improvement.',
//   'Logistics': 'Streamline transportation, distribution, and delivery operations.',
//   'Laboratory Solutions': 'Advanced laboratory setup, equipment, and testing solutions.',
//   'Packaging': 'Innovative packaging solutions for product protection and presentation.',
//   'Digital Transformation': 'Digitize your operations with cutting-edge technology solutions.',
//   'Business Intelligence': 'Data-driven insights and analytics for strategic decision making.',
//   'Modular Solutions': 'Scalable and flexible modular systems for various applications.',
// };

export default SolutionsListingDynamic;