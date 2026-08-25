import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqData } from '../../data/faq';
import Container from '../common/Container';
import Badge from '../common/Badge';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

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
            Everything you need to know about partnering with neverquit.ai.
          </p>
        </div>

        {/* Accordion List with 3D Sphere Badges */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-[#101010] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_25px_rgba(255,31,38,0.18)]'
                    : 'border-[#242424] hover:border-[#333333]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Small 3D Red Sphere Indicator */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#FF1F26] shadow-[0_0_12px_#FF1F26] scale-110'
                            : 'bg-[#FF1F26]/40 border border-[#FF1F26]/60'
                        }`}
                      />
                    </div>

                    <span className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-[#050505] border flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'border-[#FF1F26] text-[#FF1F26]' : 'border-[#242424] text-[#A7A7A7]'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#FF1F26]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#FF1F26]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#A7A7A7] leading-relaxed border-t border-[#1D1D1D] animate-in fade-in duration-200 pl-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default FAQ;
