import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PortfolioHero from '../components/portfolio/PortfolioHero';
import PortfolioTechStack from '../components/portfolio/PortfolioTechStack';
import PortfolioCTA from '../components/portfolio/PortfolioCTA';
import Portfolio3DBackground from '../components/portfolio/Portfolio3DBackground';

const Portfolio = ({ onOpenDemo }) => {
  return (
    <PageWrapper
      title="NeverQuit.ai | Portfolio — Full-Stack Technologies"
      description="Explore NeverQuit.ai full-stack JavaScript, Frontend, Backend, Database and Cloud engineering technologies."
      canonicalUrl="/portfolio"
      ogTitle="NeverQuit.ai | Portfolio — Full-Stack Technologies"
      ogDescription="Explore NeverQuit.ai full-stack JavaScript, Frontend, Backend, Database and Cloud engineering technologies."
      ogImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    >
      {/* Lightweight 3D Canvas Ambient Elements */}
      <Portfolio3DBackground />

      {/* 1. Portfolio Hero Banner */}
      <PortfolioHero onOpenDemo={onOpenDemo} />

      {/* 2. Cardless Full-Stack Technology Architecture Showcase */}
      <PortfolioTechStack />

      {/* 3. Final Call-to-Action */}
      <PortfolioCTA onOpenDemo={onOpenDemo} />
    </PageWrapper>
  );
};

export default Portfolio;
