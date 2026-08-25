import React from 'react';
import { BookOpen, Cpu, Sparkles, HeartHandshake } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const CareerBenefits = () => {
  const benefits = [
    {
      title: 'Learn & Grow',
      description: 'Work alongside world-class AI engineers and researchers solving high-impact enterprise challenges.',
      icon: BookOpen,
    },
    {
      title: 'Build With AI',
      description: 'Hands-on access to dedicated high-end GPU clusters, frontier LLM models, and cutting-edge neural toolchains.',
      icon: Cpu,
    },
    {
      title: 'Make an Impact',
      description: 'Your models and architectures will directly power mission-critical software used across global enterprises.',
      icon: Sparkles,
    },
    {
      title: 'Great People',
      description: 'Join a collaborative, humble, and fiercely ambitious team that values curiosity and relentless engineering rigor.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-[#0B0B0B]/40 border-y border-[#1D1D1D]">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>WHY JOIN US</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Why Join NeverQuit
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            We provide the frontier compute, autonomy, and support you need to do the best work of your career.
          </p>
        </div>

        {/* 4 Clean Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-7 rounded-[22px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="h-28 w-full rounded-xl bg-[#050505] border border-[#1D1D1D] mb-5 overflow-hidden flex items-center justify-center relative group-hover:border-[#FF1F26]/40 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1D1D1D] flex items-center justify-between text-xs font-mono text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                  <span>Advantage 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default CareerBenefits;
