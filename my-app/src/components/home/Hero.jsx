import React from 'react';
import { ShieldCheck, Sparkles, Cpu, Database } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';

const Hero = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[660px] lg:min-h-[760px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#030303]">
      
      {/* Background Ambient Radial Red Glows & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] 2xl:w-[1700px] h-[650px] bg-radial-hero opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 left-5 w-[600px] h-[600px] bg-[#FF1F26]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/4 right-5 w-[600px] h-[600px] bg-[#FF1F26]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Cybernetic Ambient Streaks */}
      <div className="absolute top-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/25 to-transparent pointer-events-none" />

      <Container size="wide" className="relative z-10 w-full">
        
        {/* Main Hero Wrapper */}
        <div className="relative flex flex-col items-center">

          {/* Central Hero Core Content */}
          <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center flex flex-col items-center space-y-7 sm:space-y-8">
            
            {/* Small Red Label Badge */}
            <Badge>
              AI-POWERED SOLUTIONS
            </Badge>

            {/* Main Heading (Fluid, Imposing & Broad) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] 2xl:text-[92px] font-extrabold text-white tracking-tight leading-[1.04]">
              AI That Works <br />
              <span className="text-[#FF1F26] text-glow relative inline-block">
                As Hard
              </span>{' '}
              As You Do
            </h1>

            {/* Description (Wider span for natural readability) */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#A7A7A7] leading-relaxed max-w-3xl lg:max-w-4xl font-normal mx-auto">
              NeverquiT.ai helps businesses automate, innovate and scale with intelligent AI solutions built for the future.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                to="/services"
                variant="primary"
                size="lg"
              >
                Explore Services
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="lg"
              >
                Talk to an Expert
              </Button>
            </div>

            {/* Core Feature Badges (Spread wider with clean spacing) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 text-xs sm:text-sm font-medium text-[#8a8a8a] max-w-4xl 2xl:max-w-5xl mx-auto">
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Cpu className="w-4 h-4 text-[#FF1F26]" />
                Autonomous Agents
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FF1F26]" />
                Custom LLM Tuning
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Database className="w-4 h-4 text-[#FF1F26]" />
                Real-Time Vector Engine
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                SOC2 Ready
              </span>
            </div>

            {/* Trust Indicators (Full-width 4-Card Module) */}
            <div className="pt-8 border-t border-[#1D1D1D] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs font-medium text-[#737373] w-full max-w-5xl 2xl:max-w-6xl">
              <div className="p-4 rounded-2xl bg-[#08080A]/70 border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">99.98%</span>
                UPTIME SLA
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/70 border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-[#FF1F26] block mb-1">50+</span>
                ENTERPRISE DEPLOYS
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/70 border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">10x</span>
                PRODUCTIVITY ROI
              </div>
              <div className="p-4 rounded-2xl bg-[#08080A]/70 border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold text-[#FF1F26] block mb-1">&lt; 14ms</span>
                GLOBAL LATENCY
              </div>
            </div>

          </div>

        </div>
      </Container>

    </section>
  );
};

export default Hero;
