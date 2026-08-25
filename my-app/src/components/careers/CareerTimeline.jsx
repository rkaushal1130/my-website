import React from 'react';
import { BookOpen, Hammer, TrendingUp, Award } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const CareerTimeline = () => {
  const steps = [
    {
      stage: '01',
      title: 'Learn',
      description: 'Immerse in our AI research papers, model architectures, and distributed systems workflows.',
      icon: BookOpen,
    },
    {
      stage: '02',
      title: 'Build',
      description: 'Ship high-throughput models, autonomous swarms, and scalable microservices into live client production.',
      icon: Hammer,
    },
    {
      stage: '03',
      title: 'Grow',
      description: 'Expand your technical horizon with mentorship, leadership tracks, and dedicated research time.',
      icon: TrendingUp,
    },
    {
      stage: '04',
      title: 'Lead',
      description: 'Own foundational research directions, architect breakthrough products, and mentor emerging talent.',
      icon: Award,
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-[#0B0B0B]/40 border-y border-[#1D1D1D] overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3.5">
          <Badge>CAREER EVOLUTION</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Learn → Build → Grow → Lead
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            A clear, meritocratic trajectory designed to help you master frontier AI engineering.
          </p>
        </div>

        {/* 3D Horizontal Timeline Container */}
        <div className="relative">
          
          {/* Glowing Red Connecting Vector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F26]/70 to-transparent shadow-[0_0_15px_#FF1F26] z-0" />

          {/* 4 Connected Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-7 sm:p-8 rounded-[20px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-6">
                    {/* Glowing 3D Node Sphere */}
                    <div className="relative">
                      <div className="absolute -inset-1.5 rounded-full bg-[#FF1F26] blur-sm opacity-0 group-hover:opacity-60 transition-opacity" />
                      <div className="w-10 h-10 rounded-full bg-[#050505] border-2 border-[#FF1F26] flex items-center justify-center text-xs font-mono font-bold text-[#FF1F26] shadow-[0_0_15px_rgba(255,31,38,0.4)]">
                        {item.stage}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[#050505] border border-[#242424] flex items-center justify-center text-[#FF1F26]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#242424] text-xs font-mono text-[#737373]">
                    Trajectory Stage 0{idx + 1}
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

export default CareerTimeline;
