import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import AboutHero from '../components/about/AboutHero';
import WhatWeDo from '../components/about/WhatWeDo';
import WhyChooseUs from '../components/about/WhyChooseUs';
import AboutStats from '../components/about/AboutStats';
import AboutCTA from '../components/about/AboutCTA';

const About = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="About NeverquiT AI — Building Intelligent AI Solutions"
      description="Learn about NeverquiT AI, our mission, vision, and how we engineer enterprise-grade artificial intelligence."
    >
      <AboutHero />
      <WhatWeDo />
      <WhyChooseUs />
      <AboutStats />
      <AboutCTA onOpenDemo={onOpenDemo} />
    </PageWrapper>
  );
};

export default About;
