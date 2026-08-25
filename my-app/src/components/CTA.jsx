import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const HomeCTA = ({ onOpenDemo }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Large Rounded CTA Card spanning wide */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] to-[#080808] border border-[#242424] p-8 sm:p-12 md:p-14 lg:p-16 xl:p-20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] hover:border-[#FF1F26]/35 transition-all duration-400">
          
          {/* Background Ambient Red Glows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF1F26]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />
          
          {/* Ambient Glowing Rings in Background */}
          <div className="absolute right-[-40px] sm:right-4 lg:right-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] opacity-30 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-[#FF1F26]/30 animate-spin-slow" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-[#FF1F26]/50 animate-pulse" />
            <div className="absolute w-1/2 h-1/2 rounded-full bg-[#FF1F26]/15 blur-xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141418] border border-[#26262B] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span>DISCOVERY CALL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.1]">
                Ready to Build Something{' '}
                <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                  Amazing?
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal">
                Let's turn your ideas into intelligent solutions with dedicated compute clusters, custom LLM workflows, and multi-agent systems.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-[#737373] font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                  SOC2 READY
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FF1F26]" />
                  DEPLOY IN WEEKS
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF1F26]" />
                  ZERO RETENTION PRIVACY
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 rounded-2xl bg-[#FF1F26] text-white text-base sm:text-lg font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
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

      </div>
    </section>
  );
};

export default HomeCTA;
