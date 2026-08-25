import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const ServicesCTA = ({ onOpenDemo }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      <Container size="wide">
        
        {/* Large Rounded CTA Card */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] to-[#080808] border border-[#242424] p-8 sm:p-12 md:p-14 lg:p-16 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] hover:border-[#FF1F26]/35 transition-all duration-400">
          
          {/* Background Ambient Red Glows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/6 rounded-full blur-3xl pointer-events-none" />
          
          {/* Ambient Glowing Rings in Background */}
          <div className="absolute right-[-60px] sm:right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] opacity-25 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-[#FF1F26]/30 animate-spin-slow" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-[#FF1F26]/50 animate-pulse" />
            <div className="absolute w-1/2 h-1/2 rounded-full bg-[#FF1F26]/10 blur-xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <Badge icon={Calendar}>GET STARTED</Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
                Ready to Deploy Custom AI for Your{' '}
                <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                  Enterprise?
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-xl font-normal">
                Schedule a 30-minute architecture session with our AI engineering leads to map out your technical requirements.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#737373] font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                  CONFIDENTIAL NDA
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FF1F26]" />
                  10-DAY WORKING POC
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FF1F26]" />
                  CUSTOM MODEL WEIGHTS
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.3)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <span className="text-xs text-[#737373] mt-2.5 text-center lg:text-right w-full font-medium">
                Direct access to principal AI engineers
              </span>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default ServicesCTA;
