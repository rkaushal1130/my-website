import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const HomeCTA = ({ onOpenDemo }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#171717]">
      <Container size="wide">
        
        {/* Large Rounded CTA Card spanning wide */}
        <div className="relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-[#171717] to-[#171717] border border-[#242424] p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] hover:border-[#FF1F26]/35 transition-all duration-400">
          
          {/* Background Ambient Red Glows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-[#FF1F26]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />
          
          {/* Ambient Glowing Rings in Background */}
          <div className="hidden sm:flex absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] opacity-30 pointer-events-none items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full border border-[#FF1F26]/30 animate-spin-slow" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-[#FF1F26]/50 animate-pulse" />
            <div className="absolute w-1/2 h-1/2 rounded-full bg-[#FF1F26]/15 blur-xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
              <Badge icon={Calendar}>DISCOVERY CALL</Badge>

              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.1]">
                Ready to Build Something{' '}
                <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                  Amazing?
                </span>
              </h2>

              <p className="text-sm sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal">
                Let's turn your ideas into intelligent solutions with dedicated compute clusters, custom LLM workflows, and multi-agent systems.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center w-full">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-9 py-3.5 sm:py-5 rounded-2xl bg-[#FF1F26] text-white text-base sm:text-lg font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <span className="text-xs text-[#737373] mt-3 text-center lg:text-right w-full font-medium">
                Free 30-min architecture consultation
              </span>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default HomeCTA;
