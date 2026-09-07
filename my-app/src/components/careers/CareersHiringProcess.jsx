import React from 'react';
import { FileText, Users, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const steps = [
  {
    number: '1. Apply',
    icon: FileText,
    iconBg: 'bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/30',
    title: '1. Apply',
    description: 'Submit your application in just a few clicks.',
  },
  {
    number: '2. Screening',
    icon: Users,
    iconBg: 'bg-[#00DF8F]/10 text-[#00DF8F] border-[#00DF8F]/30',
    title: '2. Screening',
    description: 'Our team reviews your profile.',
  },
  {
    number: '3. Interview',
    icon: MessageSquare,
    iconBg: 'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/30',
    title: '3. Interview',
    description: 'Technical & HR rounds.',
  },
  {
    number: '4. Offer',
    icon: CheckCircle2,
    iconBg: 'bg-[#7928CA]/10 text-[#A855F7] border-[#7928CA]/30',
    title: '4. Offer',
    description: 'Welcome to Avauraa!',
  },
];

const CareersHiringProcess = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#121214] border-y border-[#222226]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial-glow opacity-30 pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <Badge>OUR HIRING PROCESS</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            A Simple & Transparent Process
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] font-normal leading-relaxed">
            We make hiring simple, fair and candidate-friendly.
          </p>
        </div>

        {/* 4 Process Steps connected by arrows */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Circle Icon */}
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-5 ${step.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-[200px] leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Connecting Arrow for desktop (between items) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-8 -right-4 translate-x-1/2 text-[#3E3E48] pointer-events-none">
                    <ArrowRight className="w-5 h-5 text-[#FF1F26]/70" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CareersHiringProcess;
