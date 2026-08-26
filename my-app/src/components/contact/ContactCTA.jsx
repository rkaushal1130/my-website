import React from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ContactCTA = ({ onOpenDemo }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <Container size="wide">
        
        {/* Large Rounded CTA Card */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-[#101010] to-[#080808] border border-[#242424] p-8 sm:p-12 md:p-14 lg:p-16 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-center space-y-6 hover:border-[#FF1F26]/35 transition-all duration-400">
          
          {/* Background Ambient Red Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1F26]/8 rounded-full blur-[100px] pointer-events-none" />

          {/* Ambient Glowing Rings */}
          <div className="absolute right-[-60px] sm:right-0 lg:right-16 top-1/2 -translate-y-1/2 w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] opacity-25 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-[#FF1F26]/30 animate-spin-slow" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-[#FF1F26]/50 animate-pulse" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <Badge icon={Sparkles} className="mx-auto">NEXT STEPS</Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-tight">
              Have An Idea? <br />
              Let's Make It{' '}
              <span className="text-[#FF1F26] drop-shadow-[0_0_20px_rgba(255,31,38,0.35)]">
                Real.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#A7A7A7] max-w-xl mx-auto font-normal leading-relaxed">
              Your next intelligent solution could start with a conversation.
            </p>

            {/* Buttons Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={onOpenDemo}
                variant="primary"
                size="lg"
              >
                Book a Demo
              </Button>

              <Button
                onClick={handleScrollToTop}
                variant="secondary"
                size="lg"
                icon={false}
                customIcon={<MessageSquare className="w-4 h-4 text-[#FF1F26]" />}
              >
                Talk to Our Team
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#737373] font-mono border-t border-[#1D1D1D] max-w-lg mx-auto">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
                CONFIDENTIAL NDA READY
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FF1F26]" />
                1 BUSINESS DAY RESPONSE
              </span>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default ContactCTA;
