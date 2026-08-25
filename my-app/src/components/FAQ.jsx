import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What services does neverquit.ai provide?',
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#252525] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF1F26]" />
            FAQ
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Questions? We've Got Answers.
          </h2>

          <p className="text-base text-[#A8A8A8] font-normal">
            Everything you need to know about partnering with neverquit.ai.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-[#111111] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#FF1F26]/70 shadow-[0_4px_25px_rgba(255,31,38,0.15)]'
                    : 'border-[#252525] hover:border-[#333333]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>

                  <div className={`w-8 h-8 rounded-full bg-[#050505] border flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'border-[#FF1F26] text-[#FF1F26]' : 'border-[#252525] text-[#A8A8A8]'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#FF1F26]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#FF1F26]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#A8A8A8] leading-relaxed border-t border-[#1C1C1C] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default FAQ;
