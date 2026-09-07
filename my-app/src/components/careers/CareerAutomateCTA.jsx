import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

const CareerAutomateCTA = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#171717]">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1F26]/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to Automate Your{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Business
            </span>{' '}
            with AI?
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#A7A7A7] max-w-xl mx-auto font-normal leading-relaxed">
            Start leveraging the power of AI today and unlock new levels of efficiency and growth.
          </p>

          {/* Button with glowing line behind/beside it */}
          <div className="mt-10 sm:mt-12 relative flex items-center justify-center w-full max-w-xl mx-auto">
            {/* Glowing horizontal line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/70 to-transparent pointer-events-none" />

            <Link
              to="/contact"
              className="relative z-10 inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl bg-[#0D0D10] border border-[#FF1F26] text-white text-sm sm:text-base font-semibold shadow-[0_0_25px_rgba(255,31,38,0.28)] hover:bg-[#141418] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerAutomateCTA;
