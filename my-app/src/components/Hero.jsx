import React from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from './home/HeroBackground';
import heroIllustration from '../assets/images/hero-bg.png';

const Hero = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[680px] lg:min-h-[820px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#171717]">
      
      {/* High-Tech Dynamic Cybernetic & Neural Matrix Ambient Background */}
      <HeroBackground />

      <div className="max-w-[1760px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-28 relative z-10 w-full">
        
        {/* 2-Column Hero Grid: Left Content, Right Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

          {/* Left Column: Text & Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 sm:space-y-8">
            
            {/* Small Red Label Badge with Glowing Lines */}
            <div className="flex items-center lg:justify-start justify-center gap-4 text-[13px] sm:text-sm font-sans font-bold uppercase tracking-wider text-white select-none">
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
              <span>AI-POWERED SOLUTIONS</span>
              <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[68px] 2xl:text-[76px] font-bold text-white tracking-tight leading-[1.05]">
              AI That Works <br />
              <span className="text-[#FF1F26] text-glow relative inline-block">
                As Hard
              </span>{' '}
              As You Do
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-[#A8A8A8] leading-relaxed max-w-2xl font-normal">
              Avaura helps businesses automate, innovate and scale with intelligent AI solutions built for the future.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="/Pricing.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-semibold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.98] transition-all duration-300 group cursor-pointer w-full sm:w-auto"
              >
                <span>Explore Pricing</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-[#26262B] text-white text-base font-semibold hover:border-[#FF1F26] hover:bg-[#18181D] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full sm:w-auto"
              >
                <span>Talk to an Expert</span>
              </Link>
            </div>

          </div>

          {/* Right Column: High-Impact Cyberpunk AI Developer Artwork */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full mt-8 lg:mt-0">
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-none flex items-center justify-center">
              
              {/* Backlight Halo for Artwork */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[440px] lg:h-[500px] rounded-full bg-[#FF1F26]/20 blur-[85px] pointer-events-none" />

              {/* High-Resolution Cutout Illustration */}
              <img
                src={heroIllustration}
                alt="Avaura AI Engineer Workstation"
                className="relative z-10 w-full max-h-[480px] sm:max-h-[560px] lg:max-h-[620px] object-contain object-center select-none drop-shadow-[0_15px_45px_rgba(255,31,38,0.28)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
