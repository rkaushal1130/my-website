import React from 'react';
import Container from '../common/Container';

const CareerStats = () => {
  const stats = [
    { number: '100%', label: 'Remote / Hybrid Flexibility', highlight: 'Worldwide Talent' },
    { number: '$5,000', label: 'Annual Learning Stipend', highlight: 'Books, Conferences & AI' },
    { number: '3 Rounds', label: 'Fast Transparent Hiring', highlight: 'Decision within 5 days' },
    { number: 'Top 1%', label: 'Engineering Density', highlight: 'Ex-Tier 1 AI Teams' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#0B0B0B] border-y border-[#242424] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1.5">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                <span className="text-[#FF1F26]">{stat.number}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">
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

export default CareerStats;
