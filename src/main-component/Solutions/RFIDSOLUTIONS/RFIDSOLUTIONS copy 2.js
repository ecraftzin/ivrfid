import React from 'react';
import Bg from '../../../images/shapes/bg_pattern_2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWarehouse, 
  faBoxes, 
  faBook, 
  faShoppingCart, 
  faGem, 
  faTshirt, 
  faUsers, 
  faSuitcase, 
  faCogs 
} from '@fortawesome/free-solid-svg-icons';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const solutionsData = [
    {
        id: '01',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Warehouse Management System',
        Des: "Streamline your warehouse operations with real-time inventory tracking and automated processes for maximum efficiency.",
        icon: faWarehouse,
        color: '#3498db'
    },
    {
        id: '02',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Asset Management & Tracking Solutions',
        Des: "Track and manage valuable assets in real-time with precision accuracy and reduced manual intervention.",
        icon: faBoxes,
        color: '#2ecc71'
    },
    {
        id: '03',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Library Management System',
        Des: "Transform library operations with automated check-in/check-out and real-time book tracking capabilities.",
        icon: faBook,
        color: '#9b59b6'
    },
    {
        id: '04',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Retail Management System',
        Des: "Enhance customer experience with smart inventory management and anti-theft solutions.",
        icon: faShoppingCart,
        color: '#e74c3c'
    },
    {
        id: '05',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Jewelry Management System',
        Des: "Secure and track high-value jewelry items with precision inventory control and anti-theft protection.",
        icon: faGem,
        color: '#f39c12'
    },
    {
        id: '06',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Laundry Management System',
        Des: "Automate laundry tracking and management for improved efficiency and customer satisfaction.",
        icon: faTshirt,
        color: '#1abc9c'
    },
    {
        id: '07',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Attendance Management System',
        Des: "Streamline employee attendance tracking with automated, contactless identification systems.",
        icon: faUsers,
        color: '#34495e'
    },
    {
        id: '08',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Baggage Tracking System',
        Des: "Ensure secure and efficient baggage handling with real-time tracking throughout the journey.",
        icon: faSuitcase,
        color: '#8e44ad'
    },
    {
        id: '09',
        subTitle:'RFID SOLUTIONS',
        Title:'Customized RFID Solutions',
        Des: "Tailored RFID solutions designed to meet your specific business requirements and challenges.",
        icon: faCogs,
        color: '#7f8c8d'
    },
];

const RFID_SOLUTIONS = () => {
    return (
        <section className="solutions_section section_space" style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${Bg})`,
                opacity: 0.03,
                zIndex: 0
            }}></div>

            <div className="container position-relative z-10">
                {/* Header Section */}
                <div className="heading_block text-center mb-5">
                    <div className="heading_focus_text has_underline d-inline-flex mb-3" style={{
                        backgroundColor: '#5227FF',
                        color: 'white',
                        padding: '8px 25px',
                        borderRadius: '30px',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}>
                        OUR SOLUTIONS
                    </div>
                    <h2 className="heading_text mb-4" style={{
                        color: '#1e293b',
                        fontSize: '2.5rem',
                        fontWeight: '700'
                    }}>
                            RFID
                        Solutions & Services
                    </h2>
                    <p className="mb-4" style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#475569'
                    }}>
                        An RFID (Radio Frequency Identification) based management system is a technology solution that uses RFID tags to track and manage assets and inventory items in real-time. RFID tags are small electronic devices with unique identifiers that can communicate wirelessly with RFID readers or scanners.
                    </p>
                    <p className="mb-5" style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#475569',
                        fontWeight: '500'
                    }}>
                        RFID solutions offer significant benefits in terms of efficiency, accuracy, and visibility throughout the supply chain. They empower organizations to make data-driven decisions, reduce operational costs, and enhance overall performance.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="solutions-grid-wrapper">
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 991: 3}}>
                        <Masonry columnsCount={3} gutter="30px">
                            {solutionsData.map((solution, index) => (
                                <div 
                                    className="solution-card" 
                                    key={solution.id}
                                    style={{
                                        background: 'white',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                                        transition: 'all 0.4s ease',
                                        border: '1px solid #e2e8f0',
                                        height: '100%',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Solution Number */}
                                    <div className="solution-number" style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#f1f5f9',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#64748b'
                                    }}>
                                        0{solution.id}
                                    </div>

                                    {/* Icon */}
                                    <div className="solution-icon mb-4" style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: `${solution.color}15`,
                                        borderRadius: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '25px'
                                    }}>
                                        <FontAwesomeIcon 
                                            icon={solution.icon} 
                                            style={{
                                                fontSize: '30px',
                                                color: solution.color
                                            }}
                                        />
                                    </div>

                                    {/* Title Section */}
                                    <div className="solution-title mb-3">
                                        <span className="solution-category" style={{
                                            color: solution.color,
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            marginBottom: '10px',
                                            display: 'block'
                                        }}>
                                            {solution.subTitle}
                                        </span>
                                        <h3 className="solution-name" style={{
                                            color: '#1e293b',
                                            fontSize: '1.4rem',
                                            fontWeight: '700',
                                            lineHeight: '1.4',
                                            marginBottom: '15px'
                                        }}>
                                            {solution.Title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="solution-description mb-4" style={{
                                        color: '#64748b',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        marginBottom: '20px'
                                    }}>
                                        {solution.Des}
                                    </p>

                                    {/* Read More Button */}
                                    <button className="solution-button" style={{
                                        backgroundColor: 'transparent',
                                        color: solution.color,
                                        border: `2px solid ${solution.color}`,
                                        padding: '10px 25px',
                                        borderRadius: '25px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        Learn More
                                        <span style={{
                                            fontSize: '0.8rem',
                                            transition: 'transform 0.3s ease'
                                        }}>→</span>
                                    </button>

                                    {/* Hover Effect Background */}
                                    <div className="hover-bg" style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        background: `linear-gradient(135deg, ${solution.color}15, transparent)`,
                                        opacity: '0',
                                        transition: 'opacity 0.3s ease',
                                        zIndex: '-1'
                                    }}></div>
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>

            <style jsx>{`
                .solution-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }
                
                .solution-card:hover .hover-bg {
                    opacity: 1;
                }
                
                .solution-card:hover .solution-button {
                    background-color: #5227FF;
                    color: white;
                    border-color: #5227FF;
                }
                
                .solution-card:hover .solution-button span {
                    transform: translateX(5px);
                }
                
                .solutions-grid-wrapper {
                    margin-bottom: 40px;
                }
                
                @media (max-width: 991px) {
                    .heading_text {
                        font-size: 2rem !important;
                    }
                    
                    .solution-card {
                        padding: 25px !important;
                    }
                    
                    .solution-name {
                        font-size: 1.2rem !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .heading_text {
                        font-size: 1.8rem !important;
                    }
                    
                    .solution-card {
                        margin-bottom: 20px;
                    }
                }
                
                @media (max-width: 576px) {
                    .heading_text {
                        font-size: 1.6rem !important;
                    }
                    
                    .solution-card {
                        padding: 20px !important;
                    }
                    
                    .solution-icon {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    
                    .solution-name {
                        font-size: 1.1rem !important;
                    }
                }
            `}</style>
        </section>
    );
}

export default RFID_SOLUTIONS;