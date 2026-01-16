import React from 'react';
import ScrollExpandMedia from './ScrollExpandMedia';
import bgImage from '../../images/home/home1.png';

const Hero2 = () => {
    return (
        <ScrollExpandMedia
            mediaType="image"
            mediaSrc={bgImage}
            bgImageSrc={bgImage}
            title="IV RFID SOLUTIONS LLC"
            date="Smart Access Control"
            scrollToExpand="Scroll to Explore"
            textBlend={false}
        >
            <div className="hero-content-expanded">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h2 className="expanded-heading">
                                Smart Access Control for Enhanced Security
                            </h2>
                            <p className="expanded-description">
                                Take control of your security with our advanced RFID Electronic
                                locking systems and access control solutions. Manage, monitor,
                                and restrict entry with real-time precision, ensuring only
                                authorized access to your premises.
                            </p>
                            <div className="expanded-btn-container">
                                <a href="/about" className="btn expanded-btn">
                                    <span>About Us</span>
                                    <i className="ms-2 fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollExpandMedia>
    );
};

export default Hero2;