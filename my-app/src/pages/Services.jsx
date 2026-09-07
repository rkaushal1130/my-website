import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ServicesHero from '../components/services/ServicesHero';
import ServicesOurProcess from '../components/services/ServicesOurProcess';
import ServicesFAQ from '../components/services/ServicesFAQ';

const Services = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="Services — Avaura Enterprise AI Solutions"
      description="Explore our specialized AI services: Autonomous Agents, Custom LLM Tuning, Intelligent Automation, and Secure Private AI Infrastructure."
    >
      <ServicesHero onOpenDemo={onOpenDemo} />
      <ServicesOurProcess />
      <ServicesFAQ />
    </PageWrapper>
  );
};

export default Services;
