import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Cpu, BarChart3, Code2, ArrowRight } from 'lucide-react';
import { solutionsData } from '../../data/solutions';
import Container from '../common/Container';
import Badge from '../common/Badge';
import IconBox from '../common/IconBox';

const Solutions = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'bot': return Bot;
      case 'cpu': return Cpu;
      case 'analytics': return BarChart3;
      default: return Code2;
    }
  };

  return (
    <section id="solutions" className="py-24 lg:py-32 relative scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-radial-glow opacity-80 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>OUR SOLUTIONS</Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Intelligence Built For Your Business
          </h2>

          <p className="text-sm sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Powerful AI solutions designed to automate operations, unlock insights and accelerate growth.
          </p>
        </div>

        {/* 4 Solution Cards with 3D Perspective Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 [perspective:1000px]">
          {solutionsData.map((item) => {
            const Icon = getIcon(item.iconType);
            return (
              <Link
                key={item.id}
                to="/contact"
                className="group relative p-6 sm:p-8 rounded-[20px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/55 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:[transform:rotateX(2deg)_rotateY(-2deg)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FF1F26]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    <IconBox icon={Icon} size="md" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal mb-6">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                    Explore Solution
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] flex items-center justify-center text-[#A7A7A7] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default Solutions;
