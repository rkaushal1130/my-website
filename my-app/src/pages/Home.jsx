import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import IntegrationsSection from '../components/home/IntegrationsSection';
import WhyNeverQuit from '../components/home/WhyNeverQuit';
import VideoModal from '../components/common/VideoModal';

const Home = ({ onOpenDemo }) => {
  const [videoOpen, setVideoOpen] = useState(false);

  const handleExplore = () => {
    const el = document.getElementById('why-choose-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageWrapper
      title="Avaura — AI That Works As Hard As You Do"
      description="Avaura builds intelligent AI solutions that help businesses automate, innovate and scale."
    >
      <Hero
        onExploreClick={handleExplore}
        onOpenDemo={onOpenDemo}
        onWatchVideo={() => setVideoOpen(true)}
      />
      <IntegrationsSection />
      <WhyNeverQuit />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </PageWrapper>
  );
};

export default Home;
