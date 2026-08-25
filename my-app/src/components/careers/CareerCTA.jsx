import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const CareerCTA = ({ onOpenApplication }) => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <Container size="wide">
        
        {/* Large Rounded CTA Card */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] to-[#080808] border border-[#242424] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-center space-y-6 hover:border-[#FF1F26]/35 transition-all duration-400">
          
          {/* Background Ambient Red Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1F26]/8 rounded-full blur-[100px] pointer-events-none" />

          {/* Ambient Glowing Rings in Background */}
          <div className="absolute right-[-60px] sm:right-0 lg:right-16 top-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] opacity-25 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-[#FF1F26]/30 animate-spin-slow" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-[#FF1F26]/50 animate-pulse" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <Badge icon={Sparkles} className="mx-auto">JOIN OUR TEAM</Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-tight">
              Ready To Build What Comes{' '}
              <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                Next?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#A7A7A7] max-w-lg mx-auto font-normal leading-relaxed">
              Bring your ideas, curiosity and ambition. Let's build intelligent technology together.
            </p>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => onOpenApplication({ title: 'General Application', department: 'Any' })}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.3)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>Join NeverQuit</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default CareerCTA;
