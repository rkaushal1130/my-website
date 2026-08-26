import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import { serviceFAQs } from '../../data/servicesData';

const ServicesFAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Badge icon={HelpCircle}>FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Service & Delivery Insights
          </h2>
        </div>

        <div className="space-y-4 text-left">
          {serviceFAQs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setOpenIdx(idx)}
                className={`rounded-2xl bg-[#0A0A0D] border overflow-hidden transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_30px_rgba(255,31,38,0.18)]'
                    : 'border-[#222226] hover:border-[#333338]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#141418] border border-[#26262B] flex items-center justify-center text-[#FF1F26] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#FF1F26] text-white shadow-[0_0_12px_rgba(255,31,38,0.35)]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Expanding Accordion Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-3 text-sm sm:text-base text-[#A7A7A7] leading-relaxed border-t border-[#18181E] font-normal">
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

export default ServicesFAQ;
