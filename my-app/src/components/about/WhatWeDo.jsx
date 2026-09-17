import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const WhatWeDo = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const steps = [
    {
      id: 'web-development',
      title: 'Web Development',
      description:
        'We build modern, responsive, and high-performance websites designed to turn ideas into engaging digital experiences. From sleek corporate websites to powerful web applications, we create scalable solutions tailored to your business needs.',
    },
    {
      id: 'software-development',
      title: 'Software Development',
      description:
        'We develop reliable, scalable, and user-focused software solutions that streamline operations and solve real business challenges. From custom applications to enterprise platforms, we build secure and high-performance software tailored to your goals.',
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      description:
        'We create intuitive, high-performance mobile apps that deliver seamless experiences across iOS and Android. From concept to launch, we build secure, scalable, and user-friendly apps tailored to your business goals.',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description:
        'We create result-driven digital marketing strategies that strengthen your brand, reach the right audience, and drive meaningful growth. From social media and SEO to performance campaigns, we turn digital presence into measurable business results.',
    },
    {
      id: 'deck-development',
      title: 'Deck Development',
      description:
        'Create professional, visually engaging presentations that communicate your ideas, services, and business story clearly. We design well-structured decks with compelling content, modern layouts, and consistent branding.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-[#08080B] border-y border-[#16161D] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#FF1F26]/5 rounded-full blur-[170px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3.5">
          <div className="flex justify-center">
            <Badge icon={Sparkles}>OUR WORKFLOW</Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            What We <span className="text-[#FF1F26] text-glow inline-block">Do</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8E8E9A] leading-relaxed font-normal max-w-xl mx-auto">
            Explore how Avaura empowers businesses through modern web, scalable software, intuitive mobile apps, digital marketing, and impactful deck development.
          </p>
        </div>

        {/* Process Flow: Clean Connected Timeline without Boxes */}
        <div className="max-w-3xl mx-auto relative pl-3 sm:pl-6">
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute left-[17px] sm:left-[23px] top-[28px] bottom-[28px] w-[2px] bg-[#1E1E28]" />

          {/* Active Highlight Red Line following activeIdx smoothly */}
          <div
            style={{
              height: `calc((100% - 56px) * ${(activeIdx / (steps.length - 1))})`,
              transition: 'height 180ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute left-[17px] sm:left-[23px] top-[28px] w-[2px] bg-gradient-to-b from-[#FF1F26] via-[#FF3030] to-[#FF1F26] shadow-[0_0_10px_#FF1F26]"
          />

          {/* Step Items */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className="relative flex items-start gap-4 sm:gap-6 py-2 cursor-pointer select-none group"
                >
                  {/* Small Refined Timeline Bullet */}
                  <div className="relative z-10 shrink-0 flex items-center justify-center w-5 h-5 mt-1">
                    <div
                      className={`rounded-full transition-all duration-200 ${
                        isActive
                          ? 'w-2.5 h-2.5 bg-[#FF1F26] ring-4 ring-[#FF1F26]/25 shadow-[0_0_10px_#FF1F26]'
                          : 'w-2 h-2 bg-[#363646] group-hover:bg-[#FF1F26]/70 group-hover:ring-2 group-hover:ring-[#FF1F26]/20'
                      }`}
                    />
                  </div>

                  {/* Step Details - Clean Text (No Box) */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h3
                      className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-150 ${
                        isActive ? 'text-white text-glow' : 'text-[#CCCCCC] group-hover:text-white'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed transition-colors duration-150 font-normal ${
                        isActive ? 'text-[#D0D0DE]' : 'text-[#7E7E8E] group-hover:text-[#A6A6B8]'
                      }`}
                    >
                      {item.description}
                    </p>
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

export default WhatWeDo;
