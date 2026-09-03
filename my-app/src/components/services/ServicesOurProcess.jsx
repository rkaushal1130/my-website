import React from 'react';
import {
  Search,
  ClipboardList,
  Palette,
  Monitor,
  ShieldCheck,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    icon: Search,
    description: 'We understand your requirements and business goals.',
  },
  {
    number: '02',
    title: 'Plan',
    icon: ClipboardList,
    description: 'We plan project strategy, timeline and set the right roadmap.',
  },
  {
    number: '03',
    title: 'Design',
    icon: Palette,
    description: 'We design modern, clean and user-friendly interfaces.',
  },
  {
    number: '04',
    title: 'Develop',
    icon: Monitor,
    description: 'We build fast, secure and scalable solutions.',
  },
  {
    number: '05',
    title: 'Test',
    icon: ShieldCheck,
    description: 'We test everything carefully to deliver a perfect product.',
  },
  {
    number: '06',
    title: 'Launch',
    icon: Rocket,
    description: 'We launch final product and provide ongoing support.',
  },
];

const ServicesOurProcess = () => {
  return (
    <section id="our-process" className="py-24 sm:py-32 relative overflow-hidden bg-[#030303] text-white">
      {/* Ambient background glow & fine grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-radial-hero opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-[#FF1F26]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24 space-y-3.5">
          <Badge>OUR DEVELOPMENT PROCESS</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            How We Work
          </h2>
        </div>

        {/* Process Flow - Desktop Linear Flow with Connecting Arrows */}
        <div className="hidden xl:flex items-start justify-between relative max-w-[1440px] mx-auto px-4">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <React.Fragment key={step.number}>
                {/* Step Item */}
                <div className="flex-1 flex flex-col items-center text-center px-3 group">
                  {/* Circular Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-[#09090D] border border-[#202026] group-hover:border-[#FF1F26] flex items-center justify-center text-white group-hover:text-[#FF1F26] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_25px_rgba(255,31,38,0.35)] group-hover:-translate-y-1 mb-6">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Step Number */}
                  <span className="text-sm font-mono font-bold text-[#FF1F26] mb-2 tracking-wider">
                    {step.number}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-white transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#A7A7A7] leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow (Except on Last Item) */}
                {!isLast && (
                  <div className="pt-6 shrink-0 px-2 flex items-center justify-center">
                    <div className="flex items-center text-[#FF1F26] opacity-70 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Process Flow - Tablet Grid (3 Columns x 2 Rows) */}
        <div className="hidden md:grid xl:hidden grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#09090D] border border-[#1E1E24] hover:border-[#FF1F26]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,31,38,0.15)] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#121216] border border-[#26262C] group-hover:border-[#FF1F26] flex items-center justify-center text-white group-hover:text-[#FF1F26] transition-all duration-300 shadow-sm mb-5">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <span className="text-xs font-mono font-bold text-[#FF1F26] mb-1.5 tracking-wider">
                  {step.number}
                </span>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[#A7A7A7] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process Flow - Mobile Vertical Flow */}
        <div className="grid md:hidden grid-cols-1 gap-4 max-w-sm mx-auto">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#09090D] border border-[#1E1E24] hover:border-[#FF1F26]/60 transition-all duration-300 group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#121216] border border-[#26262C] group-hover:border-[#FF1F26] flex items-center justify-center text-white group-hover:text-[#FF1F26] shrink-0 transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#FF1F26]">
                      {step.number}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServicesOurProcess;
