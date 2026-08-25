import React from 'react';
import { Rocket, Brain, BarChart3, ShieldCheck } from 'lucide-react';

const FeatureStrip = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Smart Automation',
      description: 'Automate repetitive tasks and boost productivity.',
    },
    {
      icon: Brain,
      title: 'Intelligent Solutions',
      description: 'AI-powered solutions tailored to your business needs.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Growth',
      description: 'Turn data into insights and make smarter decisions.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security you can trust.',
    },
  ];

  return (
    <section className="relative z-20 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Rounded Feature Card */}
        <div className="rounded-[24px] bg-[#101010] border border-[#252525] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          {/* Subtle Red Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#252525]">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col space-y-3 group ${
                    idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'
                  }`}
                >
                  {/* Red Line Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26]/60 flex items-center justify-center text-[#FF1F26] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,31,38,0.3)]">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A8A8A8] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeatureStrip;
