import React from 'react';
import Container from '../common/Container';
import ProjectCard from './ProjectCard';
import Loader from '../common/Loader';
import { Globe, RefreshCw, AlertTriangle, Layers } from 'lucide-react';
import Button from '../common/Button';

const ProjectGrid = ({
  projects = [],
  isLoading = false,
  error = null,
  onRetry,
  onSelectProject,
}) => {
  return (
    <section id="portfolio-grid" className="py-16 sm:py-20 bg-[#030303] scroll-mt-24 font-sans">
      <Container size="wide">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E0E14] border border-white/[0.08] text-xs font-semibold text-[#FF1F26] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL-STACK PRODUCTION CASE STUDIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Full-Stack <span className="text-[#FF1F26]">Web Projects</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A1A1AA] font-normal max-w-2xl mx-auto">
            Explore live production web architectures with real-world breakdowns of frontend interfaces, backend APIs, and database schemas.
          </p>
        </div>

        {/* 1. LOADING STATE */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader text="Loading Full-Stack Projects..." />
          </div>
        ) : error ? (
          /* 2. ERROR STATE */
          <div className="py-16 px-6 text-center flex flex-col items-center justify-center max-w-lg mx-auto rounded-2xl bg-[#0F0A0A] border border-[#FF1F26]/30 shadow-[0_10px_35px_rgba(255,31,38,0.15)] animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center justify-center text-[#FF1F26] mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Failed to Retrieve Projects</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6 leading-relaxed">
              {error || 'Unable to connect to the backend Projects API at this moment.'}
            </p>
            {onRetry && (
              <Button onClick={onRetry} variant="primary" size="sm" icon={false}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                <span>Retry Request</span>
              </Button>
            )}
          </div>
        ) : projects.length === 0 ? (
          /* 3. EMPTY STATE */
          <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto p-8 rounded-2xl bg-[#09090D] border border-white/[0.08] animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/30 flex items-center justify-center text-[#FF1F26] mb-4">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Projects Available</h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6 leading-relaxed">
              No published projects are currently available in the system catalog.
            </p>
          </div>
        ) : (
          /* 4. SUCCESS STATE (Responsive Grid) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id || project.slug}
                project={project}
                index={idx}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}

      </Container>
    </section>
  );
};

export default ProjectGrid;
