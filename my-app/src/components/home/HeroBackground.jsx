import React, { useEffect, useRef } from 'react';

/**
 * HeroBackground Component
 * 
 * Dynamic Cybernetic & Neural Matrix Background for NeverQuit.ai:
 * - Ambient Deep Crimson (#8B0000) & Laser Red (#FF1F26) Radial Halos
 * - Perspective Cyber Grid Matrix
 * - Subtle Interactive Red Node Constellation Mesh
 * - Top Cyber Scanline and Corner Telemetry HUD Markers
 */
const HeroBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const NODE_COUNT = isMobile ? 18 : 36;
    const CONNECT_DISTANCE = isMobile ? 85 : 120;
    const nodes = [];

    // Initialize Nodes (Crimson & Red tones)
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: i % 3 === 0 ? '#FF3030' : '#FF1F26',
      });
    }

    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.isHovered = false;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const container = containerRef.current;
    if (container && !prefersReducedMotion) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (glowRef.current && !prefersReducedMotion) {
        const normX = (mouse.x / width - 0.5) * 25;
        const normY = (mouse.y / height - 0.5) * 25;
        glowRef.current.style.transform = `translate3d(${normX}px, ${normY}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Constellation Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += node.pulseSpeed;

          if (node.x < -10) node.x = width + 10;
          if (node.x > width + 10) node.x = -10;
          if (node.y < -10) node.y = height + 10;
          if (node.y > height + 10) node.y = -10;

          if (mouse.isHovered) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130 && dist > 0) {
              const force = (130 - dist) / 130;
              node.x -= (dx / dist) * force * 0.5;
              node.y -= (dy / dist) * force * 0.5;
            }
          }
        }

        const currentOpacity = 0.3 + Math.sin(node.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = Math.max(0.1, currentOpacity);
        ctx.shadowColor = '#FF1F26';
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      // Draw Connecting Red Lines
      ctx.shadowBlur = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 31, 38, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#030303]"
      aria-hidden="true"
    >
      {/* 1. LAYER: Ambient Deep Crimson & Laser Red Glows */}
      <div
        ref={glowRef}
        className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-100 ease-out will-change-transform"
      >
        {/* Massive Center High-Energy Radial Bloom */}
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[340px] sm:w-[900px] lg:w-[1600px] h-[340px] sm:h-[600px] lg:h-[750px] rounded-full blur-[90px] sm:blur-[140px] opacity-75 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 31, 38, 0.22) 0%, rgba(139, 0, 0, 0.14) 45%, rgba(61, 5, 5, 0.04) 70%, transparent 85%)',
          }}
        />

        {/* Left Peripheral Glow */}
        <div
          className="hidden sm:block absolute top-[20%] left-[-10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full blur-[160px] opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 42, 0, 0.14) 0%, rgba(139, 0, 0, 0.06) 50%, transparent 75%)',
          }}
        />

        {/* Right Peripheral Glow */}
        <div
          className="hidden sm:block absolute top-[25%] right-[-10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full blur-[160px] opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 31, 38, 0.16) 0%, rgba(61, 5, 5, 0.06) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* 2. LAYER: Perspective Cyber Grid (Horizon View, clipped inside overflow-hidden parent) */}
      <div className="absolute bottom-0 inset-x-0 h-[340px] overflow-hidden pointer-events-none">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 31, 38, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 31, 38, 0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent 100%)',
            transform: 'perspective(600px) rotateX(60deg) translateY(60px)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* 3. LAYER: Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. LAYER: Animated Cyber Scanline */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F26]/70 to-transparent shadow-[0_0_15px_#FF1F26] animate-[pulse_4s_ease-in-out_infinite]" />

      {/* Bottom Subtle Gradient Fade to Section Base */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] via-[#030303]/85 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
