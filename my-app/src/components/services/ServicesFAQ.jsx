import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import { faqData } from '../../data/faq';

const ServicesFAQ = () => {
  // Index 2 ("Do you work with startups?") is initially open matching the screenshot
  const [openIdx, setOpenIdx] = useState(2);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative overflow-hidden bg-[#111114]">
      {/* Background Volumetric Ambient Radial Glow & Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-[#FF1F26]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container size="compact" className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="flex justify-center">
            <Badge icon={HelpCircle}>FREQUENTLY ASKED QUESTIONS</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Questions
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7A7A7] font-normal max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our services, process, and partnering with Avaura.
          </p>
        </div>

        {/* FAQ Accordion List Exactly Matching Screenshot */}
        <div className="w-full max-w-3xl mx-auto space-y-4 text-left">
          {faqData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-[#121216] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#FF1F26] shadow-[0_0_30px_rgba(255,31,38,0.22)]'
                    : 'border-[#222228] hover:border-[#32323A]'
                }`}
              >
                {/* Accordion Question Row */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none group"
                >
                  {/* Left Indicator Dot + Question Text */}
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-2">
                    {/* Glowing Red Dot when open, Dim Red Ring when closed */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#FF1F26] shadow-[0_0_12px_#FF1F26]'
                          : 'bg-[#521013] border border-[#961F24]'
                      }`}
                    />
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-white/95">
                      {faq.question}
                    </span>
                  </div>

                  {/* Right Circle Toggle Button (+ or -) */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border border-[#FF1F26] bg-transparent text-[#FF1F26]'
                        : 'border border-white/5 bg-[#0C0C0F] text-[#FF1F26] group-hover:border-[#FF1F26]/40'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </div>
                </button>

                {/* Expanding Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#23232A]/80 px-6 sm:px-8 pt-4 pb-6">
                      <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServicesFAQ;
