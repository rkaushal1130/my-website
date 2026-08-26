import React from 'react';
import Container from '../common/Container';

const TEAM_MEMBERS = [
  {
    id: 4,
    name: 'Aniket Chaudhary',
    role: 'Full Stack Developer',
    image: '/team/aniket-chaudhary.png',
  },
  {
    id: 5,
    name: 'Rahul Kaushal',
    role: 'UI/UX Developer',
    image: '/team/rahul-kaushal.png',
  },
];

const PortfolioExperts = () => {
  return (
    <section id="experts" className="py-20 sm:py-28 relative overflow-hidden bg-[#030611] font-sans border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-radial-glow opacity-60 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-3">
          
          {/* Eyebrow with glowing horizontal gradient lines */}
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>OUR TEAM</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.15]">
            Meet The Experts Behind Our Success
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2 EXPERT CARDS (COMPACT & BALANCED) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[440px] sm:max-w-[520px] mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-xl sm:rounded-2xl bg-[#070C1A] border border-[#162036] hover:border-[#FF1F26]/60 hover:shadow-[0_0_30px_rgba(255,31,38,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            >
              {/* Top Photo Frame with clean studio background */}
              <div className="relative w-full aspect-[4/5] bg-white overflow-hidden flex items-end justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Bottom Info Card */}
              <div className="p-3 sm:p-3.5 text-center bg-gradient-to-b from-[#080E20] to-[#040711] flex-1 flex flex-col justify-center border-t border-[#162036]">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight group-hover:text-white transition-colors truncate">
                  {member.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#94A3B8] font-normal mt-0.5 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default PortfolioExperts;
