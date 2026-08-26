import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import IntegrationsSection from '../components/home/IntegrationsSection';
import WhyNeverQuit from '../components/home/WhyNeverQuit';
import HomeCTA from '../components/home/HomeCTA';
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
      title="NeverquiT AI — AI That Works As Hard As You Do"
      description="NeverquiT AI builds intelligent AI solutions that help businesses automate, innovate and scale."
    >
      <Hero
        onExploreClick={handleExplore}
        onOpenDemo={onOpenDemo}
        onWatchVideo={() => setVideoOpen(true)}
      />
      <FeatureStrip />
      <IntegrationsSection />
      <WhyNeverQuit />
      <HomeCTA onOpenDemo={onOpenDemo} />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </PageWrapper>
  );
};

export default Home;
