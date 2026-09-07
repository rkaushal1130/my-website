import React from 'react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';
import HeroBackground from './HeroBackground';
import Hero3DLogo from '../common/Hero3DLogo';

const Hero = ({ onExploreClick, onOpenDemo }) => {
  return (
    <section className="relative min-h-[680px] lg:min-h-[820px] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#171717]">
      
      {/* High-Tech Dynamic Cybernetic & Neural Matrix Ambient Background */}
      <HeroBackground />

      <Container size="wide" className="relative z-10 w-full">
        
        {/* 2-Column Hero Grid: Left Content, Right 3D Moving Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">

          {/* Left Column: Text & Actions (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 sm:space-y-8">
            
            {/* Small Red Label Badge */}
            <div className="inline-flex">
              <Badge>
                AI-POWERED SOLUTIONS
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[66px] 2xl:text-[74px] font-bold text-white tracking-tight leading-[1.12] sm:leading-[1.05] max-w-full">
              AI That Works <br className="hidden sm:inline" />
              <span className="text-[#FF1F26] text-glow relative inline-block">
                As Hard
              </span>{' '}
              As You Do
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal">
              Avaura helps businesses automate, innovate and scale with intelligent AI solutions built for the future.
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

          </div>

          {/* Right Column: 3D Moving Logo (Enlarged, no boxes or cards) */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full mt-6 lg:mt-0">
            <Hero3DLogo className="w-full max-w-[380px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-[680px]" />
          </div>

        </div>
      </Container>

    </section>
  );
};

export default Hero;
