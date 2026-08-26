import React from 'react';
import { Server, Cpu, ShieldCheck, Target } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import IconBox from '../common/IconBox';

const WhyNeverQuit = () => {
  const reasons = [
    {
      number: '01',
      title: 'Built for Scale',
      description: 'AI solutions designed to grow seamlessly with your business.',
      icon: Server,
    },
    {
      number: '02',
      title: 'Intelligent by Design',
      description: 'Technology focused on solving real-world business challenges.',
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Secure by Default',
      description: 'Reliable architecture with enterprise security at its core.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Business Focused',
      description: 'Technology tailored to deliver measurable commercial value.',
      icon: Target,
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-transparent overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/4 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3.5">
          <Badge>THE NEVERQUIT AI ADVANTAGE</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Why Businesses Choose NeverquiT AI
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            We engineer uncompromising AI architecture tailored to deliver immediate, measurable enterprise ROI.
          </p>
        </div>

        {/* 3D Horizontal Timeline Container */}
        <div className="relative">
          
          {/* Glowing Red Connecting Timeline Vector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-transparent shadow-[0_0_15px_#FF1F26] z-0" />

          {/* 4 Connected 3D Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-7 sm:p-8 rounded-[20px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/55 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 flex flex-col justify-between"
                >
                  {/* Glowing 3D Timeline Node Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      {/* Outer pulse */}
                      <div className="absolute -inset-1.5 rounded-full bg-[#FF1F26] blur-sm opacity-0 group-hover:opacity-60 transition-opacity" />
                      <div className="w-9 h-9 rounded-full bg-[#050505] border-2 border-[#FF1F26] flex items-center justify-center text-xs font-bold text-[#FF1F26] shadow-[0_0_12px_rgba(255,31,38,0.4)]">
                        {item.number}
                      </div>
                    </div>

                    <IconBox icon={Icon} size="sm" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#242424] flex items-center gap-2 text-xs font-medium text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
                    <span>Production Architecture</span>
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

export default WhyNeverQuit;
