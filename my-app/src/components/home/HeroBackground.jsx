import React, { useEffect, useRef } from 'react';
import heroBgImage from '../../assets/images/hero-bg.png';

/**
 * HeroBackground Component
 * 
 * Next-Gen Cybernetic & Neural Matrix Background for NeverQuit.ai Hero Section:
 * - High-Impact Cyberpunk Developer & AI Visual Artwork Backdrop
 * - Interactive Neural Constellation Mesh with animated data pulses
 * - Concentric Rotating HUD Rings & Holographic Crosshairs
 * - 3D Perspective Cyber Grid with Sweeping Scanline
 * - Ambient Deep Crimson (#8B0000) & Laser Red (#FF1F26) Radial Halos
 * - Smooth Mouse Parallax & Zero-lag RequestAnimationFrame Loop
 */
const HeroBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const hudRef = useRef(null);
  const glowRef = useRef(null);
  const artRef = useRef(null);

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

    // Node count optimized for performance & beauty
    const NODE_COUNT = isMobile ? 24 : 46;
    const CONNECT_DISTANCE = isMobile ? 90 : 130;
    const nodes = [];

    // Initialize Nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: i % 4 === 0 ? '#FF3030' : i % 3 === 0 ? '#FF1F26' : '#991B1B',
      });
    }

    // Floating Data Packets moving along links
    const packets = [];
    const PACKET_COUNT = isMobile ? 6 : 14;
    for (let i = 0; i < PACKET_COUNT; i++) {
      packets.push({
        from: Math.floor(Math.random() * NODE_COUNT),
        to: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: Math.random() * 0.008 + 0.004,
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
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax updates for artwork, HUD, and Glow
      if (artRef.current && !prefersReducedMotion) {
        const normX = (mouse.x / width - 0.5) * 12;
        const normY = (mouse.y / height - 0.5) * 12;
        artRef.current.style.transform = `translate3d(${normX}px, ${normY}px, 0)`;
      }

      if (hudRef.current && !prefersReducedMotion) {
        const normX = (mouse.x / width - 0.5) * 20;
        const normY = (mouse.y / height - 0.5) * 20;
        hudRef.current.style.transform = `translate3d(${normX}px, ${normY}px, 0)`;
      }

      if (glowRef.current && !prefersReducedMotion) {
        const normX = (mouse.x / width - 0.5) * 35;
        const normY = (mouse.y / height - 0.5) * 35;
        glowRef.current.style.transform = `translate3d(${normX}px, ${normY}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Constellation Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += node.pulseSpeed;

          // Wrap boundaries
          if (node.x < -10) node.x = width + 10;
          if (node.x > width + 10) node.x = -10;
          if (node.y < -10) node.y = height + 10;
          if (node.y > height + 10) node.y = -10;

          // Mouse gentle attraction/repulsion
          if (mouse.isHovered) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
              const force = (150 - dist) / 150;
              node.x -= (dx / dist) * force * 0.6;
              node.y -= (dy / dist) * force * 0.6;
            }
          }
        }

        // Draw node
        const currentOpacity = 0.35 + Math.sin(node.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = Math.max(0.1, currentOpacity);
        ctx.shadowColor = '#FF1F26';
        ctx.shadowBlur = node.radius > 1.4 ? 8 : 3;
        ctx.fill();
      }

      // 2. Draw Connecting Lines
      ctx.shadowBlur = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 31, 38, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Traveling Data Packets
      if (!prefersReducedMotion) {
        for (let i = 0; i < packets.length; i++) {
          const pkt = packets[i];
          const n1 = nodes[pkt.from];
          const n2 = nodes[pkt.to];

          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            pkt.progress = 0;
            pkt.from = Math.floor(Math.random() * nodes.length);
            pkt.to = Math.floor(Math.random() * nodes.length);
          }

          if (n1 && n2) {
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECT_DISTANCE * 1.3) {
              const px = n1.x + dx * pkt.progress;
              const py = n1.y + dy * pkt.progress;

              ctx.beginPath();
              ctx.arc(px, py, 1.4, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.globalAlpha = 0.85;
              ctx.shadowColor = '#FF1F26';
              ctx.shadowBlur = 6;
              ctx.fill();
            }
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
        className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
      >
        {/* Massive Center High-Energy Radial Bloom */}
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] lg:w-[1600px] h-[600px] sm:h-[750px] rounded-full blur-[140px] opacity-75 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 31, 38, 0.22) 0%, rgba(139, 0, 0, 0.14) 45%, rgba(61, 5, 5, 0.04) 70%, transparent 85%)',
          }}
        />

        {/* Left Peripheral Glow */}
        <div
          className="absolute top-[20%] left-[-10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full blur-[160px] opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 42, 0, 0.14) 0%, rgba(139, 0, 0, 0.06) 50%, transparent 75%)',
          }}
        />

        {/* Right Peripheral Glow */}
        <div
          className="absolute top-[25%] right-[-10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full blur-[160px] opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 31, 38, 0.16) 0%, rgba(61, 5, 5, 0.06) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* 2. LAYER: High-Impact Cyberpunk Developer & AI Background Artwork (Top to Bottom at Center) */}
      <div
        ref={artRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out will-change-transform z-0"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Backlight Halo for Artwork */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-[#FF1F26]/20 blur-[110px] pointer-events-none" />

          {/* The Hero Image spanning Top to Bottom at Center */}
          <img
            src={heroBgImage}
            alt="NeverQuit.ai Hero Atmosphere"
            className="h-full w-auto max-w-full object-contain object-center opacity-45 sm:opacity-55 lg:opacity-65 mix-blend-screen filter contrast-125 saturate-125 transition-opacity duration-700 select-none"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 8%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.7) 92%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 8%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.7) 92%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* 3. LAYER: Concentric Cybernetic HUD Rings & Orbitals */}
      <div
        ref={hudRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1150px] h-[700px] sm:h-[950px] lg:h-[1150px] pointer-events-none transition-transform duration-100 ease-out will-change-transform"
      >
        {/* Outer Dotted Orbital Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#FF1F26]/12 animate-[spin_120s_linear_infinite]" />

        {/* Middle Precision Tech Ring with 4 Accent Hash Marks */}
        <div className="absolute inset-[15%] rounded-full border border-[#FF1F26]/15 animate-[spin_80s_linear_infinite_reverse]">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-l-2 border-[#FF1F26]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-r-2 border-[#FF1F26]" />
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 border-l-2 border-b-2 border-[#FF1F26]" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 border-[#FF1F26]" />
        </div>

        {/* Inner Glowing Radar Ring */}
        <div className="absolute inset-[32%] rounded-full border border-[#FF1F26]/20 shadow-[0_0_20px_rgba(255,31,38,0.08)]" />

        {/* Central Hex Radar Pulse */}
        <div className="absolute inset-[44%] rounded-full border border-dashed border-[#FF3030]/25 animate-pulse" />
      </div>

      {/* 4. LAYER: Perspective Cyber Grid (Horizon View) */}
      <div
        className="absolute bottom-0 inset-x-0 h-[340px] pointer-events-none opacity-20"
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

      {/* 5. LAYER: Interactive Constellation & Traveling Packets Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. LAYER: Animated Cyber Scanline */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F26]/70 to-transparent shadow-[0_0_15px_#FF1F26] animate-[pulse_4s_ease-in-out_infinite]" />

      {/* 7. LAYER: Floating Tech Corner HUD Markers */}
      <div className="absolute top-24 left-8 sm:left-14 text-[10px] font-mono text-[#737373]/60 hidden sm:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
        <span>SYS.AI_CORE // LATENCY: 0.08ms</span>
      </div>

      <div className="absolute top-24 right-8 sm:right-14 text-[10px] font-mono text-[#737373]/60 hidden sm:flex items-center gap-2">
        <span>SECURITY: SOC2_COMPLIANT</span>
        <span className="text-[#FF1F26] font-bold">[ONLINE]</span>
      </div>

      {/* Plus-Sign Grid Crosshairs */}
      <div className="absolute top-1/3 left-10 text-[#FF1F26]/30 font-mono text-sm hidden lg:block">+</div>
      <div className="absolute top-1/3 right-10 text-[#FF1F26]/30 font-mono text-sm hidden lg:block">+</div>
      <div className="absolute bottom-24 left-16 text-[#FF1F26]/20 font-mono text-sm hidden lg:block">+</div>
      <div className="absolute bottom-24 right-16 text-[#FF1F26]/20 font-mono text-sm hidden lg:block">+</div>

      {/* Bottom Subtle Gradient Fade to Section Base */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] via-[#030303]/85 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
