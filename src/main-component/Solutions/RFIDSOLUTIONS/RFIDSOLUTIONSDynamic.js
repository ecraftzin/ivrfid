import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWarehouse, faBoxes, faBook, faStore, faGem, 
  faTshirt, faUserCheck, faSuitcase, faCog, 
  faArrowRight, faMapMarkerAlt, faGraduationCap, faUsers,
  faBullhorn, faBluetooth
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getSolutionsByCategory } from '../../../services/solutionsService';
import Loading from '../../../components/Loading/Loading';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import SEO from '../../../components/SEO/SEO';

// Icon mapping for dynamic icons
const iconMap = {
  faWarehouse,
  faBoxes,
  faBook,
  faStore,
  faGem,
  faTshirt,
  faUserCheck,
  faSuitcase,
  faCog,
  faMapMarkerAlt,
  faGraduationCap,
  faUsers,
  faBullhorn,
  faBluetooth
};

const RFIDSOLUTIONSDynamic = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const data = await getSolutionsByCategory('RFID');
        setSolutions(data);
        setError(null);
      } catch (err) {
        console.error('Error loading solutions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  if (loading) {
    return <Loading message="Loading RFID Solutions..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Failed to Load Solutions"
        message="We couldn't load the RFID solutions at this time. Please try again later."
      />
    );
  }

  return (
    <>
      <SEO 
        title="RFID Solutions"
        description="Comprehensive RFID solutions for warehouse management, asset tracking, library systems, retail, jewelry, laundry, baggage tracking, and attendance management."
        keywords={['RFID solutions', 'warehouse management', 'asset tracking', 'inventory management', 'RFID technology', 'UAE', 'GCC']}
        url="/solutions/RFID_SOLUTIONS"
      />

      <section className="service_section pt-5 pb-80 bg-light xb-hidden">
        <div className="container">
          {/* Header Section */}
          <div className="heading_block text-center mb-5">
            <div className="heading_focus_text has_underline d-inline-flex mb-3">
              RFID Technology
            </div>
            <h2 className="heading_text mb-4">
              RFID Solutions
            </h2>
            <p className="mb-0" style={{ maxWidth: '800px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem' }}>
              An RFID (Radio Frequency Identification) based management system is a technology solution that uses RFID tags 
              to track and manage assets and inventory items in real-time. RFID tags are small electronic devices with unique 
              identifiers that can communicate wirelessly with RFID readers or scanners.
            </p>
            <p className="mt-3" style={{ maxWidth: '800px', margin: '20px auto 0', color: '#64748b', fontSize: '1.05rem' }}>
              RFID solutions offer significant benefits in terms of efficiency, accuracy, and visibility throughout the supply chain. 
              They empower organizations to make data-driven decisions, reduce operational costs, and enhance the overall performance 
              of their assets and inventory management processes.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="solutions-grid">
            <div className="row">
              {solutions.map((solution, index) => {
                const icon = iconMap[solution.icon_name] || faCog;
                
                return (
                  <div key={solution.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="solution-card" style={{
                      background: 'white',
                      borderRadius: '15px',
                      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      height: '100%',
                      minHeight: '320px'
                    }}>
                      <div 
                        className="card-header"
                        style={{
                          padding: '25px',
                          cursor: 'pointer',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: `${solution.color}15`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '20px'
                        }}>
                          <FontAwesomeIcon 
                            icon={icon} 
                            style={{ fontSize: '1.8rem', color: solution.color }}
                          />
                        </div>

                        {/* Title */}
                        <h3 style={{
                          color: '#1e293b',
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          marginBottom: '12px',
                          lineHeight: '1.4'
                        }}>
                          {solution.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                          color: '#64748b',
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                          marginBottom: '20px',
                          flex: 1
                        }}>
                          {solution.short_description}
                        </p>

                        {/* Learn More Button */}
                        <div className="text-center mt-3">
                          <Link 
                            to={`/solutions/RFID_SOLUTIONS/${solution.slug}`}
                            style={{
                              background: solution.color,
                              color: 'white',
                              border: 'none',
                              padding: '10px 25px',
                              borderRadius: '25px',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              textDecoration: 'none',
                              width: '100%'
                            }}
                          >
                            View Details
                            <FontAwesomeIcon icon={faArrowRight} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RFIDSOLUTIONSDynamic;

