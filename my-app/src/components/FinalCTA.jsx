import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const FinalCTA = ({ onOpenDemo }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      
      {/* Background Red Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#FF1F26]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Futuristic red light line graphics */}
      <div className="absolute top-10 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Large Rounded CTA Banner Card */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] to-[#080808] border border-[#252525] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-center space-y-6">
          
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none mx-auto">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>NEXT STEPS</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Have An Idea? <br />
            Let's Make It{' '}
            <span className="text-[#FF1F26] drop-shadow-[0_0_25px_rgba(255,31,38,0.45)]">
              Real.
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#A8A8A8] max-w-xl mx-auto font-normal leading-relaxed">
            Your next intelligent solution could start with a conversation.
          </p>

          {/* Buttons Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Primary Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_30px_rgba(255,31,38,0.4)] hover:bg-[#FF3030] hover:shadow-[0_0_45px_rgba(255,31,38,0.6)] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#050505] border border-[#252525] hover:border-[#FF1F26] text-white text-base font-medium hover:bg-[#111111] transition-all duration-300 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#FF1F26]" />
              <span>Talk to Our Team</span>
            </button>

          </div>

          {/* Footer Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#737373] font-mono border-t border-[#1C1C1C] max-w-lg mx-auto">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
              CONFIDENTIAL NDA READY
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF1F26]" />
              1 BUSINESS DAY RESPONSE
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
