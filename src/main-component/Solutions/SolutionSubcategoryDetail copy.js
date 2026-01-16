import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faCheckCircle, faEnvelope, faPhone,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { getSolutionSubcategoryBySlug } from '../../services/solutionsService';
import Header from '../../components/header/Header';
import Footer from '../../components/software-company-components/Footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SEO from '../../components/SEO/SEO';
import FloatingContact from '../FloatingContact/FloatingContact';

const SolutionSubcategoryDetail = () => {
  const { category, subcategorySlug } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        setLoading(true);
        const data = await getSolutionSubcategoryBySlug(subcategorySlug);
        setSubcategory(data);
        setError(null);
      } catch (err) {
        console.error('Error loading subcategory:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subcategorySlug) {
      fetchSubcategory();
    }
  }, [subcategorySlug]);

  if (loading) {
    return <Loading message="Loading details..." />;
  }

  if (error || !subcategory) {
    return (
      <ErrorMessage 
        title="Subcategory Not Found"
        message="We couldn't find the details you're looking for. It may have been moved or deleted."
      />
    );
  }

  return (
    <Fragment>
      <SEO
        title={subcategory.meta_title || subcategory.title}
        description={subcategory.meta_description || subcategory.title}
        keywords={subcategory.meta_keywords || []}
        url={`/solutions/${category}/${subcategorySlug}`}
        image={subcategory.image_url}
      />
      <Header />
      <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #5227FF20, #5227FF08)',
          padding: '100px 0 40px',
          borderBottom: '4px solid #5227FF'
        }}>
          <div className="container">
            <Link
              to={`/solutions/${category}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                textDecoration: 'none',
                marginBottom: '30px',
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#5227FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Solutions
            </Link>
            
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div style={{
                  background: '#e0e7ff',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  display: 'inline-block',
                  marginBottom: '20px'
                }}>
                  <span style={{ color: '#5227FF', fontWeight: '600', fontSize: '0.9rem' }}>
                    Solution Option
                  </span>
                </div>
                
                <h1 style={{
                  color: '#1e293b',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  margin: '0 0 20px 0',
                  lineHeight: '1.2'
                }}>
                  {subcategory.title}
                </h1>
                
                {subcategory.short_description && (
                  <p style={{
                    color: '#64748b',
                    fontSize: '1.2rem',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {subcategory.short_description}
                  </p>
                )}
              </div>
              
              {subcategory.image_url && (
                <div className="col-lg-6">
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                  }}>
                    <img 
                      src={subcategory.image_url} 
                      alt={subcategory.title}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '60px 0' }}>
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Description Section */}
              {subcategory.description && (
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}>
                  <h2 style={{
                    color: '#1e293b',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    marginBottom: '20px'
                  }}>
                    Description
                  </h2>
                  <div
                    style={{
                      color: '#475569',
                      lineHeight: '1.8',
                      fontSize: '1.05rem'
                    }}
                    dangerouslySetInnerHTML={{ __html: subcategory.description }}
                  />
                </div>
              )}

              {/* Features Section */}
              {subcategory.features && subcategory.features.length > 0 && (
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}>
                  <h2 style={{
                    color: '#1e293b',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    marginBottom: '25px'
                  }}>
                    Key Features
                  </h2>
                  <div className="row">
                    {subcategory.features.map((feature, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '15px',
                          background: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: '#5227FF', fontSize: '1.2rem', marginTop: '3px' }}
                          />
                          <span style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Section */}
              {subcategory.specifications && Object.keys(subcategory.specifications).length > 0 && (
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}>
                  <h2 style={{
                    color: '#1e293b',
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    marginBottom: '25px'
                  }}>
                    Technical Specifications
                  </h2>
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                  }}>
                    {Object.entries(subcategory.specifications).map(([key, value], index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          padding: '15px 20px',
                          borderBottom: index < Object.keys(subcategory.specifications).length - 1 ? '1px solid #e2e8f0' : 'none',
                          background: index % 2 === 0 ? 'white' : '#f8fafc'
                        }}
                      >
                        <div style={{
                          flex: '0 0 40%',
                          fontWeight: '600',
                          color: '#1e293b',
                          fontSize: '0.95rem'
                        }}>
                          {key}
                        </div>
                        <div style={{
                          flex: '1',
                          color: '#475569',
                          fontSize: '0.95rem'
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
              {subcategory.applications && subcategory.applications.length > 0 && (
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '30px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '20px'
                  }}>
                    Applications
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {subcategory.applications.map((app, index) => (
                      <li
                        key={index}
                        style={{
                          padding: '10px 0',
                          borderBottom: index < subcategory.applications.length - 1 ? '1px solid #e2e8f0' : 'none',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <FontAwesomeIcon icon={faChevronRight} style={{ color: '#5227FF', fontSize: '0.8rem' }} />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact CTA */}
              <div style={{
                background: 'linear-gradient(135deg, #5227FF, #5227FFdd)',
                borderRadius: '15px',
                padding: '30px',
                color: 'white',
                boxShadow: '0 5px 20px rgba(82, 39, 255, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: 'white'
                }}>
                  Interested in this solution?
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  marginBottom: '20px',
                  opacity: 0.95
                }}>
                  Contact us for consultation, implementation, and support.
                </p>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    color: '#5227FF',
                    padding: '12px 25px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
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
                    padding: '12px 25px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
      <FloatingContact />
    </Fragment>
  );
};

export default SolutionSubcategoryDetail;
