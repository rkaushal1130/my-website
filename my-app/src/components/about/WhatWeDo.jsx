import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Cpu, Database, Wrench } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const WhatWeDo = () => {
  const services = [
    {
      id: 'ai-automation',
      title: 'AI Automation',
      description: 'Deploy autonomous software agents to handle complex workflows, back-office operations, and cognitive automation.',
      icon: Bot,
      metric: '90% Time Saved',
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'Custom deep neural networks, predictive models, and specialized LLM fine-tuning tailored for domain-specific accuracy.',
      icon: Cpu,
      metric: 'Custom Tuning',
    },
    {
      id: 'data-intelligence',
      title: 'Data Intelligence',
      description: 'Transform raw data into real-time competitive intelligence with high-throughput streaming pipelines and synthetic data synthesis.',
      icon: Database,
      metric: 'Real-Time Insights',
    },
    {
      id: 'custom-ai',
      title: 'Custom AI',
      description: 'End-to-end bespoke AI engineering, from architectural design to secure on-premise or multi-cloud enterprise deployments.',
      icon: Wrench,
      metric: 'Enterprise Grade',
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-[#0B0B0B]/40 border-y border-[#1D1D1D]">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <Badge>OUR SUITE</Badge>

          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            What We Do
          </h2>

          <p className="text-sm sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Comprehensive artificial intelligence software and deployment services tailored for scale.
          </p>
        </div>

        {/* 4 Cards with Tech Graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-5 sm:p-7 rounded-[22px] bg-[#101010] border border-[#242424] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Visual Icon Node Frame */}
                  <div className="h-36 w-full rounded-xl bg-[#050505] border border-[#1D1D1D] mb-5 overflow-hidden flex flex-col items-center justify-center relative group-hover:border-[#FF1F26]/40 transition-colors">
                    <div className="absolute inset-0 bg-radial-hero opacity-40 pointer-events-none" />
                    <div className="w-14 h-14 rounded-2xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_25px_rgba(255,31,38,0.3)] flex items-center justify-center text-[#FF1F26] transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7 text-[#FF1F26]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#737373] mt-2 group-hover:text-[#A7A7A7] transition-colors">
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#242424]">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF1F26] hover:text-[#FF3030] hover:underline"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default WhatWeDo;
