import React from 'react';
import Container from '../common/Container';
import Badge from '../common/Badge';

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-[#171717]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-radial-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF1F26]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-7">
          
          <Badge>CONTACT US</Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-bold text-white tracking-tight leading-[1.08] sm:leading-[1.06]">
            Let's Build Something{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Intelligent
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[#A7A7A7] leading-relaxed max-w-2xl font-normal mx-auto">
            Have an idea, project or business challenge? Connect directly with our AI architects to explore how intelligent systems can transform your operations.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
