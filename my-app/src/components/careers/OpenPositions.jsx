import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import JobFilters from './JobFilters';
import JobCard from './JobCard';
import { careerService } from '../../services';
import { Briefcase } from 'lucide-react';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

const OpenPositions = ({ onApply }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const categories = ['All', 'Engineering', 'Research', 'Design', 'Product', 'Business'];

  const loadJobs = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const params = {};
      if (activeCategory !== 'All') {
        params.department = activeCategory;
      }
      const response = await careerService.getJobs(params);
      const apiJobs = response?.data?.items || response?.data || [];
      setJobs(apiJobs);
    } catch (err) {
      console.error('Failed to load jobs:', err);
      setErrorMessage(
        err.message || 'Unable to fetch open positions from the server. Please try again.'
      );
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [activeCategory]);

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
            Explore our available roles across engineering, research, product, and growth.
          </p>
        </div>

        {/* Filters */}
        <JobFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 1. Loading State */}
        {isLoading && (
          <Loader
            text="Fetching active openings from API..."
            size="lg"
            skeletonCount={2}
          />
        )}

        {/* 2. Error State */}
        {!isLoading && errorMessage && (
          <ErrorMessage
            title="Unable to Load Positions"
            message={errorMessage}
            onRetry={loadJobs}
          />
        )}

        {/* 3. Empty State */}
        {!isLoading && !errorMessage && jobs.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No Openings Found"
            description={
              activeCategory !== 'All'
                ? `We don't have open positions in ${activeCategory} right now.`
                : 'No open positions available at this time. Check back soon!'
            }
            actionLabel={activeCategory !== 'All' ? 'View All Positions' : undefined}
            onAction={activeCategory !== 'All' ? () => setActiveCategory('All') : undefined}
          />
        )}

        {/* 4. Success State (Jobs Grid) */}
        {!isLoading && !errorMessage && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 animate-in fade-in duration-300">
            {jobs.map((job) => (
              <JobCard
                key={job.id || job.slug}
                job={job}
                onApply={onApply}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default OpenPositions;
