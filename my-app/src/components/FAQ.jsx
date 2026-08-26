import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(2); // Start with item 2 ("Do you work with startups?") open or 0

  const faqs = [
    {
      question: 'What services does NeverquiT AI provide?',
      answer: 'We provide AI automation, machine learning, data intelligence, custom AI development and AI consulting solutions.',
    },
    {
      question: 'How do I start an AI project with you?',
      answer: 'Send us your requirements through the contact form and our team will discuss your goals, requirements and possible solutions.',
    },
    {
      question: 'Do you work with startups?',
      answer: 'Yes. We work with startups, growing businesses and established organizations.',
    },
    {
      question: 'Can you build a custom AI solution?',
      answer: 'Yes. Our solutions can be designed around your specific business workflow, data and requirements.',
    },
    {
      question: 'How quickly will your team respond?',
      answer: 'We generally respond to new inquiries within one business day.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-20 sm:py-28 relative bg-[#0B0B0B]/40 border-y border-[#1C1C1C]">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial-glow opacity-80 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>FAQ</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Questions? We've Got Answers.
          </h2>

          <p className="text-base text-[#A8A8A8] font-normal">
            Everything you need to know about partnering with NeverquiT AI.
          </p>
        </div>

        {/* Accordion List with Smooth Height Transition */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setOpenIndex(idx)}
                className={`rounded-2xl bg-[#0e0e11] border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_30px_rgba(255,31,38,0.18)]'
                    : 'border-[#222226] hover:border-[#333338]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none transition-colors"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Glowing Red Status Dot */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#FF1F26] shadow-[0_0_14px_#FF1F26]'
                          : 'bg-[#FF1F26]/30 border border-[#FF1F26]/40'
                      }`}
                    />
                    <span className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Circular Plus/Minus Toggle Badge */}
                  <div
                    className={`w-8 h-8 rounded-full bg-[#050505] border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#FF1F26] text-[#FF1F26] rotate-180 shadow-[0_0_12px_rgba(255,31,38,0.35)]'
                        : 'border-[#252525] text-[#FF1F26]'
                    }`}
                  >
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
                    <div className="px-5 sm:px-6 pb-6 pt-3 text-sm sm:text-base text-[#A8A8A8] leading-relaxed border-t border-[#1C1C22] font-normal">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default FAQ;
