import React from 'react';
import Container from '../common/Container';

const PortfolioHero = () => {
  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-[#030303]">
      {/* Background Volumetric Glow & Fine Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-radial-hero opacity-75 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF1F26]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7 animate-fade-in font-sans">
          
          {/* Eyebrow with glowing horizontal lines */}
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>TECHNOLOGY ARCHITECTURE</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Large Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.08]">
            Full-Stack Technology That{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Never Quits.
            </span>
          </h1>

          {/* Supporting Line / Description */}
          <p className="text-base sm:text-xl text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto font-normal">
            Deep dive into our full-stack JavaScript architecture, reactive frontend libraries, Node.js backend engines, and database systems.
          </p>

          {/* Cardless Live Telemetry Line */}
          <div className="pt-6 max-w-lg mx-auto border-t border-white/[0.08] flex items-center justify-around font-sans text-[#A1A1AA]">
            <div className="text-center">
              <span className="text-base sm:text-xl font-bold text-white tracking-tight block">50+</span>
              <span className="text-[11px] sm:text-xs text-[#71717A] font-medium block mt-0.5">Live Systems</span>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="text-center">
              <span className="text-base sm:text-xl font-bold text-[#FF1F26] tracking-tight block">99.98%</span>
              <span className="text-[11px] sm:text-xs text-[#71717A] font-medium block mt-0.5">Uptime SLA</span>
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="text-center">
              <span className="text-base sm:text-xl font-bold text-white tracking-tight block">&lt; 18ms</span>
              <span className="text-[11px] sm:text-xs text-[#71717A] font-medium block mt-0.5">Inference</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default PortfolioHero;
