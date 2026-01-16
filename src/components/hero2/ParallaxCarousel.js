import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ParallaxCarousel.css';

// Individual Slide Component with sticky overlap behavior
const StickySlide = ({ slide, index, totalSlides, scrollProgress, isMobile }) => {
  // Each slide transition happens during a portion of total scroll
  // For 2 slides: slide 1 comes in during progress 0 to 0.5, slide 2 during 0.5 to 1
  const slideDuration = 1 / totalSlides;

  // When does THIS slide start coming in (overlapping the previous)?
  // Slide 0: already visible at start
  // Slide 1: starts coming in at progress 0 (takes 0-0.5 to fully cover)
  // Slide 2: starts coming in at progress 0.5 (takes 0.5-1 to fully cover)
  const transitionStart = (index - 1) * slideDuration;

  // Calculate transform values
  let translateY = 0;
  let slideOpacity = 1;
  let contentOpacity = 1;
  let slideScale = 1;

  if (index === 0) {
    // First slide: stays in place, scales/fades as second slide covers it
    const coverProgress = Math.min(1, scrollProgress / slideDuration);
    slideScale = 1 - coverProgress * 0.05;
    contentOpacity = 1 - coverProgress * 0.5;
  } else {
    // Other slides: translate from 100% (below) to 0% (covering previous)
    // Progress of this slide's transition (0 = just starting, 1 = fully covering)
    const transitionProgress = Math.max(0, Math.min(1,
      (scrollProgress - transitionStart) / slideDuration
    ));

    // Translate: starts at 100% (below viewport), ends at 0% (in position)
    translateY = (1 - transitionProgress) * 100;

    // Opacity: fade in as it comes up
    slideOpacity = transitionProgress;

    // If there's a next slide, scale/fade this one as the next covers it
    if (index < totalSlides - 1) {
      const nextTransitionStart = index * slideDuration;
      const nextCoverProgress = Math.max(0, Math.min(1,
        (scrollProgress - nextTransitionStart) / slideDuration
      ));
      slideScale = 1 - nextCoverProgress * 0.05;
      contentOpacity = 1 - nextCoverProgress * 0.5;
    }
  }

  // Parallax effect - based on how much we've scrolled while this slide is visible
  const visibleStart = index === 0 ? 0 : (index - 1) * slideDuration;
  const visibleProgress = Math.max(0, Math.min(1, (scrollProgress - visibleStart) / slideDuration));
  const parallaxBg = isMobile ? visibleProgress * 40 : visibleProgress * 80;
  const parallaxContent = isMobile ? visibleProgress * -20 : visibleProgress * -40;

  return (
    <div
      className="sticky-slide"
      style={{
        zIndex: index + 1, // Higher index = higher z-index (slides stack on top)
        transform: `translateY(${translateY}%) scale(${slideScale})`,
        opacity: slideOpacity,
        pointerEvents: translateY > 50 ? 'none' : 'auto',
      }}
    >
      {/* Background with parallax */}
      <div
        className="carousel-bg"
        style={{ transform: `translateY(${parallaxBg}px)` }}
      >
        <div
          className="carousel-bg-image"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div
          className="carousel-overlay"
          style={{ background: slide.overlayColor || 'rgba(0,0,0,0.5)' }}
        />
      </div>

      {/* Content with parallax */}
      <div
        className="carousel-content"
        style={{
          transform: `translateY(${parallaxContent}px)`,
          opacity: contentOpacity,
        }}
      >
        <div className="container">
          <div className="carousel-content-inner">
            {slide.subtitle && (
              <span className="carousel-subtitle">{slide.subtitle}</span>
            )}
            <h1 className="carousel-title">{slide.title}</h1>
            {slide.description && (
              <p className="carousel-description">{slide.description}</p>
            )}
            {slide.buttonText && (
              <div>
                <a href={slide.buttonLink || '#'} className="carousel-btn">
                  <span>{slide.buttonText}</span>
                  <i className="ms-2 fas fa-arrow-right"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ParallaxCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for sticky overlap effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Scrollable distance is container height minus one viewport
        const scrollableHeight = containerHeight - viewportHeight;

        // How much we've scrolled into the container
        const scrolled = Math.max(0, -rect.top);

        // Progress from 0 to 1
        const progress = scrollableHeight > 0
          ? Math.min(1, Math.max(0, scrolled / scrollableHeight))
          : 0;

        setScrollProgress(progress);

        // Determine current slide based on progress
        const slideIndex = Math.min(
          slides.length - 1,
          Math.floor(progress * slides.length)
        );
        setCurrentSlide(slideIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  // Navigate to slide with smooth scroll
  const goToSlide = useCallback((index) => {
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = containerHeight - viewportHeight;

      // Calculate target scroll position for this slide
      const targetProgress = index / slides.length;
      const targetScroll = containerTop + targetProgress * scrollableHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [slides.length]);

  const handleNext = () => {
    const nextIndex = Math.min(currentSlide + 1, slides.length - 1);
    goToSlide(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentSlide - 1, 0);
    goToSlide(prevIndex);
  };

  // Container height: enough scroll space for all slides
  const containerHeight = `${slides.length * 100}vh`;

  return (
    <div
      className="parallax-carousel sticky-carousel"
      ref={containerRef}
      style={{ height: containerHeight }}
    >
      {/* Sticky viewport - stays fixed while scrolling */}
      <div className="sticky-viewport">
        {/* Slides stack - all slides layered on top of each other */}
        <div className="slides-stack">
          {slides.map((slide, index) => (
            <StickySlide
              key={index}
              slide={slide}
              index={index}
              totalSlides={slides.length}
              scrollProgress={scrollProgress}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <button
          className="carousel-arrow carousel-arrow-prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="carousel-arrow carousel-arrow-next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button> */}

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="carousel-progress">
          <div
            className="carousel-progress-bar"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        {/* Scroll Indicator - only show at beginning */}
        {/* {scrollProgress < 0.15 && (
          <div className="carousel-scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ParallaxCarousel;

