import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const CareersBottomCTA = ({ onExploreOpenings }) => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#171717] border-t border-[#222226]">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#FF1F26]/12 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <Badge className="mb-4">READY TO BUILD WHAT'S NEXT?</Badge>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
          Let's Create a Better Tomorrow,{' '}
          <span className="text-[#FF1F26] text-glow inline-block">
            Together.
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-[#A7A7A7] max-w-2xl mx-auto font-normal leading-relaxed">
          Explore opportunities and be part of a team that's shaping the future.
        </p>

        {/* Action Button */}
        <div className="mt-10 flex items-center justify-center">
          <button
            type="button"
            onClick={onExploreOpenings}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none cursor-pointer"
          >
            <span>Explore Openings</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default CareersBottomCTA;
