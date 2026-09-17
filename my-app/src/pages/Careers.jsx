import React, { useState, useEffect, useCallback } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import CareersHero from '../components/careers/CareersHero';
import CareersWhyWork from '../components/careers/CareersWhyWork';
import CareersHiringProcess from '../components/careers/CareersHiringProcess';
import CareersTestimonials from '../components/careers/CareersTestimonials';
import ApplicationModal from '../components/careers/ApplicationModal';

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = useCallback((job) => {
    setSelectedJob(job || { title: 'Open Application', department: 'Technology & Engineering' });
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedJob(null);
  }, []);

  // Global event listener to guarantee button click always opens modal
  useEffect(() => {
    const handleEventOpen = (e) => {
      handleApply(e?.detail?.job);
    };
    window.addEventListener('open-apply-modal', handleEventOpen);
    return () => window.removeEventListener('open-apply-modal', handleEventOpen);
  }, [handleApply]);

  return (
    <PageWrapper
      title="Careers at Avauraa — Build Your Future With Us"
      description="Join Avauraa and build the future of technology. Explore our culture, hiring process, and opportunities."
      canonicalUrl="/careers"
    >
      {/* 1. Hero Section with Apply Now button */}
      <CareersHero
        onApplyNow={() => handleApply({ title: 'Open Application', department: 'Technology & Engineering' })}
        onApplyClick={() => handleApply({ title: 'Open Application', department: 'Technology & Engineering' })}
      />

      {/* 2. Why Work With Us? */}
      <CareersWhyWork />

      {/* 3. Our Hiring Process */}
      <CareersHiringProcess />

      {/* 4. Voices From Our Team Testimonials */}
      <CareersTestimonials />

      {/* Interactive Application Modal Form */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />
    </PageWrapper>
  );
};

export default Careers;
