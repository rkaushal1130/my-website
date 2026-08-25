import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesProcess from '../components/services/ServicesProcess';
import ServicesFAQ from '../components/services/ServicesFAQ';
import ServicesCTA from '../components/services/ServicesCTA';

const Services = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="Services — NeverquiT.ai Enterprise AI Solutions"
      description="Explore our specialized AI services: Autonomous Agents, Custom LLM Tuning, Intelligent Automation, and Secure Private AI Infrastructure."
    >
      <ServicesHero onOpenDemo={onOpenDemo} />
      <ServicesGrid onOpenDemo={onOpenDemo} />
      <ServicesProcess />
      <ServicesFAQ />
      <ServicesCTA onOpenDemo={onOpenDemo} />
    </PageWrapper>
  );
};

export default Services;
