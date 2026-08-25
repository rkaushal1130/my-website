import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Sparkles, Database, ShieldCheck } from 'lucide-react';
import HeroBackground from './home/HeroBackground';

const Hero = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[680px] lg:min-h-[780px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#030303]">
      
      {/* High-Tech Dynamic Cybernetic & Neural Matrix Background */}
      <HeroBackground />

      <div className="max-w-[1760px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-28 relative z-10 w-full">
        
        {/* Main Hero Wrapper */}
        <div className="relative flex flex-col items-center">

          {/* Central Hero Core Content */}
          <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center flex flex-col items-center space-y-7 sm:space-y-8">
            
            {/* Small Red Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010]/90 border border-[#242424] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-[0_0_15px_rgba(255,31,38,0.15)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-ping" />
              AI-POWERED SOLUTIONS
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] 2xl:text-[92px] font-extrabold text-white tracking-tight leading-[1.04]">
              AI That Works <br />
              <span className="text-[#FF1F26] text-glow relative inline-block">
                As Hard
              </span>{' '}
              As You Do
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#A8A8A8] leading-relaxed max-w-3xl lg:max-w-4xl font-normal mx-auto">
              NeverquiT.ai helps businesses automate, innovate and scale with intelligent AI solutions built for the future.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-semibold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#101010]/90 backdrop-blur-md border border-[#26262B] text-white text-base font-semibold hover:border-[#FF1F26] hover:bg-[#18181D] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Talk to an Expert</span>
              </Link>
            </div>

            {/* Core Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm font-medium text-[#8a8a8a] max-w-4xl 2xl:max-w-5xl mx-auto">
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Cpu className="w-4 h-4 text-[#FF1F26]" />
                Autonomous Agents
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FF1F26]" />
                Custom LLM Tuning
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Database className="w-4 h-4 text-[#FF1F26]" />
                Real-Time Vector Engine
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                SOC2 Ready
              </span>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-[#1D1D1D]/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs font-medium text-[#737373] w-full max-w-5xl 2xl:max-w-6xl">
              <div className="p-4 rounded-2xl bg-[#08080A]/80 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">99.98%</span>
                UPTIME SLA
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/80 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-[#FF1F26] block mb-1">50+</span>
                ENTERPRISE DEPLOYS
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/80 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">10x</span>
                PRODUCTIVITY ROI
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/80 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-[#FF1F26] block mb-1">&lt; 14ms</span>
                GLOBAL LATENCY
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
