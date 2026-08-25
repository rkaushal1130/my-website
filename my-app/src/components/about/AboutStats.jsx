import React from 'react';
import Container from '../common/Container';

const AboutStats = () => {
  const stats = [
    { number: '50+', label: 'Projects', highlight: 'Delivered Globally' },
    { number: '20+', label: 'Solutions', highlight: 'In Production' },
    { number: '10+', label: 'Industries', highlight: 'Enterprise Verticals' },
    { number: '24/7', label: 'AI Support', highlight: 'Dedicated SLA' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0B] border-y border-[#242424] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2 group">
              {/* 3D Depth Typography with Layered Shadows */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] [text-shadow:_0_0_25px_rgba(255,31,38,0.35)] transition-transform duration-300 group-hover:scale-105">
                <span className="text-[#FF1F26]">{stat.number.slice(0, -1)}</span>
                <span>{stat.number.slice(-1)}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs text-[#737373] font-mono">
                {stat.highlight}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutStats;
