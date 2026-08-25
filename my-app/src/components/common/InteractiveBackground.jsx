import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBackground Component
 * 
 * Premium interactive black-and-red futuristic theme:
 * - Deep black base (#030303 / #050505)
 * - Multi-layer crimson & dark-red ambient gradients (#3D0505, #8B0000, #FF2A00, #FF4D1A)
 * - Cursor-reactive dual radial glow with fluid lerp interpolation
 * - Secondary trailing crimson halo for 3D visual depth
 * - Subtle parallax motion (5–14px max)
 * - Fine futuristic dot/grid matrix (0.03–0.05 opacity)
 * - Elegant floating red micro-particles with ambient drift
 * - Optimized with requestAnimationFrame, direct refs, and prefers-reduced-motion support
 */
const InteractiveBackground = () => {
  const containerRef = useRef(null);
  const primaryGlowRef = useRef(null);
  const secondaryGlowRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const gridRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;

    // Mouse coordinates (target and interpolated)
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const mouse = {
      targetX: width / 2,
      targetY: height / 2,
      currX: width / 2,
      currY: height / 2,
      trailX: width / 2,
      trailY: height / 2,
      isMoving: false,
    };

    let animationFrameId = null;
    let resizeTimer = null;

    // --- Particle System Setup ---
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const PARTICLE_COUNT = isTouchDevice ? 15 : 32;
    const particles = [];

    const particleColors = [
      'rgba(255, 42, 0, ',    // Bright accent red (#FF2A00)
      'rgba(255, 77, 26, ',   // Soft orange-red (#FF4D1A)
      'rgba(139, 0, 0, ',     // Crimson (#8B0000)
      'rgba(255, 31, 38, ',   // Primary brand red (#FF1F26)
    ];

    const initParticles = () => {
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      particles.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.6,
          baseColor: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.4 + 0.15,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: -(Math.random() * 0.45 + 0.15), // Slow upward drift
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    initParticles();

    // Resize Handler
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        if (canvas) {
          canvas.width = width;
          canvas.height = height;
        }
      }, 100);
    };

    // Mouse Move Handler
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;
    };

    if (!prefersReducedMotion && !isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // --- Main Animation Loop (60fps) ---
    let lastTime = 0;
    const animate = (time) => {
      // 1. Interpolate primary cursor position (smooth lerp 0.08)
      mouse.currX += (mouse.targetX - mouse.currX) * (prefersReducedMotion ? 1 : 0.085);
      mouse.currY += (mouse.targetY - mouse.currY) * (prefersReducedMotion ? 1 : 0.085);

      // 2. Interpolate trailing secondary crimson halo (delayed lerp 0.038 for 3D depth)
      mouse.trailX += (mouse.targetX - mouse.trailX) * (prefersReducedMotion ? 1 : 0.04);
      mouse.trailY += (mouse.targetY - mouse.trailY) * (prefersReducedMotion ? 1 : 0.04);

      // 3. Normalized parallax coordinates (-0.5 to 0.5)
      const normX = (mouse.currX / width) - 0.5;
      const normY = (mouse.currY / height) - 0.5;

      const parallaxX = normX * -14;
      const parallaxY = normY * -14;
      const gridParallaxX = normX * -6;
      const gridParallaxY = normY * -6;

      // 4. Update DOM transforms & Gradients directly (Zero React re-renders)
      if (primaryGlowRef.current) {
        primaryGlowRef.current.style.transform = `translate3d(${mouse.currX}px, ${mouse.currY}px, 0) translate(-50%, -50%)`;
      }

      if (secondaryGlowRef.current) {
        secondaryGlowRef.current.style.transform = `translate3d(${mouse.trailX}px, ${mouse.trailY}px, 0) translate(-50%, -50%)`;
      }

      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
      }

      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${gridParallaxX}px, ${gridParallaxY}px, 0)`;
      }

      // 5. Render Particle System
      if (ctx && canvas && !prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.speedX;
          p.y += p.speedY;
          p.pulse += p.pulseSpeed;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Interactive subtle nudge from cursor
          const dx = mouse.currX - p.x;
          const dy = mouse.currY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 0.8;
            p.y -= (dy / dist) * force * 0.8;
          }

          const currentOpacity = Math.max(0.05, p.opacity + Math.sin(p.pulse) * 0.15);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.baseColor}${currentOpacity})`;
          ctx.shadowColor = '#FF1F26';
          ctx.shadowBlur = p.radius > 1.2 ? 6 : 2;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303] select-none"
      aria-hidden="true"
    >
      {/* LAYER 1: Deep Black Base with Static Red/Crimson Ambient Glows */}
      <div
        ref={ambientGlowRef}
        className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform"
      >
        {/* Top-Center Hero Ambient Crimson Gradient */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[140px] pointer-events-none opacity-70"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.22) 0%, rgba(61, 5, 5, 0.12) 45%, rgba(3, 3, 3, 0) 75%)',
          }}
        />

        {/* Right-Center Warm Dark Red Accent */}
        <div
          className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 42, 0, 0.08) 0%, rgba(61, 5, 5, 0.05) 50%, transparent 75%)',
          }}
        />

        {/* Bottom-Left Subtle Ambient Glow */}
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 0, 0, 0.10) 0%, rgba(61, 5, 5, 0.04) 55%, transparent 80%)',
          }}
        />
      </div>

      {/* LAYER 2: Secondary Trailing Crimson Halo (Delayed for 3D Depth) */}
      <div
        ref={secondaryGlowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[110px] pointer-events-none will-change-transform opacity-65"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 0, 0, 0.28) 0%, rgba(61, 5, 5, 0.12) 45%, transparent 70%)',
          transform: 'translate3d(-999px, -999px, 0) translate(-50%, -50%)',
        }}
      />

      {/* LAYER 3: Primary Cursor-Reactive Bright Red / Orange Spotlight */}
      <div
        ref={primaryGlowRef}
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full blur-[90px] pointer-events-none will-change-transform opacity-75"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 42, 0, 0.22) 0%, rgba(255, 77, 26, 0.10) 35%, rgba(61, 5, 5, 0.03) 65%, transparent 80%)',
          transform: 'translate3d(-999px, -999px, 0) translate(-50%, -50%)',
        }}
      />

      {/* LAYER 4: Subtle Futuristic Grid Matrix */}
      <div
        ref={gridRef}
        className="absolute inset-[-20px] bg-grid-pattern opacity-40 pointer-events-none transition-transform duration-75 ease-out will-change-transform"
      />

      {/* LAYER 5: Floating Red Micro-Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* Subtle Vignette Edge Mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(3, 3, 3, 0.5) 100%)',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
