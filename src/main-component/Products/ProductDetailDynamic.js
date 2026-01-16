import React, { Fragment, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faEnvelope, faPhone,
  faChevronRight, faStar, faTags
} from '@fortawesome/free-solid-svg-icons';
import { getProductBySlug, getSubcategoriesByProductId } from '../../services/productsService';
import Header from '../../components/header/Header';
import Footer from '../../components/software-company-components/Footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SEO from '../../components/SEO/SEO';
import FloatingContact from '../FloatingContact/FloatingContact';

const ProductDetailDynamic = () => {
  const { category, subcategory, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productSlug = slug || subcategory;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(productSlug);
        setProduct(data);
        
        if (data && data.id) {
          const subcats = await getSubcategoriesByProductId(data.id);
          setSubcategories(subcats);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <ErrorMessage 
        title="Product Not Found"
        message="We couldn't find the product you're looking for. It may have been moved or deleted."
      />
    );
  }

  const hasDescription = product && product.description && product.description.replace(/<[^>]*>/g, '').trim().length > 0;

  return (
    <Fragment> 
      <SEO
        title={product.meta_title || product.title}
        description={product.meta_description || product.short_description}
        keywords={product.meta_keywords || []}
        url={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.slug}`}
        image={product.image_url}
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
                    {product.category} {product.subcategory && `• ${product.subcategory}`}
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
                  {product.title}
                </h1>
                
                <p style={{
                  color: '#64748b',
                  fontSize: '1.2rem',
                  margin: '0 0 30px 0',
                  lineHeight: '1.7',
                  maxWidth: '90%'
                }}
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                >
                  {/* {product.short_description} */}
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
                    Request Quote
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
              
              {product.image_url && (
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
                      src={product.image_url} 
                      alt={product.title}
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
                            <span style="color: #94a3b8; font-size: 1.2rem;">Product Image</span>
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
          {/* Description Section */}
          {hasDescription && (
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
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #5227FF, #3B82F6)',
                  borderRadius: '3px'
                }}></span>
                Product Description
              </h2>
              <div style={{
                color: '#475569',
                lineHeight: '1.8',
                fontSize: '1.1rem',
                maxWidth: '90%'
              }}>
                {product.description.split('\n').filter((paragraph) => paragraph.replace(/<[^>]*>/g, '').trim().length > 0).map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '1.5rem' }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {product.features && product.features.length > 0 && (
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
                {product.features.map((feature, index) => (
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

          {/* Product Variants Section */}
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
                Product Variants & Options
              </h2>
              
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                marginBottom: '40px',
                lineHeight: '1.7',
                maxWidth: '80%'
              }}>
                Explore our range of {product.title} variants and options to find the perfect fit for your needs.
              </p>
              
              <div className="row g-4">
                {subcategories.map((subcat) => (
                  <div key={subcat.id} className="col-md-6 col-lg-4">
                    <Link
                      to={`/products/${category}/subcategory/${subcat.slug}`}
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
                                objectFit: 'contain',
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
                                    <div style="text-align: center;">
                                      <FontAwesomeIcon icon={faTags} style={{ color: '#94a3b8', fontSize: '2rem', marginBottom: '10px' }} />
                                      <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No Image Available</div>
                                    </div>
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
                              <div style={{ textAlign: 'center' }}>
                                <FontAwesomeIcon icon={faTags} style={{ color: '#94a3b8', fontSize: '2rem', marginBottom: '10px' }} />
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No Image Available</div>
                              </div>
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
                          
                          {subcat.short_description && (
                            <p style={{
                              color: '#64748b',
                              fontSize: '0.9rem',
                              lineHeight: '1.6',
                              margin: '0 0 20px 0',
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: '3',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {subcat.short_description}
                            </p>
                          )}
                          
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
                              View Details
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

          {/* Specifications Section */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
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
                borderBottom: '3px solid #f1f5f9'
              }}>
                Technical Specifications
              </h2>
              <div style={{
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                maxWidth: '100%'
              }}>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      padding: '20px 30px',
                      borderBottom: index < Object.keys(product.specifications).length - 1 ? '1px solid #e2e8f0' : 'none',
                      background: index % 2 === 0 ? 'white' : '#f8fafc',
                      transition: 'background-color 0.2s ease',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                    }}
                  >
                    <div style={{
                      flex: '0 0 35%',
                      fontWeight: '600',
                      color: '#1e293b',
                      fontSize: '1rem',
                      paddingRight: '30px'
                    }}>
                      {key}
                    </div>
                    <div style={{
                      flex: '1',
                      color: '#475569',
                      fontSize: '1rem',
                      borderLeft: '1px solid #e2e8f0',
                      paddingLeft: '30px',
                      lineHeight: '1.6'
                    }}>
                      {value}
                    </div>
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
            }} /> */}
            
            {/* <div style={{
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
                Ready to Get Started?
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
                Contact us today for pricing, customization options, bulk orders, or any questions about {product.title}.
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
                  Request a Quote
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

export default ProductDetailDynamic;