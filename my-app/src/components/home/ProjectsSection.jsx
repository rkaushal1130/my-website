import React, { useState, useEffect } from 'react';
import { projectService } from '../../services';
import { Sparkles, ArrowRight, FolderGit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const categories = ['All', 'AI', 'Machine Learning', 'Automation', 'Data'];

  const fetchProjects = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const params = {
        page: 1,
        limit: 12,
      };

      if (activeCategory !== 'All') {
        params.category = activeCategory;
      }

      const response = await projectService.getProjects(params);
      const apiProjects = response?.data?.items || response?.data || [];
      setProjects(apiProjects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setErrorMessage(
        err.message || 'Unable to load projects from the server. Please check your connection.'
      );
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 sm:py-28 relative scroll-mt-20">
      {/* Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-bold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>FEATURED SHOWCASE</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Engineered For High Impact
          </h2>

          <p className="text-base sm:text-lg text-[#A8A8A8] leading-relaxed font-normal">
            Explore live production AI systems, autonomous agents, and intelligence pipelines deployed by NeverquiT AI.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF1F26] text-white shadow-[0_0_20px_rgba(255,31,38,0.4)]'
                  : 'bg-[#0E0E10] border border-[#242424] text-[#A8A8A8] hover:text-white hover:border-[#FF1F26]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 1. Loading State */}
        {isLoading && (
          <Loader
            text="Fetching real projects from backend..."
            size="lg"
            skeletonCount={3}
          />
        )}

        {/* 2. Error State */}
        {!isLoading && errorMessage && (
          <ErrorMessage
            title="Unable to Load Projects"
            message={errorMessage}
            onRetry={fetchProjects}
          />
        )}

        {/* 3. Empty State */}
        {!isLoading && !errorMessage && projects.length === 0 && (
          <EmptyState
            icon={FolderGit2}
            title="No projects available yet."
            description={
              activeCategory !== 'All'
                ? `No published projects found under ${activeCategory}.`
                : 'Projects are currently being updated in the system.'
            }
            actionLabel={activeCategory !== 'All' ? 'View All Categories' : undefined}
            onAction={activeCategory !== 'All' ? () => setActiveCategory('All') : undefined}
          />
        )}

        {/* 4. Success State (Projects Grid) */}
        {!isLoading && !errorMessage && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {projects.map((proj) => (
              <div
                key={proj.id || proj.slug}
                className="group relative p-7 rounded-2xl bg-[#101012] border border-[#252525] hover:border-[#FF1F26]/60 transition-all duration-300 hover:shadow-[0_12px_40px_-10px_rgba(255,31,38,0.25)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF1F26]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1C1C22] text-[#FF1F26] border border-[#FF1F26]/20">
                      {proj.category || 'AI Innovation'}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A8A8A8] leading-relaxed font-normal mb-6 line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#737373] group-hover:text-[#FF1F26] transition-colors">
                    View Architecture
                  </span>
                  <Link
                    to="/portfolio"
                    className="w-8 h-8 rounded-lg bg-[#050505] border border-[#242424] group-hover:border-[#FF1F26] group-hover:bg-[#FF1F26] flex items-center justify-center text-[#A8A8A8] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Full Portfolio Button */}
        <div className="mt-14 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#101014] border border-[#262630] text-white hover:border-[#FF1F26] hover:shadow-[0_0_20px_rgba(255,31,38,0.25)] text-sm font-semibold transition-all duration-300 group"
          >
            <span>Explore All Portfolio Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#FF1F26] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
