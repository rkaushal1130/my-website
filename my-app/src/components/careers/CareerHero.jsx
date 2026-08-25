import React from 'react';
import { Send, ArrowRight, Users, Sparkles, Target } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';

const CareerHero = ({ onApplyClick }) => {
  const handleScrollToPositions = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-[#030303]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF1F26]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-7">
          
          <Badge>CAREERS AT NEVERQUIT.AI</Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-extrabold text-white tracking-tight leading-[1.06]">
            Build The{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Future
            </span>{' '}
            With Us
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal mx-auto">
            Join an elite engineering team dedicated to solving high-stakes artificial intelligence challenges. We offer top-tier compensation, massive compute budgets, and radical autonomy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button onClick={handleScrollToPositions} variant="primary" size="lg">
              View Open Positions
            </Button>

            <Button
              onClick={() => onApplyClick && onApplyClick({ title: 'General Application', department: 'Any' })}
              variant="secondary"
              size="lg"
              icon={false}
              customIcon={<Send className="w-4 h-4 text-[#FF1F26]" />}
            >
              Send Your Resume
            </Button>
          </div>

          {/* Highlights (Clean font styling) */}
          <div className="pt-8 border-t border-[#1D1D1D] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs font-medium text-[#8a8a8a] w-full max-w-3xl">
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-white block">Top 1% Tier</span>
              Competitive Compensation
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-[#FF1F26] block">H100 Clusters</span>
              Frontier Compute
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-white block">India / Remote</span>
              Flexible Work
            </div>
            <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#222]">
              <span className="text-base font-bold text-[#FF1F26] block">Full Ownership</span>
              High Autonomy
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CareerHero;
