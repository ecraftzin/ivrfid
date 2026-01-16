import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bg from '../../../images/shapes/bg_pattern_3.svg'
import Bg2 from '../../../images/shapes/shape_space_6.svg'
import icon1 from '../../../images/shapes/shape_space_2.svg'
import iconfooter1 from '../../../images/icons/icon_mail.svg'
import iconfooter2 from '../../../images/icons/icon_calling.svg'
import iconfooter3 from '../../../images/icons/icon_map_mark.svg'
import mainlogo from '../../../images/mainlogo/ivlogowhite.png'
import { getProductCategories, getSolutionCategories } from '../../../services/categoriesService';

const ClickHandler = () => {
  window.scrollTo(10, 0);
}

const Footer = (props) => {
  const [productCategories, setProductCategories] = useState([]);
  const [solutionCategories, setSolutionCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const [products, solutions] = await Promise.all([
        getProductCategories(),
        getSolutionCategories()
      ]);
      setProductCategories(products);
      setSolutionCategories(solutions);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  return (
    <footer className="site_footer footer_layout_2" style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', padding: '40px 0 0' }}>
      <div className="container">
        <div className="footer_main_content">
          <div className="row g-4"> {/* Reduced gutter spacing */}
            
            {/* Logo and Social Media */}
            <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                <Link onClick={ClickHandler} to="/" className="footer_logo d-inline-block">
                  <img
                    src={mainlogo}
                    alt="IVRFID Logo"
                    style={{
                      width: window.innerWidth <= 768 ? '180px' : '180px',
                      height: 'auto'
                    }}
                  />
                </Link>
              </div>

              <div className="iconbox_content">
                <p className="mb-0 small">
                  <i className="fas fa-envelope me-2"></i>
                  sales@iv-rfid.com
                </p>
                <p className="mb-0 small">
                  <i className="fas fa-phone me-2"></i>
                  +971 42 696 279
                </p>
                <p className="mb-0 small">
                  <i className="fas fa-mobile-alt me-2"></i>
                  +971 58 285 2600
                </p>
                <p className="mb-0 small">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  UAE | KSA | AFRICA | INDIA
                </p>
              </div>

              <div className="footer_widget mt-3"> {/* Reduced margin */}
                <ul className="social_icons_block unordered_list d-flex flex-wrap gap-2 m-0 p-0">
                  <li className="list-unstyled">
                    <Link onClick={ClickHandler} to="/" className="d-flex align-items-center justify-content-center" 
                      style={{ width: '36px', height: '36px', backgroundColor: '#fff', borderRadius: '50%' }}>
                      <i className="fa-brands fa-facebook-f text-dark"></i>
                    </Link>
                  </li>
                  <li className="list-unstyled">
                    <Link onClick={ClickHandler} to="/" className="d-flex align-items-center justify-content-center"
                      style={{ width: '36px', height: '36px', backgroundColor: '#fff', borderRadius: '50%' }}>
                      <i className="fa-brands fa-twitter text-dark"></i>
                    </Link>
                  </li>
                  <li className="list-unstyled">
                    <Link onClick={ClickHandler} to="/" className="d-flex align-items-center justify-content-center"
                      style={{ width: '36px', height: '36px', backgroundColor: '#fff', borderRadius: '50%' }}>
                      <i className="fa-brands fa-linkedin-in text-dark"></i>
                    </Link>
                  </li>
                  <li className="list-unstyled">
                    <Link onClick={ClickHandler} to="/" className="d-flex align-items-center justify-content-center"
                      style={{ width: '36px', height: '36px', backgroundColor: '#fff', borderRadius: '50%' }}>
                      <i className="fa-brands fa-youtube text-dark"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>


            {/* Company */}
            {/* <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                <h3 className="footer_info_title mb-3">Company</h3>
                <ul className="icon_list unordered_list_block m-0 p-0">
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/" className="text-decoration-none">
                      <span className="icon_list_text">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/about" className="text-decoration-none">
                      <span className="icon_list_text">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/products" className="text-decoration-none">
                      <span className="icon_list_text">
                        Products
                      </span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/solutions" className="text-decoration-none">
                      <span className="icon_list_text">
                        Solutions
                      </span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/blog" className="text-decoration-none">
                      <span className="icon_list_text">
                        Blog
                      </span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link onClick={ClickHandler} to="/contact" className="text-decoration-none">
                      <span className="icon_list_text">
                        Contact Us
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}

            {/* Products */}
            <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                <h3 className="footer_info_title mb-3">Products</h3>
                <ul className="icon_list unordered_list_block m-0 p-0">
                  {productCategories.map((category) => (
                    <li key={category.id} className="mb-1">
                      <Link onClick={ClickHandler} to={`/products/${category.slug}`} className="text-decoration-none">
                        <span className="icon_list_text">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expertise */}
            <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                <h3 className="footer_info_title mb-3">Solutions</h3>
                <ul className="icon_list unordered_list_block m-0 p-0">
                  {solutionCategories.map((category) => (
                    <li key={category.id} className="mb-1">
                      <Link onClick={ClickHandler} to={`/solutions/${category.slug}`} className="text-decoration-none">
                        <span className="icon_list_text">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                <h3 className="footer_info_title mb-3">Location</h3>
                <div className="map_container" style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
                  <iframe 
                    title='map' 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5513478611123!2d55.39424531500009!3d25.291504215585488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d331896f22f%3A0xc8c888b309cd2161!2sIV%20RFID%20Solutions%20LLC!5e0!3m2!1sen!2sus!4v1704495678901!5m2!1sen!2sus"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      filter: "grayscale(20%) contrast(1.1)"
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {/* <div className="col-lg-3 col-md-6">
              <div className="footer_widget">
                  <h3 className="footer_info_title mb-3">Contact Us</h3>
                <div className="diract_contact_links text-white d-flex flex-column gap-2">
                  <div className="iconbox_block layout_icon_left d-flex align-items-start">
                    <div className="iconbox_icon me-2 flex-shrink-0">
                      <img src={iconfooter1} alt="Mail" width="20" />
                    </div>
                    <div className="iconbox_content align-self-center ">
                      <p className="mb-0 small">sales@iv-rfid.com</p>
                    </div>
                  </div>
                  
                  <div className="iconbox_block layout_icon_left d-flex align-items-start">
                    <div className="iconbox_icon me-2 flex-shrink-0">
                      <img src={iconfooter2} alt="Phone" width="20" />
                    </div>
                    <div className="iconbox_content">
                      <p className="mb-0 small">+971 42 696 279</p>
                      <p className="mb-0 small">+971 58 285 2600</p>
                    </div>
                  </div>
                  
                  <div className="iconbox_block layout_icon_left d-flex align-items-start">
                    <div className="iconbox_icon me-2 flex-shrink-0">
                      <img src={iconfooter3} alt="Location" width="20" />
                    </div>
                    <div className="iconbox_content">
                      <p className="mb-0 small">
                        Office# 607,<br/>
                        Al Saoud building,<br/>
                        AI Qusais 4,<br/>
                        Dubai, UAE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer_bottom mt-4" style={{ backgroundImage: `url(${Bg2})`, padding: '15px 0' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-md-between gap-2">
            <p className="copyright_text m-0 small">
              Copyright © 2025 IVRFID, All rights reserved.
            </p>
            <ul className="icon_list unordered_list d-flex flex-wrap gap-3 m-0 p-0">
              <li className="list-unstyled">
                <Link onClick={ClickHandler} to="/contact" className="text-decoration-none small">
                  Terms of Use
                </Link>
              </li>
              <li className="list-unstyled">
                <Link onClick={ClickHandler} to="/contact" className="text-decoration-none small">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;