import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import CareerHero from '../components/careers/CareerHero';
import CareerBenefits from '../components/careers/CareerBenefits';
import CultureSection from '../components/careers/CultureSection';
import CareerTimeline from '../components/careers/CareerTimeline';
import OpenPositions from '../components/careers/OpenPositions';
import CareerStats from '../components/careers/CareerStats';
import CareerCTA from '../components/careers/CareerCTA';
import ApplicationModal from '../components/careers/ApplicationModal';

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <PageWrapper
      title="Careers at NeverquiT.ai — Build The Future of AI"
      description="Join NeverquiT.ai and build the next generation of enterprise AI technology. View open engineering, design, product, and business roles."
    >
      <CareerHero onApplyClick={handleApply} />
      <CareerBenefits />
      <CultureSection />
      <OpenPositions onApply={handleApply} />
      <CareerTimeline />
      <CareerStats />
      <CareerCTA onOpenApplication={handleApply} />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />
    </PageWrapper>
  );
};

export default Careers;
