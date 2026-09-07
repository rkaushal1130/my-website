import React, { useRef, useEffect, useCallback } from 'react';
import brandLogo from '../../assets/images/logo.png';

/**
 * Hero3DLogo
 * 
 * Renders ONLY the official Avaura logo with smooth 3D motion:
 * - Continuous multi-axis 3D floating, swaying, and tilting motion (60fps).
 * - Interactive 3D mouse parallax tracking with smooth lerping.
 * - Clean display: No background card, no boxes, no borders, no pills, no extra text.
 * - Dynamic floor shadow beneath the 3D logo.
 */
const Hero3DLogo = ({ className = '' }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const shadowRef = useRef(null);
  const rafRef = useRef(null);

  // 3D Motion state
  const motionRef = useRef({
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    floatY: 0,
    isHovered: false,
  });

  // ---------------------------------------------------------------------------
  // 60fps Continuous 3D Motion & Parallax Loop
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let startTime = performance.now();

    const updateLoop = (now) => {
      const elapsed = (now - startTime) * 0.001;
      const m = motionRef.current;

      // Continuous 3D floating & natural gyroscopic swaying
      const idleTiltX = Math.sin(elapsed * 1.2) * 7;
      const idleTiltY = Math.cos(elapsed * 0.85) * 12;
      const idleFloatY = Math.sin(elapsed * 1.6) * 12;
      const idleTiltZ = Math.sin(elapsed * 0.7) * 2.5;

      // Blend mouse interaction with idle 3D motion
      const desiredX = m.isHovered
        ? m.targetRotX * 0.8 + idleTiltX * 0.3
        : idleTiltX;
      const desiredY = m.isHovered
        ? m.targetRotY * 0.8 + idleTiltY * 0.3
        : idleTiltY;

      // Smooth lerp damping
      m.currentRotX += (desiredX - m.currentRotX) * 0.08;
      m.currentRotY += (desiredY - m.currentRotY) * 0.08;
      m.floatY += (idleFloatY - m.floatY) * 0.09;

      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${m.floatY.toFixed(2)}px) rotateX(${m.currentRotX.toFixed(2)}deg) rotateY(${m.currentRotY.toFixed(2)}deg) rotateZ(${idleTiltZ.toFixed(2)}deg)`;
      }

      if (shadowRef.current) {
        // Dynamic floor shadow responds to float height
        const shadowScale = 1 - (m.floatY / 60);
        const shadowOpacity = 0.55 + (m.floatY / 70);
        shadowRef.current.style.transform = `scale(${Math.max(0.7, Math.min(1.3, shadowScale)).toFixed(2)}) translateX(${(-m.currentRotY * 1.5).toFixed(2)}px)`;
        shadowRef.current.style.opacity = Math.max(0.2, Math.min(0.75, shadowOpacity)).toFixed(2);
      }

      rafRef.current = requestAnimationFrame(updateLoop);
    };

    rafRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Mouse tracking
  // ---------------------------------------------------------------------------
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to +1
    const normY = (y / rect.height) * 2 - 1; // -1 to +1

    motionRef.current.targetRotX = -normY * 18;
    motionRef.current.targetRotY = normX * 24;
  }, []);

  const handleMouseEnter = useCallback(() => {
    motionRef.current.isHovered = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    motionRef.current.isHovered = false;
    motionRef.current.targetRotX = 0;
    motionRef.current.targetRotY = 0;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1100px' }}
      className={`relative flex flex-col items-center justify-center select-none py-6 sm:py-8 ${className}`}
    >
      {/* Ambient Red Glow Halo behind Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] lg:w-[520px] h-[220px] sm:h-[300px] lg:h-[360px] bg-[#FF1F26]/12 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none" />

      {/* 3D Moving Logo Element */}
      <div
        ref={logoRef}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative z-10 flex items-center justify-center max-w-full cursor-pointer"
      >
        <div className="relative p-2 sm:p-4">
          <img
            src={brandLogo}
            alt="Avaura"
            className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] pointer-events-none"
          />
        </div>
      </div>

      {/* Dynamic Floor Shadow beneath 3D Logo */}
      <div
        ref={shadowRef}
        className="w-64 sm:w-80 lg:w-96 h-6 sm:h-8 rounded-full bg-black/80 blur-xl pointer-events-none mt-2 transition-all duration-150"
      />
    </div>
  );
};

export default Hero3DLogo;
