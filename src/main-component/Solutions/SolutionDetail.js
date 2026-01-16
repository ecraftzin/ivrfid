import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faPhone, faEnvelope, faCalendar,
  faCheckCircle, faChevronRight, faDownload
} from '@fortawesome/free-solid-svg-icons';
import { solutionsData } from './RFIDSOLUTIONS/RFIDSOLUTIONS';

const SolutionDetail = () => {
  const { id } = useParams();
  const solution = solutionsData.find(s => s.id === id);

  if (!solution) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Solution not found</h2>
        <Link to="/solutions/RFID_SOLUTIONS" style={{ color: '#5227FF' }}>
          Back to Solutions
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(135deg, ${solution.color}20, ${solution.color}08)`,
        padding: '80px 0 40px',
        borderBottom: `4px solid ${solution.color}`
      }}>
        <div className="container">
          <Link 
            to="/solutions/RFID_SOLUTIONS"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#64748b',
              textDecoration: 'none',
              marginBottom: '30px',
              fontSize: '0.95rem'
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to All Solutions
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: solution.color,
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem'
            }}>
              <FontAwesomeIcon icon={solution.icon} />
            </div>
            <div>
              <h1 style={{
                color: '#1e293b',
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '0 0 10px 0'
              }}>
                {solution.title}
              </h1>
              <p style={{
                color: '#64748b',
                fontSize: '1.1rem',
                margin: 0
              }}>
                {solution.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 0' }}>
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Overview Section */}
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
                Overview
              </h2>
              <p style={{
                color: '#475569',
                lineHeight: '1.8',
                fontSize: '1.05rem',
                marginBottom: '30px'
              }}>
                {solution.detailedContent.overview}
              </p>
              
              {/* Benefits */}
              {solution.detailedContent.additionalInfo?.benefits && (
                <div style={{ marginTop: '30px' }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '20px'
                  }}>
                    Key Benefits
                  </h3>
                  <div className="row">
                    {solution.detailedContent.additionalInfo.benefits.map((benefit, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px'
                        }}>
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            style={{ color: solution.color, marginTop: '3px' }}
                          />
                          <span style={{ color: '#475569' }}>{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
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
                marginBottom: '30px'
              }}>
                Key Features
              </h2>
              
              <div className="features-grid">
                {solution.detailedContent.features.map((feature, index) => (
                  <div key={index} style={{
                    padding: '25px',
                    marginBottom: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${solution.color}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: `${solution.color}15`,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <FontAwesomeIcon 
                          icon={feature.icon} 
                          style={{ color: solution.color, fontSize: '1.2rem' }}
                        />
                      </div>
                      <div>
                        <h3 style={{
                          color: '#1e293b',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          margin: '0 0 10px 0'
                        }}>
                          {feature.text}
                        </h3>
                        <p style={{
                          color: '#64748b',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications Section */}
            {solution.detailedContent.additionalInfo?.applications && (
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
                  Applications
                </h2>
                
                <div className="row">
                  {solution.detailedContent.additionalInfo.applications.map((app, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 15px',
                        background: '#f8fafc',
                        borderRadius: '8px'
                      }}>
                        <FontAwesomeIcon 
                          icon={faChevronRight} 
                          style={{ color: solution.color, fontSize: '0.8rem' }}
                        />
                        <span style={{ color: '#475569' }}>{app}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Technologies Used */}
            {solution.detailedContent.additionalInfo?.technologies && (
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
                  Technologies Used
                </h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {solution.detailedContent.additionalInfo.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      style={{
                        background: `${solution.color}15`,
                        color: solution.color,
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Card */}
            <div style={{
              background: `linear-gradient(135deg, ${solution.color}, ${solution.color}cc)`,
              borderRadius: '15px',
              padding: '30px',
              color: 'white',
              marginBottom: '30px'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px'
              }}>
                Interested in this Solution?
              </h3>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <FontAwesomeIcon icon={faPhone} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>info@rfid-solutions.com</span>
                </div>
              </div>
              
              <button style={{
                background: 'white',
                color: solution.color,
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}>
                Request a Demo
              </button>
            </div>

            {/* Download Brochure */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <FontAwesomeIcon 
                icon={faDownload} 
                style={{ 
                  fontSize: '2rem', 
                  color: solution.color,
                  marginBottom: '15px' 
                }} 
              />
              <h4 style={{
                color: '#1e293b',
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                Download Solution Brief
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
                Get detailed technical specifications and implementation guide
              </p>
              <button style={{
                background: solution.color,
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Related Solutions */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{
            color: '#1e293b',
            fontSize: '1.8rem',
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Related Solutions
          </h2>
          
          <div className="row">
            {solutionsData
              .filter(s => s.id !== solution.id)
              .slice(0, 3)
              .map(relatedSolution => (
                <div key={relatedSolution.id} className="col-md-4 mb-4">
                  <Link 
                    to={`/solutions/RFID_SOLUTIONS/${relatedSolution.id}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '25px',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: `${relatedSolution.color}15`,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FontAwesomeIcon 
                            icon={relatedSolution.icon} 
                            style={{ color: relatedSolution.color, fontSize: '1.2rem' }}
                          />
                        </div>
                        <h3 style={{
                          color: '#1e293b',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          {relatedSolution.title}
                        </h3>
                      </div>
                      <p style={{
                        color: '#64748b',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {relatedSolution.shortDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-grid > div:hover {
          transform: translateX(5px);
          background: ${solution.color}08;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 30px 15px !important;
          }
          
          div[style*="padding: 40px"] {
            padding: 25px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SolutionDetail;