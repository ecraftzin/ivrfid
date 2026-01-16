import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FancyCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const move = (e) => {
      // Center the dot on cursor (8px / 2 = 4px offset)
      gsap.to(dot.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      });

      // Center the ring on cursor (40px / 2 = 20px offset)
      gsap.to(ring.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    const hoverables = document.querySelectorAll("a, button, input, textarea, .clickable");

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring.current, {
          scale: 0.25,
          boxShadow: "0 0 20px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.6)",
          borderColor: "rgba(99,102,241,1)",
          duration: 0.25,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(ring.current, {
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0.6)",
          duration: 0.25,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#6366f1',
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={ring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '2px solid rgba(0,0,0,0.6)',
          borderRadius: '50%',
          zIndex: 9998,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default FancyCursor;
