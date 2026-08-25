import React, { useState } from 'react';
import { jobListings } from '../../data/jobs';
import Container from '../common/Container';
import Badge from '../common/Badge';
import JobFilters from './JobFilters';
import JobCard from './JobCard';

const OpenPositions = ({ onApplyJob }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Engineering', 'Design', 'Business', 'Marketing'];

  const filteredJobs = activeCategory === 'All'
    ? jobListings
    : jobListings.filter((job) => job.department === activeCategory);

  return (
    <section id="positions" className="py-24 lg:py-32 relative scroll-mt-20">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
          <Badge>JOIN THE SQUAD</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Open Positions
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed font-normal">
            Explore our available roles across engineering, product, design, and growth.
          </p>
        </div>

        {/* Filters */}
        <JobFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={onApplyJob}
            />
          ))}
        </div>

      </Container>
    </section>
  );
};

export default OpenPositions;
