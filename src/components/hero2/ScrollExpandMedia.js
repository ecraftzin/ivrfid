import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './ScrollExpandMedia.css';

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const sectionRef = useRef(null);
  const lastTouchTime = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Throttled update function for smooth performance
  const updateProgress = useCallback((newProgress) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(() => {
      setScrollProgress(newProgress);
      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        updateProgress(newProgress);
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
      lastTouchTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      // Throttle touch events to 16ms (~60fps) for smooth performance
      const now = Date.now();
      if (now - lastTouchTime.current < 16) return;
      lastTouchTime.current = now;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // Adjusted threshold for better mobile experience
      const swipeThreshold = 30;

      if (mediaFullyExpanded && deltaY < -swipeThreshold && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Responsive scroll factors based on device
        let scrollFactor;
        if (isSmallMobile) {
          scrollFactor = deltaY < 0 ? 0.0025 : 0.0015; // Very sensitive for small screens
        } else if (isMobile) {
          scrollFactor = deltaY < 0 ? 0.0035 : 0.0025; // Mobile
        } else if (isTablet) {
          scrollFactor = deltaY < 0 ? 0.005 : 0.0035; // Tablet
        } else {
          scrollFactor = deltaY < 0 ? 0.006 : 0.004; // Desktop
        }
        
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        updateProgress(newProgress);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    // Add passive listeners for better performance
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isMobile, isSmallMobile, isTablet, updateProgress]);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsSmallMobile(width < 400);
      setIsTablet(width >= 768 && width < 1024);
      setViewportHeight(height);
      setViewportWidth(width);
    };
    
    checkDevice();

    const handleResize = () => {
      checkDevice();
    };

    // Use debounced resize for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', checkDevice);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Calculate responsive media dimensions
  const getMediaDimensions = () => {
    const vw = viewportWidth;
    const vh = viewportHeight;
    const isLandscape = vw > vh;

    if (isSmallMobile) {
      const startWidth = Math.min(260, vw * 0.8);
      const endWidth = Math.min(vw - 20, vw * 0.95);
      const startHeight = isLandscape ? 180 : 280;
      const endHeight = Math.min(vh * (isLandscape ? 0.6 : 0.7), 500);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    } else if (isMobile) {
      const startWidth = Math.min(280, vw * 0.75);
      const endWidth = Math.min(vw - 30, vw * 0.92);
      const startHeight = isLandscape ? 200 : 320;
      const endHeight = Math.min(vh * (isLandscape ? 0.65 : 0.75), 550);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    } else if (isTablet) {
      const startWidth = Math.min(350, vw * 0.6);
      const endWidth = Math.min(vw - 40, vw * 0.88);
      const startHeight = 300;
      const endHeight = Math.min(vh * 0.8, 600);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    } else {
      const startWidth = Math.min(400, vw * 0.4);
      const endWidth = Math.min(vw - 100, vw * 0.85);
      const startHeight = 400;
      const endHeight = Math.min(vh * 0.85, 700);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    }
  };

  // Calculate text translate with responsive limits
  const getTextTranslate = () => {
    if (isSmallMobile) {
      return scrollProgress * 20;
    } else if (isMobile) {
      return scrollProgress * 40;
    } else if (isTablet) {
      return scrollProgress * 80;
    }
    return scrollProgress * 120;
  };

  const { width: mediaWidth, height: mediaHeight } = getMediaDimensions();
  const textTranslateX = getTextTranslate();

  // Handle title splitting responsively
  const displayTitle = title || '';
  const shouldSplitTitle = !isMobile && viewportWidth >= 768;
  const firstWord = shouldSplitTitle ? (title ? title.split(' ')[0] : '') : '';
  const restOfTitle = shouldSplitTitle ? (title ? title.split(' ').slice(1).join(' ') : '') : '';

  // Responsive hint text
  const getHintText = () => {
    if (isMobile) return 'Swipe up to explore';
    if (isTablet) return 'Scroll to explore';
    return scrollToExpand || 'Scroll to explore';
  };

  const hintText = getHintText();

  // Get container classes for responsive styling
  const containerClasses = [
    'scroll-expand-container',
    isMobile ? 'is-mobile' : '',
    isSmallMobile ? 'is-small-mobile' : '',
    isTablet ? 'is-tablet' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={sectionRef}
      className={containerClasses}
      style={{ '--viewport-height': `${viewportHeight}px` }}
    >
      <section className="scroll-expand-section">
        <div className="scroll-expand-wrapper">
          <motion.div
            className="scroll-expand-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img src={bgImageSrc} alt="Background" className="scroll-expand-bg-img" />
            <div className="scroll-expand-bg-overlay" />
          </motion.div>
          <div className="scroll-expand-content">
            <div className="scroll-expand-hero-area">
              <div
                className="scroll-expand-media-container"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                }}
              >
                {mediaType === 'video' ? (
                  <div className="scroll-expand-video-wrapper">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="scroll-expand-video"
                    />
                    <motion.div
                      className="scroll-expand-media-overlay"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="scroll-expand-image-wrapper">
                    <img src={mediaSrc} alt={title || 'Media'} className="scroll-expand-image" />
                    <motion.div
                      className="scroll-expand-media-overlay"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
                <div className="scroll-expand-meta">
                  {date && (
                    <motion.p
                      className="scroll-expand-date"
                      style={!isMobile ? { transform: `translateX(-${textTranslateX}vw)` } : {}}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isMobile ? (1 - scrollProgress * 0.8) : 1 }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {hintText && (
                    <motion.p
                      className="scroll-expand-hint"
                      style={!isMobile ? { transform: `translateX(${textTranslateX}vw)` } : {}}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: scrollProgress < 0.3 ? 1 : 0 }}
                    >
                      {hintText}
                    </motion.p>
                  )}
                </div>
              </div>
              <div className={`scroll-expand-title-area ${textBlend ? 'text-blend' : ''} ${isMobile ? 'mobile-title' : ''}`}>
                {!shouldSplitTitle ? (
                  // Single title for mobile/tablet
                  <motion.h2
                    className="scroll-expand-title-mobile"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 - scrollProgress * 0.8 }}
                  >
                    {displayTitle}
                  </motion.h2>
                ) : (
                  // Split title for desktop
                  <>
                    <motion.h2
                      className="scroll-expand-title-first"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {firstWord}
                    </motion.h2>
                    <motion.h2
                      className="scroll-expand-title-rest"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {restOfTitle}
                    </motion.h2>
                  </>
                )}
              </div>

              {/* Swipe indicator for mobile */}
              {isMobile && scrollProgress < 0.2 && (
                <motion.div
                  className="scroll-expand-swipe-indicator"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="swipe-arrow">
                    <i className="fas fa-chevron-up"></i>
                  </div>
                  <span>Swipe Up</span>
                </motion.div>
              )}
            </div>
            <motion.section
              className="scroll-expand-children"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;