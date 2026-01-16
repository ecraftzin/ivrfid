import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxBanner.css';

const ParallaxBanner = ({ banners }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="parallax-banner-container" ref={containerRef}>
      {banners.map((banner, index) => (
        <BannerSection
          key={index}
          banner={banner}
          index={index}
          isMobile={isMobile}
          isLast={index === banners.length - 1}
        />
      ))}
    </div>
  );
};

const BannerSection = ({ banner, index, isMobile, isLast }) => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax speeds - background moves slower than scroll
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['-10%', '10%'] : ['-20%', '20%']
  );

  // Content moves faster for depth effect
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['5%', '-5%'] : ['10%', '-10%']
  );

  // Opacity for smooth transitions
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <section 
      className={`parallax-section ${index % 2 === 0 ? 'even' : 'odd'}`}
      ref={sectionRef}
    >
      {/* Background Layer with Parallax */}
      <motion.div 
        className="parallax-background"
        style={{ y: backgroundY }}
      >
        <div 
          className="parallax-bg-image"
          style={{ backgroundImage: `url(${banner.image})` }}
        />
        <div className="parallax-overlay" style={{ background: banner.overlayColor || 'rgba(0,0,0,0.4)' }} />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        className="parallax-content"
        style={{ y: contentY, opacity }}
      >
        <div className="container">
          <div className="parallax-content-inner">
            {banner.subtitle && (
              <motion.span 
                className="parallax-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {banner.subtitle}
              </motion.span>
            )}
            <motion.h2 
              className="parallax-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {banner.title}
            </motion.h2>
            {banner.description && (
              <motion.p 
                className="parallax-description"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {banner.description}
              </motion.p>
            )}
            {banner.buttonText && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <a href={banner.buttonLink || '#'} className="parallax-btn">
                  <span>{banner.buttonText}</span>
                  <i className="ms-2 fas fa-arrow-right"></i>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator on first banner */}
      {index === 0 && (
        <div className="parallax-scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      )}

      {/* Transition overlay between banners */}
      {!isLast && <div className="parallax-transition-fade" />}
    </section>
  );
};

export default ParallaxBanner;

