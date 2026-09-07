import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import heroIllustration from '../../assets/images/hero-bg.png';

const CareersHero = ({ onApplyNow, onApplyClick }) => {
  const handleApply = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof onApplyNow === 'function') {
      onApplyNow();
    } else if (typeof onApplyClick === 'function') {
      onApplyClick();
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-apply-modal'));
    }
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-[#171717]">
      {/* Background Volumetric Glow & Fine Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#FF1F26]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="flex justify-center lg:justify-start">
              <Badge>CAREERS AT AVAURAA</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.1]">
              Build Your Future{' '}
              <span className="text-[#FF1F26] text-glow inline-block">
                With Us
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              At Avauraa, we don't just build digital solutions — we build careers, ideas and a brighter tomorrow. Join a team where your talent is valued, your growth is supported, and your ideas make an impact.
            </p>

            {/* Action Button */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                type="button"
                id="careers-apply-now-btn"
                onClick={handleApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-[#FF1F26] text-white text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Tech Developer Artwork (From Home Hero) */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full mt-6 lg:mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[580px] flex items-center justify-center mx-auto">
              
              {/* Backlight Halo for Artwork */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] lg:w-[480px] h-[240px] sm:h-[380px] lg:h-[480px] rounded-full bg-[#FF1F26]/20 blur-[75px] sm:blur-[95px] pointer-events-none" />

              {/* High-Resolution Cutout Illustration */}
              <img
                src={heroIllustration}
                alt="Avaura Developer Team"
                className="relative z-10 w-full max-h-[360px] sm:max-h-[480px] lg:max-h-[580px] object-contain object-center select-none drop-shadow-[0_15px_45px_rgba(255,31,38,0.28)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CareersHero;
