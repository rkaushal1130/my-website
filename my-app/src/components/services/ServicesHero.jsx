import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Bot, Cpu, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ServicesHero = ({ onOpenDemo }) => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-[#030303]">
      {/* Background Radial Glow & Fine Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF1F26]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-7">
          
          <Badge icon={Sparkles}>
            ENTERPRISE AI SERVICES
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-bold text-white tracking-tight leading-[1.06]">
            Architecting The Next Generation of{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Intelligent Systems
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal mx-auto">
            From autonomous multi-agent swarms to custom fine-tuned LLMs and high-throughput inference engines, we build AI solutions designed for measurable enterprise impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button onClick={onOpenDemo} variant="primary" size="lg">
              Book a Consultation
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Talk to an Architect
            </Button>
          </div>

          {/* Service Guarantees */}
          <div className="pt-8 border-t border-[#1D1D1D] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs font-medium text-[#8a8a8a] w-full max-w-3xl">
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-white block">10-Day PoC</span>
              Rapid Prototyping
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-[#FF1F26] block">100% Private</span>
              Zero Data Retention
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-white block">Sub-20ms</span>
              Optimized Latency
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-[#FF1F26] block">99.98%</span>
              Production SLA
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ServicesHero;
