import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Zap, Target } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import IconBox from '../common/IconBox';

const WhyChooseUs = () => {
  const pillars = [
    {
      title: 'Innovation',
      description: 'Pushing the boundary with state-of-the-art multimodal models and agentic architectures.',
      icon: Sparkles,
    },
    {
      title: 'Scalability',
      description: 'Distributed infrastructure built to handle millions of queries without degradation.',
      icon: TrendingUp,
    },
    {
      title: 'Security',
      description: 'Enterprise-grade encryption, SOC2 readiness, and zero-compromise privacy safeguards.',
      icon: ShieldCheck,
    },
    {
      title: 'Reliability',
      description: '99.98% guaranteed uptime backed by proactive neural health monitoring.',
      icon: Zap,
    },
    {
      title: 'Business Impact',
      description: 'Measurable ROI from day one through automated efficiencies and unlocked revenue.',
      icon: Target,
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>THE NEVERQUIT AI ADVANTAGE</Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Why Choose Us
          </h2>

          <p className="text-sm sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Our technological pillars ensure your enterprise AI initiatives succeed on time and on budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/55 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <IconBox icon={Icon} size="sm" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A7A7A7] leading-relaxed">
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

export default WhyChooseUs;
