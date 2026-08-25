import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      
      {/* 1. Small Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF1F26] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#FF1F26] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* 2. Soft Red Outer Ring with Smooth Follow */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#FF1F26] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 bg-[#FF1F26]/10 border-[#FF3030] shadow-[0_0_20px_rgba(255,31,38,0.4)] scale-125'
            : 'w-7 h-7 bg-transparent border-[#FF1F26]/50 shadow-[0_0_10px_rgba(255,31,38,0.2)] scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

    </div>
  );
};

export default CustomCursor;
