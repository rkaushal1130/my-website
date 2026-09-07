import React from 'react';
import { Rocket } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import brandLogo from '../../assets/images/logo.png';

const CareerIntro = () => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-[#171717]">
      {/* Background Volumetric Glow & Fine Grid (Avaura Red Theme) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-85 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF1F26]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <Badge>CAREERS AT AVAURA</Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12]">
            Join Our Team of Passionate Innovators Building the{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Future
            </span>{' '}
            of Technology.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#A7A7A7] leading-relaxed max-w-2xl mx-auto font-normal">
            Join our team of passionate innovators who are transforming the future of technology and business solutions.
          </p>
        </div>

        {/* Featured Box: We're here to grow (Sleek Avaura Dark/Red Theme) */}
        <div className="mt-10 sm:mt-12 max-w-3xl lg:max-w-[840px] mx-auto relative rounded-2xl sm:rounded-3xl bg-[#0D0D10]/95 border border-[#24242A] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,31,38,0.06)] backdrop-blur-md text-center transition-all duration-300 hover:border-[#FF1F26]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,31,38,0.12)]">
          {/* Subtle top red glow inside box */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#FF1F26]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white mb-5 sm:mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#17171C] border border-[#292932] flex items-center justify-center text-[#FF1F26] shadow-[0_0_12px_rgba(255,31,38,0.25)]">
                <Rocket className="w-4 h-4 text-[#FF1F26]" />
              </div>
              <span className="tracking-tight">We're here to grow</span>
            </div>

            {/* Paragraph Content (Formatted to fit comfortably) */}
            <p className="text-sm sm:text-[15px] md:text-base text-[#B8B8C0] leading-[1.8] sm:leading-[1.85] font-normal max-w-2xl mx-auto text-center">
              At Avaura, we believe innovation and human creativity matter more than ever in today's automated world. We're transforming businesses by turning every team member into a trusted technology advisor. Our AI-powered solutions unify data from multiple sources, analyze patterns, and provide actionable insights to help businesses make smarter decisions and build meaningful customer relationships. We have been growing rapidly since we started and are backed by a strong foundation of satisfied clients and innovative partnerships.
            </p>

            {/* Centered Divider Accent */}
            <div className="w-40 sm:w-56 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/45 to-transparent my-6 sm:my-7" />

            {/* Footer: Avaura Team / Innovation Leaders */}
            <div className="flex items-center justify-center gap-3.5">
              <img
                src={brandLogo}
                alt="Avaura"
                className="h-7 sm:h-8 w-auto max-w-[130px] object-contain"
              />
              <div className="h-5 w-px bg-[#2E2E36]" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Avaura Team
                </div>
                <div className="text-[11px] sm:text-xs text-[#8A8A92] font-medium mt-0.5">
                  Innovation Leaders
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerIntro;
