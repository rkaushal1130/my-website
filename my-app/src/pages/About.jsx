import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import AboutHero from '../components/about/AboutHero';
import MissionVision from '../components/about/MissionVision';
import WhatWeDo from '../components/about/WhatWeDo';
import WhyChooseUs from '../components/about/WhyChooseUs';
import AboutStats from '../components/about/AboutStats';
import AboutCTA from '../components/about/AboutCTA';

const About = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="About NeverquiT.ai — Building Intelligent AI Solutions"
      description="Learn about NeverquiT.ai, our mission, vision, and how we engineer enterprise-grade artificial intelligence."
    >
      <AboutHero />
      <MissionVision />
      <WhatWeDo />
      <WhyChooseUs />
      <AboutStats />
      <AboutCTA onOpenDemo={onOpenDemo} />
    </PageWrapper>
  );
};

export default About;
