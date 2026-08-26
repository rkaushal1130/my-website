import React, { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import CareerHero from '../components/careers/CareerHero';
import CareerBenefits from '../components/careers/CareerBenefits';
import CareerApplyForm from '../components/careers/CareerApplyForm';
import CareerTimeline from '../components/careers/CareerTimeline';
import CareerStats from '../components/careers/CareerStats';
import CareerCTA from '../components/careers/CareerCTA';
import ApplicationModal from '../components/careers/ApplicationModal';

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = (job) => {
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input[name="name"]');
      if (input) setTimeout(() => input.focus(), 400);
    } else {
      setSelectedJob(job);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <PageWrapper
      title="Careers at NeverquiT AI — Build The Future of AI"
      description="Join NeverquiT AI and build the next generation of enterprise AI technology. Send your application for engineering, design, product, and business roles."
    >
      <CareerHero onApplyClick={handleApply} />
      <CareerBenefits />
      <CareerApplyForm />
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
