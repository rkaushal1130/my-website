import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import AboutHero from '../components/about/AboutHero';
import WhatWeDo from '../components/about/WhatWeDo';
import WhyChooseUs from '../components/about/WhyChooseUs';

const About = () => {
  return (
    <PageWrapper
      title="About Avaura — Building Intelligent AI Solutions"
      description="Learn about Avaura, our mission, vision, and how we engineer enterprise-grade artificial intelligence."
    >
      <AboutHero />
      <WhatWeDo />
      <WhyChooseUs />
    </PageWrapper>
  );
};

export default About;
