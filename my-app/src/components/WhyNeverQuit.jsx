import React from 'react';
import { Server, Cpu, ShieldCheck, Target } from 'lucide-react';

const WhyNeverQuit = () => {
  const reasons = [
    {
      number: '01',
      title: 'Built for Scale',
      description: 'AI solutions designed to grow with your business.',
      icon: Server,
    },
    {
      number: '02',
      title: 'Intelligent by Design',
      description: 'Technology focused on solving real business problems.',
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Secure by Default',
      description: 'Reliable architecture with security at its core.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Business Focused',
      description: 'Technology that delivers measurable business value.',
      icon: Target,
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-[#0B0B0B]/40 border-y border-[#1C1C1C]">
      
      {/* Background Subtle Red Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010] border border-[#242424] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
            THE NEVERQUIT ADVANTAGE
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Why Businesses Choose NeverQuit
          </h2>

          <p className="text-base sm:text-lg text-[#A8A8A8] leading-relaxed font-normal">
            We engineer uncompromising AI architecture tailored to deliver immediate, measurable enterprise ROI.
          </p>
        </div>

        {/* 4 Horizontal Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 sm:p-8 rounded-[20px] bg-[#101010] border border-[#252525] hover:border-[#FF1F26]/60 transition-all duration-400 hover:shadow-[0_10px_35px_-10px_rgba(255,31,38,0.2)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Large Red Number */}
                    <span className="text-3xl font-extrabold text-[#FF1F26] font-mono tracking-tight group-hover:drop-shadow-[0_0_10px_rgba(255,31,38,0.5)] transition-all">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A8A8A8] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#242424] flex items-center gap-2 text-xs font-mono text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default WhyNeverQuit;
