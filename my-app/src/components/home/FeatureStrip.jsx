import React from 'react';
import { Rocket, Brain, BarChart3, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';
import IconBox from '../common/IconBox';

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
      <Container size="wide">
        
        {/* Large Rounded 3D Feature Card */}
        <div className="rounded-[24px] bg-[#101010] border border-[#242424] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          {/* Ambient Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/4 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#242424]">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col space-y-3 group transition-all duration-300 hover:-translate-y-1.5 p-2 rounded-2xl hover:bg-[#151515]/50 ${
                    idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'
                  }`}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <IconBox icon={Icon} size="md" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF1F26] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default FeatureStrip;
