import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/mainlogo/ivlogowhite.png'
import logo2 from '../../images/mainlogo/IV__logo.png'
import MobileMenu from '../MobileMenu/MobileMenu'
import { getAllProducts } from '../../services/productsService';
import { getAllSolutions } from '../../services/solutionsService';

const Header2 = (props) => {
    const [mobailActive, setMobailState] = useState(false);
    const [products, setProducts] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [isSticky, setSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    
    // Refs for dropdown containers
    const productsRef = useRef(null);
    const solutionsRef = useRef(null);
    const productsDropdownRef = useRef(null);
    const solutionsDropdownRef = useRef(null);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
        setActiveDropdown(null);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [productsData, solutionsData] = await Promise.all([
                getAllProducts(),
                getAllSolutions()
            ]);
            setProducts(productsData);
            setSolutions(solutionsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Hover handlers for menu items
    const handleMouseEnterMenu = (dropdown) => {
        setActiveDropdown(dropdown);
    };

    // Hover handlers for dropdowns
    const handleMouseEnterDropdown = (dropdown) => {
        setActiveDropdown(dropdown);
    };

    const handleMouseLeaveMenu = () => {
        // Don't close immediately - let the dropdown handle it
    };

    const handleMouseLeaveDropdown = () => {
        setActiveDropdown(null);
    };

    // Click handler for dropdown toggle (for mobile/touch)
    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    const closeAllDropdowns = () => {
        setActiveDropdown(null);
    };

    // Handle clicks outside dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container') && 
                !event.target.closest('.dropdown-content')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Group products by category
    const groupProductsByCategory = () => {
        const grouped = {};
        products.forEach(product => {
            const category = product.category || 'Other Products';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(product);
        });
        return grouped;
    };

    // Group solutions by category
    const groupSolutionsByCategory = () => {
        const grouped = {};
        solutions.forEach(solution => {
            const category = solution.category || 'Other Solutions';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(solution);
        });
        return grouped;
    };

    const groupedProducts = groupProductsByCategory();
    const groupedSolutions = groupSolutionsByCategory();

    return (
        <header className="site_header site_header_2" style={{ position: 'relative', margin: 0, padding: 0 }}>
            {/* Main Navigation Row */}
            <div className={`header_bottom ${isSticky ? 'stricked-menu stricky-fixed' : ''}`} 
                 style={{
                     backgroundColor: '#fff', // Changed to white
                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                     padding: '10px 0',
                     position: 'relative',
                     margin: 0,
                     zIndex: 1001
                 }}>
                <div className="container" style={{ padding: '0 15px' }}>
                    <div className="row align-items-center" style={{ margin: 0 }}>
                        {/* Logo */}
                        <div className="col-lg-2 col-md-3 col-6" style={{ padding: 0 }}>
                            <div className="site_logo" style={{ margin: 0 }}>
                                <Link onClick={ClickHandler} className="site_link" to="/" style={{ display: 'inline-block' }}>
                                    <img src={logo2} alt="Site Logo" style={{ height: '70px', width: 'auto' }} />
                                </Link>
                            </div>
                        </div>
                        
                        {/* Main Navigation Menu */}
                        <div className="col-lg-8 col-md-6 d-none d-md-block" style={{ padding: 0 }}>
                            <nav className="main_menu" style={{ position: 'static', margin: 0, padding: 0 }}>
                                <ul style={{
                                    display: 'flex',
                                    listStyle: 'none',
                                    margin: 0,
                                    padding: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '20px',
                                    height: '100%'
                                }}>
                                    <li style={{ margin: 0, padding: 0 }}>
                                        <Link onClick={ClickHandler} to="/" style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            padding: '5px 0',
                                            display: 'block',
                                            transition: 'color 0.3s',
                                            textTransform: 'uppercase',
                                            lineHeight: '1'
                                        }}>
                                            Home
                                        </Link>
                                    </li>
                                    
                                    <li style={{ margin: 0, padding: 0 }}>
                                        <Link onClick={ClickHandler} to="/about" style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            padding: '5px 0',
                                            display: 'block',
                                            transition: 'color 0.3s',
                                            textTransform: 'uppercase',
                                            lineHeight: '1'
                                        }}>
                                            About Us
                                        </Link>
                                    </li>
                                    
                                    {/* Products Dropdown */}
                                    <li 
                                        className="dropdown-container" 
                                        ref={productsRef}
                                        onMouseEnter={() => handleMouseEnterMenu('products')}
                                        onMouseLeave={handleMouseLeaveMenu}
                                        style={{ 
                                            position: 'relative',
                                            margin: 0, 
                                            padding: 0,
                                            height: '100%'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Link 
                                                onClick={ClickHandler}
                                                to="/products"
                                                style={{
                                                    color: activeDropdown === 'products' ? '#007bff' : '#333',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    padding: '5px 0',
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    transition: 'color 0.3s',
                                                    lineHeight: '1',
                                                    height: '100%'
                                                }}
                                            >
                                                Products
                                            </Link>
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDropdownClick('products');
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: activeDropdown === 'products' ? '#007bff' : '#333',
                                                    cursor: 'pointer',
                                                    padding: '5px 0 5px 2px',
                                                    margin: 0,
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <i className={`fas fa-chevron-${activeDropdown === 'products' ? 'up' : 'down'}`} style={{fontSize: '10px'}}></i>
                                            </button>
                                        </div>
                                    </li>
                                    
                                    {/* Solutions Dropdown */}
                                    <li 
                                        className="dropdown-container" 
                                        ref={solutionsRef}
                                        onMouseEnter={() => handleMouseEnterMenu('solutions')}
                                        onMouseLeave={handleMouseLeaveMenu}
                                        style={{ 
                                            position: 'relative',
                                            margin: 0, 
                                            padding: 0,
                                            height: '100%'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Link 
                                                onClick={ClickHandler}
                                                to="/solutions"
                                                style={{
                                                    color: activeDropdown === 'solutions' ? '#007bff' : '#333',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    padding: '5px 0',
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    transition: 'color 0.3s',
                                                    lineHeight: '1',
                                                    height: '100%'
                                                }}
                                            >
                                                Solutions
                                            </Link>
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDropdownClick('solutions');
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: activeDropdown === 'solutions' ? '#007bff' : '#333',
                                                    cursor: 'pointer',
                                                    padding: '5px 0 5px 2px',
                                                    margin: 0,
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <i className={`fas fa-chevron-${activeDropdown === 'solutions' ? 'up' : 'down'}`} style={{fontSize: '10px'}}></i>
                                            </button>
                                        </div>
                                    </li>
                                    
                                    <li style={{ margin: 0, padding: 0 }}>
                                        <Link onClick={ClickHandler} to="/contact" style={{
                                            color: '#333',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            padding: '5px 0',
                                            display: 'block',
                                            transition: 'color 0.3s',
                                            textTransform: 'uppercase',
                                            lineHeight: '1'
                                        }}>
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        
                        {/* Call Now Button & Mobile Menu */}
                        <div className="col-lg-2 col-md-3 col-6" style={{ padding: 0 }}>
                            <div className="d-flex justify-content-end align-items-center" style={{ margin: 0, padding: 0, height: '100%' }}>
                                <Link onClick={ClickHandler} className="btn btn-primary" to="/contact" 
                                      style={{
                                          backgroundColor: '#007bff',
                                          color: '#fff',
                                          border: 'none',
                                          padding: '8px 15px',
                                          borderRadius: '4px',
                                          fontWeight: '600',
                                          textDecoration: 'none',
                                          fontSize: '12px',
                                          transition: 'background-color 0.3s',
                                          whiteSpace: 'nowrap',
                                          lineHeight: '1',
                                          margin: 0
                                      }}
                                      onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                      onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
                                    Call Now
                                </Link>
                                
                                <button className="mobile_menu_btn d-md-none" 
                                        onClick={() => setMobailState(!mobailActive)} 
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '20px',
                                            marginLeft: '10px',
                                            color: '#333',
                                            padding: 0
                                        }}>
                                    <i className="far fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Full-Width Dropdown */}
            {activeDropdown === 'products' && (
                <div 
                    className="dropdown-content"
                    ref={productsDropdownRef}
                    onMouseEnter={() => handleMouseEnterDropdown('products')}
                    onMouseLeave={handleMouseLeaveDropdown}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        width: '100vw',
                        backgroundColor: '#1f1c58',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        padding: '20px 0',
                        borderTop: '3px solid #007bff',
                        margin: 0
                    }}
                >
                    <div className="container">
                        <div className="row" style={{ margin: 0 }}>
                            <div className="col-12" style={{ padding: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{
                                        color: '#fff',
                                        margin: '0 0 15px 0',
                                        padding: '0 0 8px 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                                        fontSize: '18px'
                                    }}>
                                        Our Products
                                    </h4>
                                    <Link 
                                        onClick={ClickHandler}
                                        to="/products"
                                        style={{
                                            color: '#4dabf7',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                        onMouseOver={(e) => e.target.style.color = '#74c0fc'}
                                        onMouseOut={(e) => e.target.style.color = '#4dabf7'}
                                    >
                                        View All Products <i className="fas fa-arrow-right" style={{fontSize: '12px'}}></i>
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Display grouped products by category */}
                            {Object.keys(groupedProducts).map(category => (
                                <div key={category} className="col-lg-3 col-md-4 col-sm-6 mb-3" style={{ padding: '0 10px' }}>
                                    <h5 style={{
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        margin: '0 0 10px 0',
                                        padding: '0 0 5px 0',
                                        borderBottom: '2px solid #4dabf7',
                                        textTransform: 'uppercase',
                                    }}>
                                        {category}
                                    </h5>
                                    <div style={{ padding: 0 }}>
                                        {groupedProducts[category].slice(0, 5).map(product => (
                                            <div key={product.id} style={{ margin: '0 0 8px 0' }}>
                                                <Link 
                                                    onClick={ClickHandler}
                                                    to={`/products/${product.category.replace(/\s+/g, '_')}/${product.slug}`}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 10px',
                                                        color: '#fff',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                        transition: 'all 0.3s',
                                                        // backgroundColor: 'rgba(255,255,255,0.1)',
                                                        borderLeft: '3px solid #4dabf7',
                                                        fontSize: '13px'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.color = '#4dabf7';
                                                        // e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                                        e.target.style.paddingLeft = '12px';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.color = '#fff';
                                                        // e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                                        e.target.style.paddingLeft = '10px';
                                                    }}
                                                >
                                                    <div style={{ fontWeight: '600', margin: 0, fontSize: '13px' }}>
                                                        {product.title}
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                        {groupedProducts[category].length > 5 && (
                                            <Link 
                                                onClick={ClickHandler}
                                                to={`/products/${category.replace(/\s+/g, '_')}`}
                                                style={{
                                                    display: 'block',
                                                    padding: '8px 10px',
                                                    color: '#4dabf7',
                                                    textDecoration: 'none',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    textAlign: 'center'
                                                }}
                                                onMouseOver={(e) => e.target.style.color = '#74c0fc'}
                                                onMouseOut={(e) => e.target.style.color = '#4dabf7'}
                                            >
                                                {/* View All in {category} → */}
                                                View All →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Solutions Full-Width Dropdown */}
            {activeDropdown === 'solutions' && (
                <div 
                    className="dropdown-content"
                    ref={solutionsDropdownRef}
                    onMouseEnter={() => handleMouseEnterDropdown('solutions')}
                    onMouseLeave={handleMouseLeaveDropdown}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        width: '100vw',
                        backgroundColor: '#1f1c58',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        padding: '20px 0',
                        borderTop: '3px solid #007bff',
                        margin: 0
                    }}
                >
                    <div className="container">
                        <div className="row" style={{ margin: 0 }}>
                            <div className="col-12" style={{ padding: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{
                                        color: '#fff',
                                        margin: '0 0 15px 0',
                                        padding: '0 0 8px 0',
                                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                                        fontSize: '18px'
                                    }}>
                                        Our Solutions
                                    </h4>
                                    <Link 
                                        onClick={ClickHandler}
                                        to="/solutions"
                                        style={{
                                            color: '#4dabf7',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                        onMouseOver={(e) => e.target.style.color = '#74c0fc'}
                                        onMouseOut={(e) => e.target.style.color = '#4dabf7'}
                                    >
                                        View All Solutions <i className="fas fa-arrow-right" style={{fontSize: '12px'}}></i>
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Display grouped solutions by category */}
                            {Object.keys(groupedSolutions).map(category => (
                                <div key={category} className="col-lg-3 col-md-4 col-sm-6 mb-3" style={{ padding: '0 10px' }}>
                                    <h5 style={{
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        margin: '0 0 10px 0',
                                        padding: '0 0 5px 0',
                                        borderBottom: '2px solid #4dabf7',
                                        textTransform: 'uppercase',
                                    }}>
                                        {category}
                                    </h5>
                                    <div style={{ padding: 0 }}>
                                        {groupedSolutions[category].slice(0, 5).map(solution => (
                                            <div key={solution.id} style={{ margin: '0 0 8px 0' }}>
                                                <Link 
                                                    onClick={ClickHandler}
                                                    to={`/solutions/${solution.category.replace(/\s+/g, '_')}/${solution.slug}`}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 10px',
                                                        color: '#fff',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                        transition: 'all 0.3s',
                                                        // backgroundColor: 'rgba(255,255,255,0.1)',
                                                        borderLeft: '3px solid #4dabf7',
                                                        fontSize: '13px'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.color = '#4dabf7';
                                                        // e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                                        e.target.style.paddingLeft = '12px';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.color = '#fff';
                                                        // e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                                        e.target.style.paddingLeft = '10px';
                                                    }}
                                                >
                                                    <div style={{ fontWeight: '600', margin: 0, fontSize: '13px' }}>
                                                        {solution.title}
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                        {groupedSolutions[category].length > 5 && (
                                            <Link 
                                                onClick={ClickHandler}
                                                to={`/solutions/${category.replace(/\s+/g, '_')}`}
                                                style={{
                                                    display: 'block',
                                                    padding: '8px 10px',
                                                    color: '#4dabf7',
                                                    textDecoration: 'none',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    textAlign: 'center'
                                                }}
                                                onMouseOver={(e) => e.target.style.color = '#74c0fc'}
                                                onMouseOut={(e) => e.target.style.color = '#4dabf7'}
                                            >
                                                {/* View All in {category} → */}
                                                View All →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            <div className="mobail-wrap">
                <div className={`mobail-menu ${mobailActive ? "active" : ""}`}>
                    <div className="xb-header-menu-scroll">
                        <div className="xb-menu-close xb-hide-xl xb-close" onClick={() => setMobailState(!mobailActive)}></div>
                        <nav className="xb-header-nav">
                            <MobileMenu />
                        </nav>
                    </div>
                </div>
                <div className="xb-header-menu-backdrop" onClick={() => setMobailState(false)}></div>
            </div>

            {/* Overlay for dropdown background */}
            {activeDropdown && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        zIndex: 999,
                        margin: 0,
                        padding: 0
                    }}
                    onClick={closeAllDropdowns}
                />
            )}
        </header>
    )
}

export default Header2;