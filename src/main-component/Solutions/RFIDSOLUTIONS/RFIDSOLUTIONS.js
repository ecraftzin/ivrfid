import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWarehouse, faBoxes, faBook, faShoppingCart, faGem, 
  faTshirt, faUsers, faSuitcase, faCogs, 
  faArrowRight, faCheckCircle, faSearch, faShieldAlt, 
  faChartLine, faClock, faTag, faBarcode, faSync,
  faEye, faTruck, faPlane, faDollarSign, faCog,
  faArrowDown, faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Export solutionsData so it can be used in detail pages
export const solutionsData = [
  {
    id: '1',
    title: 'RFID Warehouse Management System',
    shortDescription: 'Automate inventory tracking and real-time visibility across supply chain.',
    icon: faWarehouse,
    color: '#3498db',
    detailedContent: {
      overview: 'RFID warehouse management systems use radio frequency identification to automate inventory tracking, reduce errors, and provide real-time visibility of goods across the supply chain. They are increasingly adopted in logistics, retail, and manufacturing to improve efficiency and cut costs.',
      features: [
        { icon: faTruck, text: 'Automated Receiving & Shipping', description: 'Fixed RFID portals at dock doors can instantly read every tagged pallet or case as it enters or leaves, automating check-in/out.' },
        { icon: faEye, text: 'Real-Time Inventory Visibility', description: 'With readers on forklifts or shelves, the system can track an item\'s location to the specific aisle and shelf in real-time, eliminating manual searches.' },
        { icon: faSearch, text: 'Highly Accurate Cycle Counting', description: 'Inventory counts can be done rapidly without moving items, raising accuracy rates to over 95%.' },
        { icon: faSync, text: 'Smart Replenishment & Loss Prevention', description: 'Systems can trigger automatic replenishment and automatically verify that outgoing orders are correct before they ship, reducing errors and disputes.' }
      ],
      additionalInfo: {
        benefits: [
          'Reduce labor costs by 60-80%',
          'Improve inventory accuracy to 99%',
          'Increase operational efficiency by 30%',
          'Reduce shrinkage and loss by 70%'
        ],
        applications: [
          'Manufacturing warehouses',
          'Retail distribution centers',
          '3PL logistics providers',
          'Cold storage facilities'
        ],
        technologies: ['UHF RFID Readers', 'Fixed Portals', 'Handheld Readers', 'Cloud-based Software']
      }
    }
  },
  {
    id: '2',
    title: 'RFID Asset Management & Tracking Solutions',
    shortDescription: 'Automate asset tracking with substantial improvements in efficiency and accuracy.',
    icon: faBoxes,
    color: '#2ecc71',
    detailedContent: {
      overview: 'RFID (Radio-Frequency Identification) technology automates asset tracking by using tags attached to items and readers that wirelessly capture their data. This system offers substantial improvements in efficiency and accuracy over manual or barcode methods.',
      features: [
        { icon: faChartLine, text: 'Operational Efficiency', description: 'Scan hundreds of items in seconds without line-of-sight, reducing manual counting by up to 99%.' },
        { icon: faShieldAlt, text: 'Loss Reduction & Better Utilization', description: 'Eliminate "ghost assets" and optimize the use of existing equipment.' },
        { icon: faCheckCircle, text: 'Data Accuracy & Compliance', description: 'Achieve over 99% inventory accuracy, providing reliable data for audits.' }
      ],
      additionalInfo: {
        benefits: [
          'Reduce asset search time by 90%',
          'Eliminate manual data entry errors',
          'Improve asset utilization by 40%',
          'Reduce replacement costs by 25%'
        ],
        applications: [
          'IT equipment tracking',
          'Medical device management',
          'Construction equipment',
          'Educational assets'
        ],
        technologies: ['Active RFID Tags', 'GPS Integration', 'IoT Sensors', 'Mobile Apps']
      }
    }
  },
  // ... Add similar additionalInfo to all other solutions
  {
    id: '3',
    title: 'RFID Library Management System',
    shortDescription: 'Efficient tracking and monitoring of inventory in libraries with automated operations.',
    icon: faBook,
    color: '#9b59b6',
    detailedContent: {
      overview: 'Leveraging RFID technology, our system enables efficient tracking and monitoring of inventory in libraries. By streamlining inventory management, it allows libraries to easily locate misplaced items and ensures faster, more secure operations.',
      features: [
        { icon: faClock, text: '80-90% faster inventory processes', description: 'Drastically reduces time spent on inventory management.' },
        { icon: faBarcode, text: 'Simultaneous scanning of multiple items', description: 'Scan 10-100+ items at once without individual handling.' },
        { icon: faUsers, text: 'Reduced staff workload', description: 'Automates routine tasks, freeing staff for customer service.' },
        { icon: faCheckCircle, text: 'Improved accuracy', description: 'Achieves near 100% inventory accuracy.' },
        { icon: faShieldAlt, text: 'Enhanced security', description: 'Automated theft prevention system.' }
      ],
      additionalInfo: {
        benefits: [
          'Reduce check-in/out time by 80%',
          'Eliminate manual shelf reading',
          'Improve patron satisfaction',
          'Reduce book loss by 60%'
        ],
        applications: [
          'Public libraries',
          'University libraries',
          'School libraries',
          'Corporate libraries'
        ],
        technologies: ['RFID Self-Checkout', 'Security Gates', 'Book Drops', 'Inventory Wands']
      }
    }
  },
  // ... Continue with other solutions
];

