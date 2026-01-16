import React, { useEffect, useState, useRef } from 'react';
import './AutoBanner.css';
import bgImage1 from '../../images/home/04.jpg';
import bgImage2 from '../../images/home/banner2.jpg';

const slides = [
  {
    image: bgImage1,
    subtitle: 'IV RFID SOLUTIONS LLC',
    title: 'Next-Gen RFID Security for Smarter Access',
    description:
      'Enable secure, contactless entry with intelligent RFID systems. Monitor, manage, and authorize access instantly-fast, precise, and fully automated.',
    buttonText: 'View Products',
    buttonLink: '/products',
  },
  {
    image: bgImage2,
    subtitle: 'Smart RFID',
    title: 'Seamless RFID Solutions for smarter operations',
    description:
      'Track, monitor and optimize your resources in real time with precision and ease',
    buttonText: 'Explore Solutions',
    buttonLink: '/solutions',
  },
];

const AutoBanner = ({ interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const next = () => setIndex((i) => (i + 1) % slides.length);
    timeoutRef.current = setInterval(next, interval);
    return () => clearInterval(timeoutRef.current);
  }, [interval]);

  const goTo = (i) => {
    setIndex(i);
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => setIndex((s) => (s + 1) % slides.length), interval);
  };

  return (
    <section className="auto-banner">
      <div className="auto-banner-inner">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`auto-slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== index}
          >
            <div className="auto-overlay" />
            <div className="auto-content container">
              <span className="auto-subtitle">{s.subtitle}</span>
              <h1 className="auto-title">{s.title}</h1>
              <p className="auto-desc">{s.description}</p>
              {s.buttonText && (
                <a href={s.buttonLink} className="auto-btn">
                  {s.buttonText}
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="auto-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`auto-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="auto-progress">
          <div
            className="auto-progress-bar"
            style={{ width: `${((index + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default AutoBanner;
