import React from 'react';
import { ShieldCheck, Zap, Cpu, Database, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';

const AboutPreview = () => {
  const pillars = [
    {
      icon: Cpu,
      number: '01',
      title: 'Cognitive Automation',
      description: 'Autonomous multi-agent swarms engineered to handle complex operations and unstructured data.',
    },
    {
      icon: Database,
      number: '02',
      title: 'Vector Infrastructure',
      description: 'Real-time high-throughput retrieval pipelines and domain-specific knowledge embeddings.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Enterprise Security',
      description: 'SOC2 Type II compliance, zero data retention policies, and dedicated VPC isolation.',
    },
    {
      icon: Zap,
      number: '04',
      title: 'Sub-45ms Latency',
      description: 'Ultra-low-latency distributed inference architecture optimized for mission-critical workloads.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#030303]">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF1F26]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <Badge>ABOUT US</Badge>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.12]">
              Building AI Solutions <br />
              That Make an{' '}
              <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                Impact
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
              At NeverquiT AI, we combine technology and creativity to build AI-driven solutions that solve real-world problems and drive business growth.
            </p>

            <p className="text-sm sm:text-base text-[#737373] leading-relaxed font-normal">
              Our multidisciplinary engineering teams engineer dependable cognitive pipelines, specialized model fine-tuning, and scalable enterprise intelligence infrastructure.
            </p>

            <div className="pt-2">
              <Button to="/about" variant="outline" size="md" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column: 4 Clean Pillar Cards without Monospace */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0d] border border-[#222226] hover:border-[#FF1F26]/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#242424] group-hover:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FF1F26] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#A7A7A7] leading-relaxed font-normal">
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

export default AboutPreview;