const RFID_SOLUTIONS = () => {
  return (
    <section className="solutions_section section_space" style={{ 
      background: '#f8fafc',
      position: 'relative',
      padding: '80px 0'
    }}>
      <div className="container">
        <div className="heading_block text-center mb-5">
          <div className="heading_focus_text has_underline d-inline-flex mb-3" style={{
            backgroundColor: '#5227FF',
            color: 'white',
            padding: '8px 25px',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            RFID SOLUTIONS
          </div>
          <h2 className="heading_text mb-4" style={{
            color: '#1e293b',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.3'
          }}>
            Comprehensive
            <span style={{
              backgroundColor: '#5227FF',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '10px',
              display: 'inline-block',
              margin: '0 10px'
            }}>
              RFID
            </span>
            Solutions
          </h2>
          <p className="mb-4" style={{
            maxWidth: '900px',
            margin: '0 auto',
            color: '#475569',
            lineHeight: '1.7',
            fontSize: '1.1rem'
          }}>
            An RFID (Radio Frequency Identification) based management system is a technology solution that uses RFID tags to track and manage assets and inventory items in real-time.
          </p>
          <p className="mb-5" style={{
            maxWidth: '900px',
            margin: '0 auto',
            color: '#475569',
            lineHeight: '1.7',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            RFID solutions offer significant benefits in terms of efficiency, accuracy, and visibility throughout the supply chain.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="solutions-grid">
          <div className="row">
            {solutionsData.map((solution, index) => (
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
                  {/* Card Header */}
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
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                      {/* Solution Number */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: solution.color,
                        color: 'white',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        {/* Title */}
                        <h3 style={{
                          color: '#1e293b',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          margin: '0 0 10px 0',
                          lineHeight: '1.4'
                        }}>
                          {solution.title}
                        </h3>

                        {/* Short Description */}
                        <p style={{
                          color: '#64748b',
                          fontSize: '0.9rem',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {solution.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Icon Display */}
                    <div style={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80px'
                    }}>
                      <FontAwesomeIcon 
                        icon={solution.icon} 
                        style={{
                          fontSize: '3rem',
                          color: solution.color,
                          opacity: 0.2
                        }}
                      />
                    </div>

                    {/* Learn More Button */}
                    <div className="text-center mt-3">
                      <Link 
                        to={`/solutions/RFID_SOLUTIONS/${solution.id}`}
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
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5 pt-5">
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '50px 30px',
            borderRadius: '20px',
            color: 'white',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700', 
              marginBottom: '15px' 
            }}>
              Need a Custom RFID Solution?
            </h3>
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '30px', 
              opacity: '0.9',
              maxWidth: '700px',
              margin: '0 auto 30px auto'
            }}>
              We specialize in creating tailored RFID solutions for unique business challenges across various industries.
            </p>
            <button style={{
              backgroundColor: 'white',
              color: '#5227FF',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
            }}>
              Request Custom Solution
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .solution-card {
          position: relative;
        }
        
        .solution-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }
        
        .solution-card:hover .card-header {
          background-color: #f8fafc;
        }
        
        @media (max-width: 991px) {
          .heading_text {
            font-size: 2rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .heading_text {
            font-size: 1.6rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .heading_text {
            font-size: 1.4rem !important;
          }
          
          .heading_text span {
            display: block;
            margin: 10px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default RFID_SOLUTIONS;