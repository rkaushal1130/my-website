import React from 'react';
import { Rocket, Users, Lightbulb, Heart, Star } from 'lucide-react';
import Container from '../common/Container';

const benefits = [
  {
    icon: Rocket,
    title: 'Growth Opportunities',
    description: 'Learn, explore and grow your career with continuous support.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work with passionate and supportive teammates.',
  },
  {
    icon: Lightbulb,
    title: 'Meaningful Work',
    description: 'Be part of projects that create real impact.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible work options and a healthy work environment.',
  },
  {
    icon: Star,
    title: 'Recognition',
    description: 'Your efforts and ideas always matter.',
  },
];

const CareersWhyWork = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#141416] border-y border-[#222226]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-radial-glow opacity-40 pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            Why Work With Us?
          </h2>
          <p className="text-base sm:text-lg text-[#A7A7A7] font-normal leading-relaxed">
            We believe happy teams build extraordinary products.
          </p>
        </div>

        {/* 5 Benefit Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-6 text-center">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D0D10] border border-[#222226] p-6 sm:p-7 hover:border-[#FF1F26]/50 transition-all duration-300 flex flex-col items-center group shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
              >
                {/* Circular Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#18181D] border border-[#26262B] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] mb-5 shadow-[0_0_15px_rgba(255,31,38,0.15)] group-hover:shadow-[0_0_20px_rgba(255,31,38,0.35)] transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CareersWhyWork;
