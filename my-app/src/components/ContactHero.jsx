import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 text-center overflow-hidden">
      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#FF1F26]/12 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[700px] mx-auto space-y-5">
          
          {/* Small Red Uppercase Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#252525] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-[0_0_15px_rgba(255,31,38,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
            CONTACT US
          </div>

          {/* Main Heading with "Intelligent" in Red */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Let's Build Something{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Intelligent
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#A8A8A8] leading-relaxed font-normal">
            Have an idea, project or business challenge? Tell us about it and let's explore how AI can help your business move forward.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
