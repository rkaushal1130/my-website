import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Container from '../common/Container';
import { servicesFaqData } from '../../data/faq';

const ServicesFAQ = () => {
  // Starts closed so hovering opens smoothly and mouse-leave closes smoothly
  const [openIdx, setOpenIdx] = useState(-1);

  const handleCardHover = (idx) => {
    setOpenIdx(idx);
  };

  const handleListLeave = () => {
    setOpenIdx(-1);
  };

  const handleClick = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section id="faq" className="py-24 lg:py-32 relative bg-[#060608] border-t border-[#14141A] overflow-hidden">
      <Container className="relative z-10">
        {/* Top Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3.5">
          {/* Top Line Tag: —— FAQ —— */}
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.3em] font-semibold text-[#FF3030] uppercase select-none">
            <span className="w-10 h-[1.5px] bg-[#FF1F26]/70" />
            <span>FAQ</span>
            <span className="w-10 h-[1.5px] bg-[#FF1F26]/70" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-tight">
            Got <span className="text-[#FF1F26] text-glow inline-block">Questions?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9494A2] leading-relaxed font-normal max-w-xl mx-auto">
            Here are some answers to the most common questions about Avaura, our process, and how we work.
          </p>
        </div>

        {/* Main Split Layout: Left Info Column + Right Accordion Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            {/* Category Tag: — SUPPORT */}
            <div className="flex items-center gap-2.5 text-xs tracking-[0.25em] text-[#8E8E9E] font-semibold uppercase select-none">
              <span className="w-6 h-[1.5px] bg-[#FF1F26]" />
              <span>SUPPORT</span>
            </div>

            {/* Large Stacked Heading */}
            <h3 className="text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12]">
              Everything<br />
              You Need<br />
              to Know
            </h3>

            {/* Muted Descriptive Paragraph */}
            <p className="text-sm sm:text-base text-[#8E8E9E] leading-relaxed font-normal max-w-md">
              Still have a question? We're here to help. If you don't find what you're looking for, feel free to reach out to our team.
            </p>
          </div>

          {/* Right Column (7 Cols): Bullet-Symbol FAQ Accordion Stack */}
          <div
            onMouseLeave={handleListLeave}
            className="lg:col-span-7 space-y-3.5"
          >
            {servicesFaqData.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => handleCardHover(idx)}
                  style={{
                    transition: 'border-color 300ms ease, box-shadow 300ms ease, background-color 300ms ease',
                  }}
                  className={`rounded-2xl sm:rounded-3xl cursor-pointer overflow-hidden ${
                    isOpen
                      ? 'bg-[#0E0E14]/95 border border-[#FF1F26] shadow-[0_0_28px_rgba(255,31,38,0.22)]'
                      : 'bg-[#0A0A0E]/90 border border-[#1A1A22] hover:border-[#2C2C38]'
                  }`}
                >
                  {/* Accordion Question Row */}
                  <button
                    type="button"
                    onClick={() => handleClick(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                      {/* Bullet Symbol instead of Numbering */}
                      <div className="relative shrink-0 flex items-center justify-center w-6 h-6">
                        {/* Outer Glowing Halo when Active */}
                        <div
                          style={{
                            transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                          className={`absolute inset-0 rounded-full ${
                            isOpen
                              ? 'bg-[#FF1F26]/20 scale-125'
                              : 'bg-transparent scale-50'
                          }`}
                        />
                        {/* Core Glowing Bullet Dot */}
                        <div
                          style={{
                            transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                          className={`rounded-full ${
                            isOpen
                              ? 'w-3 h-3 bg-[#FF1F26] shadow-[0_0_14px_#FF1F26] scale-110'
                              : 'w-2.5 h-2.5 bg-[#4A4A58] group-hover:bg-[#FF1F26]/70 group-hover:shadow-[0_0_8px_#FF1F26]/50'
                          }`}
                        />
                      </div>

                      {/* Question Text */}
                      <span
                        style={{
                          transition: 'color 200ms ease',
                        }}
                        className={`text-sm sm:text-base md:text-[17px] font-bold tracking-tight leading-snug ${
                          isOpen ? 'text-white' : 'text-[#E0E0EC] group-hover:text-white'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Circular Plus/Minus Toggle Badge */}
                    <div
                      style={{
                        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border ${
                        isOpen
                          ? 'border-[#FF1F26] text-[#FF1F26] bg-[#140D0F] shadow-[0_0_12px_rgba(255,31,38,0.35)] rotate-180'
                          : 'border-[#2E2E3C] text-[#FF1F26] bg-transparent group-hover:border-[#FF1F26]/60 rotate-0'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </div>
                  </button>

                  {/* Silky-Smooth GPU-Accelerated CSS Grid Expansion & Collapse */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                          transition: 'opacity 260ms ease, transform 260ms ease',
                        }}
                        className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#9A9AB0] leading-relaxed font-normal pl-6 sm:pl-[3.75rem]"
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ServicesFAQ;
