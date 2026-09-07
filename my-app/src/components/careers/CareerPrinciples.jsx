import React from 'react';
import { Heart, Rocket, Leaf } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const principles = [
  {
    icon: Heart,
    iconColor: 'text-[#FF1F26]',
    title: 'Start with the Customer',
    description:
      'We place our customers at the heart of our work, striving to understand their needs and deliver solutions that make a real difference. Our customer-centric approach drives every decision we make, from initial concept to final delivery, ensuring that we create products and services that truly resonate with our users and solve their most pressing challenges.',
  },
  {
    icon: Rocket,
    iconColor: 'text-[#FF1F26]',
    title: 'Add Value Quickly',
    description:
      'We prioritize delivering meaningful results promptly, maximizing the impact of our efforts. Our agile development process and rapid iteration cycles allow us to bring innovative solutions to market faster, while maintaining the highest quality standards. We believe in the power of quick wins and continuous improvement to drive long-term success.',
  },
  {
    icon: Leaf,
    iconColor: 'text-[#22C55E]',
    title: 'Challenge with Care',
    description:
      "We approach challenges with empathy, ensuring that our solutions are not only effective but also considerate of our customers' perspectives. We believe in pushing boundaries and questioning the status quo, but always with respect for the people we serve. Our thoughtful approach to problem-solving leads to more sustainable and user-friendly outcomes.",
  },
];

const CareerPrinciples = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#141416]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-radial-glow opacity-50 pointer-events-none" />

      <Container className="relative z-10">
        {/* Eyebrow with glowing horizontal lines */}
        <Badge className="mb-4">WHAT DRIVES US</Badge>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white text-center tracking-tight leading-tight">
          Our Operating{' '}
          <span className="text-[#FF1F26] text-glow inline-block">
            Principles
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base md:text-lg text-[#A7A7A7] text-center max-w-2xl mx-auto font-normal">
          Our operating principles guide our projects, decisions, and interactions with each other and customers.
        </p>

        {/* 3 Principles Cards */}
        <div className="mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch text-left">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-[#0D0D10] border border-[#222226] p-6 sm:p-8 hover:border-[#3A3A42] transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className={`w-5 h-5 ${item.iconColor} shrink-0`} />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-normal">
                    {item.description}
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

export default CareerPrinciples;
