import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faEnvelope, faCheckCircle, faChevronRight,
  faTags, faStar, faCog, faLightbulb, faRocket
} from '@fortawesome/free-solid-svg-icons';
import { getSolutionBySlug, getSubcategoriesBySolutionId } from '../../services/solutionsService';
import Header from '../../components/header/Header';
import Footer from '../../components/software-company-components/Footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SEO from '../../components/SEO/SEO';
import FloatingContact from '../FloatingContact/FloatingContact';

const SolutionDetailDynamic = () => {
  const { category, subcategory, slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const solutionSlug = slug || subcategory;

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setLoading(true);
        const data = await getSolutionBySlug(solutionSlug);
        setSolution(data);
        
        if (data && data.id) {
          const subcats = await getSubcategoriesBySolutionId(data.id);
          setSubcategories(subcats);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading solution:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (solutionSlug) {
      fetchSolution();
    }
  }, [solutionSlug]);

  if (loading) {
    return <Loading message="Loading solution details..." />;
  }

  if (error || !solution) {
    return (
      <ErrorMessage 
        title="Solution Not Found"
        message="We couldn't find the solution you're looking for. It may have been moved or deleted."
      />
    );
  }

  return (
    <Fragment>
      <SEO
        title={solution.meta_title || solution.title}
        description={solution.meta_description || solution.short_description}
        keywords={solution.meta_keywords || []}
        url={`/solutions/${solution.category.toLowerCase().replace(/\s+/g, '-')}/${solution.slug}`}
        image={solution.image_url}
      />
      <Header />
      <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #5227FF15, #5227FF05)',
          padding: '100px 0 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5227FF10, #5227FF05)',
            zIndex: 0
          }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #5227FF, #3B82F6)',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  marginBottom: '25px',
                  boxShadow: '0 4px 12px rgba(82, 39, 255, 0.2)'
                }}>
                  <FontAwesomeIcon icon={faTags} style={{ color: 'white', fontSize: '0.9rem' }} />
                  <span style={{ color: 'white', fontWeight: '500', fontSize: '0.9rem' }}>
                    {solution.category}
                  </span>
                </div>
                
                <h1 style={{
                  color: '#1e293b',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: '800',
                  margin: '0 0 25px 0',
                  lineHeight: '1.2',
                  background: 'linear-gradient(135deg, #1e293b, #334155)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {solution.title}
                </h1>
                
                <p style={{
                  color: '#64748b',
                  fontSize: '1.2rem',
                  margin: '0 0 30px 0',
                  lineHeight: '1.7',
                  maxWidth: '90%'
                }}
                  dangerouslySetInnerHTML={{ __html: solution.short_description }}
                >
                  {/* {solution.short_description} */}
                </p>
                
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'linear-gradient(135deg, #5227FF, #3B82F6)',
                      color: 'white',
                      padding: '14px 35px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(82, 39, 255, 0.3)',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(82, 39, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(82, 39, 255, 0.3)';
                    }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    Get a Demo
                  </Link>
                  
                  <a
                    href="tel:+971507899896"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'white',
                      color: '#5227FF',
                      padding: '14px 35px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '2px solid #e2e8f0'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                      e.target.style.borderColor = '#5227FF';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    Call Now
                  </a>
                </div>
              </div>
              
              {solution.image_url && (
                <div className="col-lg-5">
                  <div style={{
                    background: 'white',
                    borderRadius: '25px',
                    padding: '40px',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                  }}>
                    {/* Decorative corner */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #5227FF, transparent 70%)',
                      borderRadius: '0 25px 0 0'
                    }} />
                    
                    <img 
                      src={solution.image_url} 
                      alt={solution.title}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15))'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; border-radius: 15px;">
                            <FontAwesomeIcon icon={faCog} style={{ color: '#94a3b8', fontSize: '3rem' }} />
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container" style={{ padding: '60px 0' }}>
          {/* Overview Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '50px',
            marginBottom: '40px',
            boxShadow: '0 5px 30px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h2 style={{
              color: '#1e293b',
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '3px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FontAwesomeIcon icon={faLightbulb} style={{ color: '#5227FF' }} />
              Solution Overview
            </h2>
            <div style={{
              color: '#475569',
              lineHeight: '1.8',
              fontSize: '1.1rem',
              maxWidth: '90%'
            }}>
              {solution.overview.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.5rem' }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}>
                  {/* {paragraph} */}
                </p>
              ))}
            </div>
          </div>

          {/* Features Section */}
          {solution.features && solution.features.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '50px',
              marginBottom: '40px',
              boxShadow: '0 5px 30px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '30px',
                paddingBottom: '15px',
                borderBottom: '3px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <FontAwesomeIcon icon={faStar} style={{ color: '#5227FF', fontSize: '1.5rem' }} />
                Key Features
              </h2>
              <div className="row g-4">
                {solution.features.map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      padding: '25px',
                      background: '#f8fafc',
                      borderRadius: '15px',
                      border: '1px solid #e2e8f0',
                      height: '100%',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.borderColor = '#5227FF';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(82, 39, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        flexShrink: 0,
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #5227FF, #3B82F6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: 'white', fontSize: '0.9rem' }}
                        />
                      </div>
                      <span style={{ 
                        color: '#475569', 
                        fontSize: '1rem', 
                        lineHeight: '1.6',
                        flex: 1 
                      }}>
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies & Industries Section */}
          {(solution.technologies?.length > 0 || solution.industries?.length > 0) && (
            <div className="row g-4 mb-4">
              {/* Technologies Used */}
              {solution.technologies?.length > 0 && (
                <div className="col-md-6">
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    height: '100%',
                    boxShadow: '0 5px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{
                      color: '#1e293b',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '25px',
                      paddingBottom: '15px',
                      borderBottom: '3px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <FontAwesomeIcon icon={faCog} style={{ color: '#5227FF' }} />
                      Technologies Used
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {solution.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'linear-gradient(135deg, #5227FF15, #3B82F615)',
                            color: '#5227FF',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(82, 39, 255, 0.2)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #5227FF, #3B82F6)';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #5227FF15, #3B82F615)';
                            e.currentTarget.style.color = '#5227FF';
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Industries */}
              {solution.industries?.length > 0 && (
                <div className="col-md-6">
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    height: '100%',
                    boxShadow: '0 5px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{
                      color: '#1e293b',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '25px',
                      paddingBottom: '15px',
                      borderBottom: '3px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <FontAwesomeIcon icon={faRocket} style={{ color: '#5227FF' }} />
                      Target Industries
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {solution.industries.map((industry, index) => (
                        <li
                          key={index}
                          style={{
                            padding: '12px 0',
                            borderBottom: index < solution.industries.length - 1 ? '1px solid #e2e8f0' : 'none',
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'color 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#5227FF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#475569';
                          }}
                        >
                          <FontAwesomeIcon icon={faChevronRight} style={{ color: '#5227FF', fontSize: '0.8rem' }} />
                          {industry}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Solution Variants Section */}
          {subcategories && subcategories.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '50px',
              marginBottom: '40px',
              boxShadow: '0 5px 30px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e2e8f0'
            }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '30px',
                paddingBottom: '15px',
                borderBottom: '3px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <FontAwesomeIcon icon={faTags} style={{ color: '#5227FF', fontSize: '1.5rem' }} />
                Solution Variants & Options
              </h2>
              
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '40px',
                lineHeight: '1.7',
                maxWidth: '80%'
              }}>
                Explore our specialized variants of {solution.title} tailored for different business needs and requirements.
              </p>
              
              <div className="row g-4">
                {subcategories.map((subcat) => (
                  <div key={subcat.id} className="col-md-6 col-lg-4">
                    <Link
                      to={`/solutions/${category}/subcategory/${subcat.slug}`}
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        display: 'block',
                        height: '100%'
                      }}
                    >
                      <div style={{
                        height: '100%',
                        background: '#f8fafc',
                        borderRadius: '15px',
                        border: '2px solid #e2e8f0',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.borderColor = '#5227FF';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(82, 39, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        {/* Image Container */}
                        <div style={{
                          width: '100%',
                          height: '200px',
                          overflow: 'hidden',
                          position: 'relative',
                          background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'
                        }}>
                          {subcat.image_url ? (
                            <img
                              src={subcat.image_url}
                              alt={subcat.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.08)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `
                                  <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f1f5f9;">
                                    <FontAwesomeIcon icon={faCog} style={{ color: '#94a3b8', fontSize: '2.5rem' }} />
                                  </div>
                                `;
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'
                            }}>
                              <FontAwesomeIcon icon={faCog} style={{ color: '#94a3b8', fontSize: '2.5rem' }} />
                            </div>
                          )}
                          
                          {/* Hover Overlay */}
                          <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            background: 'linear-gradient(135deg, rgba(82, 39, 255, 0.1), transparent)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }}
                          className="hover-overlay"
                          />
                        </div>
                        
                        {/* Content Container */}
                        <div style={{
                          padding: '25px',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <h3 style={{
                            color: '#1e293b',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            margin: '0 0 12px 0',
                            lineHeight: '1.4'
                          }}>
                            {subcat.title}
                          </h3>
                          
                          {/* {subcat.description && (
                            <div style={{
                              color: '#64748b',
                              fontSize: '0.9rem',
                              lineHeight: '1.6',
                              margin: '0 0 20px 0',
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: '3',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                            dangerouslySetInnerHTML={{ __html: subcat.description }}
                            />
                          )} */}
                          
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 'auto',
                            paddingTop: '15px',
                            borderTop: '1px solid #e2e8f0'
                          }}>
                            <span style={{
                              color: '#5227FF',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              Explore Variant
                              <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.8rem' }} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA Section */}
          {/* <div style={{
            background: 'linear-gradient(135deg, #5227FF, #3B82F6)',
            borderRadius: '25px',
            padding: '60px',
            color: 'white',
            boxShadow: '0 20px 50px rgba(82, 39, 255, 0.25)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '60px'
          }}> */}
            {/* Decorative elements */}
            {/* <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)'
            }} /> */}
            
            {/* <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: 'white'
              }}>
                Ready to Transform Your Business?
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                marginBottom: '40px',
                opacity: 0.95,
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: '1.7'
              }}>
                Contact our solution experts today to discuss how {solution.title} can solve your business challenges.
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center',
                flexWrap: 'wrap' 
              }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'white',
                    color: '#5227FF',
                    padding: '16px 40px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    border: '2px solid white'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    e.target.style.background = 'white';
                    e.target.style.color = '#5227FF';
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Request a Demo
                </Link>
                
                <a
                  href="tel:+971507899896"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '16px 40px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  Call +971 50 789 9896
                </a>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      <Footer />
      <Scrollbar />
      <FloatingContact />
    </Fragment>
  );
};

export default SolutionDetailDynamic;