import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import ProjectsSection from '../components/home/ProjectsSection';
import AboutPreview from '../components/home/AboutPreview';
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
      title="NeverquiT.ai — AI That Works As Hard As You Do"
      description="NeverquiT.ai builds intelligent AI solutions that help businesses automate, innovate and scale."
    >
      <Hero
        onExploreClick={handleExplore}
        onWatchVideo={() => setVideoOpen(true)}
      />
      <FeatureStrip />
      <ProjectsSection />
      <AboutPreview />
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
