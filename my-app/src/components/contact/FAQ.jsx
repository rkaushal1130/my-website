import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqData } from '../../data/faq';
import Container from '../common/Container';
import Badge from '../common/Badge';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(2); // Start with item 2 ("Do you work with startups?") open

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 lg:py-32 relative bg-[#0B0B0B]/40 border-y border-[#1D1D1D]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial-glow opacity-80 pointer-events-none" />

      <Container size="compact">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3.5">
          <Badge icon={HelpCircle}>FAQ</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Questions? We've Got Answers.
          </h2>

          <p className="text-base text-[#A7A7A7] font-normal">
            Everything you need to know about partnering with NeverquiT AI.
          </p>
        </div>

        {/* Accordion List with Hover & Click Smooth Expansion */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setOpenIndex(idx)}
                className={`rounded-2xl bg-[#101010] border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_30px_rgba(255,31,38,0.18)]'
                    : 'border-[#242424] hover:border-[#333333]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Small 3D Red Sphere Indicator */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#FF1F26] shadow-[0_0_14px_#FF1F26] scale-110'
                            : 'bg-[#FF1F26]/40 border border-[#FF1F26]/60'
                        }`}
                      />
                    </div>

                    <span className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Circular Plus/Minus Toggle Badge */}
                  <div className={`w-8 h-8 rounded-full bg-[#050505] border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'border-[#FF1F26] text-[#FF1F26] rotate-180 shadow-[0_0_12px_rgba(255,31,38,0.35)]' : 'border-[#242424] text-[#A7A7A7]'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#FF1F26]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#FF1F26]" />
                    )}
                  </div>
                </button>

                {/* Ultra-Smooth CSS Grid Height Expansion */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#A7A7A7] leading-relaxed border-t border-[#1D1D1D] pl-12 font-normal">
                      {faq.answer}
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

export default FAQ;
