import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';

const PortfolioCTA = ({ onOpenDemo }) => {
  return (
    <section id="portfolio-cta" className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1F26]/10 rounded-full blur-[130px] pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-7 font-sans">
          
          {/* Eyebrow with glowing horizontal lines */}
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>START YOUR JOURNEY</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Large Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Have a Project in <span className="text-[#FF1F26] text-glow">Mind?</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#A1A1AA] font-normal leading-relaxed max-w-xl mx-auto">
            Let's build a full-stack solution that <span className="text-white font-semibold">never quits</span>.
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-center pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn select-none"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </div>

          {/* Micro Trust Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A1A1AA] font-sans font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NDA Protected</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF1F26]" />
              <span>Sub-24hr Response</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF1F26]" />
              <span>Custom JavaScript Architecture</span>
            </span>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default PortfolioCTA;
