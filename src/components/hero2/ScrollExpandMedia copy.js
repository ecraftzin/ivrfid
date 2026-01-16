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
  const [isMobileState, setIsMobileState] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
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
        // Optimized scroll factors for mobile - less sensitive for natural feel
        // Smaller values = less sensitive, requires more swipe distance
        const scrollFactor = isMobileState
          ? (deltaY < 0 ? 0.004 : 0.003) // Mobile: slower, more controlled
          : (deltaY < 0 ? 0.006 : 0.004); // Desktop touch: slightly faster
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        updateProgress(newProgress);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

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
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isMobileState, updateProgress]);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobileState(width < 768);
      setIsSmallMobile(width < 400);
      setViewportHeight(window.innerHeight);
    };
    checkDevice();

    // Handle viewport changes (address bar show/hide on mobile)
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);
    // Also listen for orientation changes
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Calculate responsive media dimensions based on screen size
  const getMediaDimensions = () => {
    const vw = window.innerWidth;

    if (isSmallMobile) {
      // Extra small screens (320px-400px)
      const startWidth = Math.min(260, vw * 0.8);
      const endWidth = Math.min(vw - 20, vw * 0.95);
      const startHeight = 320;
      const endHeight = Math.min(viewportHeight * 0.7, 500);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    } else if (isMobileState) {
      // Mobile screens (400px-768px)
      const startWidth = Math.min(280, vw * 0.75);
      const endWidth = Math.min(vw - 30, vw * 0.92);
      const startHeight = 360;
      const endHeight = Math.min(viewportHeight * 0.75, 550);
      return {
        width: startWidth + scrollProgress * (endWidth - startWidth),
        height: startHeight + scrollProgress * (endHeight - startHeight),
      };
    } else {
      // Desktop screens (768px+)
      return {
        width: 300 + scrollProgress * 1250,
        height: 400 + scrollProgress * 400,
      };
    }
  };

  // Calculate text translate with mobile-safe limits
  const getTextTranslate = () => {
    if (isSmallMobile) {
      return scrollProgress * 30; // Minimal translate for tiny screens
    } else if (isMobileState) {
      return scrollProgress * 50; // Smaller translate for mobile
    }
    return scrollProgress * 120; // Full translate for desktop
  };

  const { width: mediaWidth, height: mediaHeight } = getMediaDimensions();
  const textTranslateX = getTextTranslate();

  // On mobile, show title as single line; on desktop, split into two lines
  const displayTitle = title || '';
  const firstWord = isMobileState ? displayTitle : (title ? title.split(' ')[0] : '');
  const restOfTitle = isMobileState ? '' : (title ? title.split(' ').slice(1).join(' ') : '');

  // Mobile-specific hint text
  const mobileHintText = isMobileState ? 'Swipe up to explore' : scrollToExpand;

  return (
    <div
      ref={sectionRef}
      className={`scroll-expand-container ${isMobileState ? 'is-mobile' : ''} ${isSmallMobile ? 'is-small-mobile' : ''}`}
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
          <div className="container scroll-expand-content">
            <div className="scroll-expand-hero-area">
              <div
                className="scroll-expand-media-container"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: isMobileState ? '95vw' : '90vw',
                  maxHeight: isMobileState ? '70vh' : '85vh'
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
                      style={isMobileState ? {} : { transform: `translateX(-${textTranslateX}vw)` }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isMobileState ? (1 - scrollProgress * 0.8) : 1 }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {mobileHintText && (
                    <motion.p
                      className="scroll-expand-hint"
                      style={isMobileState ? {} : { transform: `translateX(${textTranslateX}vw)` }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: scrollProgress < 0.3 ? 1 : 0 }}
                    >
                      {mobileHintText}
                    </motion.p>
                  )}
                </div>
              </div>
              <div className={`scroll-expand-title-area ${textBlend ? 'text-blend' : ''} ${isMobileState ? 'mobile-title' : ''}`}>
                {isMobileState ? (
                  // Mobile: Single centered title with opacity animation
                  <motion.h2
                    className="scroll-expand-title-mobile"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 - scrollProgress * 0.8 }}
                  >
                    {displayTitle}
                  </motion.h2>
                ) : (
                  // Desktop: Split title with translate animation
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

              {/* Mobile swipe indicator */}
              {isMobileState && scrollProgress < 0.2 && (
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

