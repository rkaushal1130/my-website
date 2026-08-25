import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Cpu, BarChart3, Code2, ArrowRight } from 'lucide-react';

const Solutions = () => {
  const solutionList = [
    {
      title: 'AI Automation',
      description: 'Automate workflows, repetitive processes and everyday business operations.',
      icon: Bot,
    },
    {
      title: 'Machine Learning',
      description: 'Build intelligent systems that learn, adapt and improve over time.',
      icon: Cpu,
    },
    {
      title: 'Data Intelligence',
      description: 'Transform complex data into clear insights and smarter decisions.',
      icon: BarChart3,
    },
    {
      title: 'Custom AI Solutions',
      description: 'Purpose-built AI products designed around your unique business needs.',
      icon: Code2,
    },
  ];

  return (
    <section id="solutions" className="py-20 sm:py-28 relative scroll-mt-20">
      
      {/* Red Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-glow opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010] border border-[#242424] text-xs font-semibold tracking-wider text-[#FF1F26] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
            OUR SOLUTIONS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Intelligence Built For Your Business
          </h2>

          <p className="text-base sm:text-lg text-[#A8A8A8] leading-relaxed font-normal">
            Powerful AI solutions designed to automate operations, unlock insights and accelerate growth.
          </p>
        </div>

        {/* 4 Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {solutionList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 sm:p-8 rounded-2xl bg-[#101010] border border-[#252525] hover:border-[#FF1F26]/60 transition-all duration-400 hover:shadow-[0_12px_40px_-10px_rgba(255,31,38,0.22)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Background red glow accent on hover */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FF1F26]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div>
                  {/* Red Icon */}
                  <div className="w-13 h-13 p-3 rounded-xl bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] mb-6 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                    <Icon className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A8A8A8] leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                    Explore Solution
                  </span>
                  <Link
                    to="/contact"
                    aria-label={`Explore ${item.title}`}
                    className="w-8 h-8 rounded-lg bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] flex items-center justify-center text-[#A8A8A8] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default Solutions;
