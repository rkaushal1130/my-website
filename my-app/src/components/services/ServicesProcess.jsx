import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import { processSteps } from '../../data/servicesData';

const ServicesProcess = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#030303]">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge>HOW WE WORK</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Our Engineering Roadmap
          </h2>

          <p className="text-base text-[#A7A7A7] font-normal leading-relaxed">
            A battle-tested 4-stage deployment methodology designed to de-risk delivery and accelerate time-to-value.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0a0a0d] border border-[#222226] hover:border-[#FF1F26]/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141418] border border-[#26262B] group-hover:border-[#FF1F26] flex items-center justify-center text-sm font-bold text-[#FF1F26] transition-all duration-300 group-hover:scale-110">
                    {step.step}
                  </div>
                  <span className="text-xs text-[#555] font-semibold">STAGE {idx + 1}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FF1F26] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-[#A7A7A7] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default ServicesProcess;
