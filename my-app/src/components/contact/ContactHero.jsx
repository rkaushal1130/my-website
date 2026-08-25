import React from 'react';
import { MessageSquare, ShieldCheck, Zap, Mail, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-[#030303]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF1F26]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-7">
          
          <Badge>CONTACT US</Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-extrabold text-white tracking-tight leading-[1.06]">
            Let's Build Something{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Intelligent
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal mx-auto">
            Have an idea, project or business challenge? Connect directly with our AI architects to explore how intelligent systems can transform your operations.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-[#8a8a8a]">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-ping" />
              Dedicated Response Under 24h
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1F26]" />
              Confidential NDA Ready
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#0d0d10] border border-[#222] flex items-center gap-2 hover:border-[#FF1F26]/40 transition-colors">
              <Zap className="w-3.5 h-3.5 text-[#FF1F26]" />
              Direct Engineering Access
            </span>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
