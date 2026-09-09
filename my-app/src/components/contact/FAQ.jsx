import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../../data/faq';
import Container from '../common/Container';
import Badge from '../common/Badge';

const FAQ = () => {
  // All closed initially so hovering smoothly opens, and removing cursor smoothly closes
  const [openIndex, setOpenIndex] = useState(-1);

  const handleCardHover = (idx) => {
    setOpenIndex(idx);
  };

  const handleListLeave = () => {
    setOpenIndex(-1);
  };

  const handleClick = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="py-16 lg:py-24 relative bg-[#0A0A0D] border-y border-[#17171C]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial-glow opacity-60 pointer-events-none" />

      <Container size="narrow" className="flex flex-col items-center px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-3">
          <Badge icon={HelpCircle}>FAQ</Badge>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Questions? We've Got Answers.
          </h2>

          <p className="text-sm sm:text-base text-[#8E8E98] font-normal">
            Everything you need to know about partnering with Avaura.
          </p>
        </div>

        {/* Accordion List with Silky Smooth Hover & Mouse Leave Collapse */}
        <div
          onMouseLeave={handleListLeave}
          className="w-full max-w-4xl mx-auto space-y-3"
        >
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => handleCardHover(idx)}
                style={{
                  transition: 'border-color 300ms ease, box-shadow 300ms ease',
                }}
                className={`rounded-xl sm:rounded-2xl bg-[#0B0B0E] border overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_24px_rgba(255,31,38,0.22)]'
                    : 'border-[#1C1C22] hover:border-[#2A2A34]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleClick(idx)}
                  className="w-full px-5 sm:px-7 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    {/* Small 3D Red Sphere Indicator */}
                    <div className="relative shrink-0">
                      <div
                        style={{
                          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                          isOpen
                            ? 'bg-[#FF1F26] shadow-[0_0_12px_#FF1F26] scale-110'
                            : 'bg-[#FF1F26]/40 border border-[#FF1F26]/60'
                        }`}
                      />
                    </div>

                    <span
                      style={{
                        transition: 'color 200ms ease',
                      }}
                      className={`text-sm sm:text-base font-semibold leading-snug ${
                        isOpen ? 'text-white' : 'text-white/90 group-hover:text-white'
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
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#08080A] border flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'border-[#FF1F26] text-[#FF1F26] rotate-180 shadow-[0_0_10px_rgba(255,31,38,0.35)]'
                        : 'border-[#1C1C22] text-[#8E8E98] group-hover:border-[#FF1F26]/40 rotate-0'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#FF1F26]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#FF1F26]" />
                    )}
                  </div>
                </button>

                {/* Buttery-Smooth Hardware-Accelerated Expansion & Collapse */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05, ease: 'easeOut' },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15, ease: 'easeIn' },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-4 pt-2.5 text-xs sm:text-sm text-[#9494A0] leading-relaxed border-t border-[#1A1A20] pl-10 sm:pl-11 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default FAQ;
