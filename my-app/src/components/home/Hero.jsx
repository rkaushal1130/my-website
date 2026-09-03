import React from 'react';
import { ShieldCheck, Sparkles, Cpu, Database } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';
import HeroBackground from './HeroBackground';
import heroIllustration from '../../assets/images/hero-bg.png';

const Hero = ({ onExploreClick, onOpenDemo }) => {
  return (
    <section className="relative min-h-[680px] lg:min-h-[820px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#030303]">
      
      {/* High-Tech Dynamic Cybernetic & Neural Matrix Ambient Background */}
      <HeroBackground />

      <Container size="wide" className="relative z-10 w-full">
        
        {/* 2-Column Hero Grid: Left Content, Right Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

          {/* Left Column: Text & Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 sm:space-y-8">
            
            {/* Small Red Label Badge */}
            <div className="inline-flex">
              <Badge>
                AI-POWERED SOLUTIONS
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[68px] 2xl:text-[76px] font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.05] max-w-full">
              AI That Works <br className="hidden sm:inline" />
              <span className="text-[#FF1F26] text-glow relative inline-block">
                As Hard
              </span>{' '}
              As You Do
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal">
              NeverquiT AI helps businesses automate, innovate and scale with intelligent AI solutions built for the future.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <Button
                href="/Pricing.pdf"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                Explore Pricing
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto justify-center"
              >
                Talk to an Expert
              </Button>
            </div>

            {/* Core Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-2 text-xs sm:text-sm font-medium text-[#8a8a8a] max-w-full">
              <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-1.5 sm:gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1F26] shrink-0" />
                <span>Autonomous Agents</span>
              </span>
              <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-1.5 sm:gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1F26] shrink-0" />
                <span>Custom LLM Tuning</span>
              </span>
              <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-1.5 sm:gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1F26] shrink-0" />
                <span>Real-Time Vector Engine</span>
              </span>
              <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0d0d10]/90 backdrop-blur-md border border-[#222] flex items-center gap-1.5 sm:gap-2 hover:border-[#FF1F26]/40 transition-colors shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1F26] shrink-0" />
                <span>SOC2 Ready</span>
              </span>
            </div>

            {/* Trust Indicators (2 cols on mobile, 4 on md/desktop) */}
            <div className="pt-6 border-t border-[#1D1D1D]/80 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 text-xs font-medium text-[#737373] w-full">
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#08080A]/85 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors text-center sm:text-left">
                <span className="text-lg sm:text-2xl font-bold text-white block mb-0.5">99.98%</span>
                UPTIME SLA
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#08080A]/85 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors text-center sm:text-left">
                <span className="text-lg sm:text-2xl font-bold text-[#FF1F26] block mb-0.5">50+</span>
                ENTERPRISE DEPLOYS
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#08080A]/85 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors text-center sm:text-left">
                <span className="text-lg sm:text-2xl font-bold text-white block mb-0.5">10x</span>
                PRODUCTIVITY ROI
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#08080A]/85 backdrop-blur-md border border-[#1A1A1F] hover:border-[#FF1F26]/40 transition-colors text-center sm:text-left">
                <span className="text-lg sm:text-2xl font-bold text-[#FF1F26] block mb-0.5">&lt; 14ms</span>
                GLOBAL LATENCY
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Cyberpunk AI Developer Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-6 lg:mt-0 overflow-hidden">
            <div className="relative w-full max-w-[310px] sm:max-w-[440px] lg:max-w-none flex items-center justify-center mx-auto">
              
              {/* Backlight Halo for Artwork */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[380px] lg:w-[500px] h-[220px] sm:h-[380px] lg:h-[500px] rounded-full bg-[#FF1F26]/20 blur-[75px] sm:blur-[85px] pointer-events-none" />

              {/* High-Resolution Cutout Illustration */}
              <img
                src={heroIllustration}
                alt="NeverQuit.ai AI Engineer Workstation"
                className="relative z-10 w-full max-h-[340px] sm:max-h-[480px] lg:max-h-[620px] object-contain object-center select-none drop-shadow-[0_15px_45px_rgba(255,31,38,0.28)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </Container>

    </section>
  );
};

export default Hero;
