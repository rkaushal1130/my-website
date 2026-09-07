import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';

export const mockOpenings = [
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    employmentType: 'Full Time',
    location: 'Mohali (Hybrid)',
    experience: '2+ Years',
    description: 'Create intuitive and beautiful user experiences for web and mobile products.',
  },
  {
    id: 'front-end-developer',
    title: 'Front-End Developer',
    department: 'Development',
    employmentType: 'Full Time',
    location: 'Mohali (Hybrid)',
    experience: '2+ Years',
    description: 'Build modern, responsive and high-performance web applications.',
  },
  {
    id: 'back-end-developer',
    title: 'Back-End Developer',
    department: 'Development',
    employmentType: 'Full Time',
    location: 'Mohali (Hybrid)',
    experience: '2+ Years',
    description: 'Work on scalable systems and robust server-side solutions.',
  },
  {
    id: 'digital-marketing-executive',
    title: 'Digital Marketing Executive',
    department: 'Marketing',
    employmentType: 'Full Time',
    location: 'Mohali (On-site)',
    experience: '1+ Years',
    description: 'Plan and execute creative digital marketing campaigns.',
  },
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    department: 'Operations',
    employmentType: 'Full Time',
    location: 'Mohali (On-site)',
    experience: '1+ Years',
    description: 'Help us grow by building strong client relationships.',
  },
];

const categories = ['All', 'Design', 'Development', 'Marketing', 'Operations'];

const CareersOpenings = ({ onApply }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = useMemo(() => {
    return mockOpenings.filter((job) => {
      const matchesCategory =
        activeCategory === 'All' || job.department.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchTerm.trim() ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section id="open-positions" className="py-20 sm:py-28 relative overflow-hidden bg-[#171717] scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-radial-glow opacity-30 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <Badge>OPEN POSITIONS</Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight">
            Current Openings
          </h2>

          <p className="text-base sm:text-lg text-[#A7A7A7] font-normal leading-relaxed">
            Find the right opportunity and take the next step in your career.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="max-w-4xl mx-auto mb-10 space-y-6">
          {/* Search Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search job title, keyword..."
              className="w-full pl-5 pr-14 py-4 rounded-2xl bg-[#0E0E12] border border-[#24242A] text-white placeholder-[#71717A] text-sm sm:text-base focus:outline-none focus:border-[#FF1F26] focus:ring-1 focus:ring-[#FF1F26] transition-all shadow-inner"
            />
            <button
              type="button"
              className="absolute right-2.5 w-11 h-11 rounded-xl bg-[#FF1F26] text-white flex items-center justify-center hover:bg-[#FF3030] shadow-[0_0_15px_rgba(255,31,38,0.35)] transition-all select-none cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#FF1F26] text-white shadow-[0_0_18px_rgba(255,31,38,0.35)]'
                      : 'bg-[#0E0E12] text-[#A7A7A7] border border-[#26262B] hover:border-[#FF1F26]/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Cards List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl bg-[#0E0E12] border border-[#222226] p-6 sm:p-7 hover:border-[#FF1F26]/60 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(255,31,38,0.12)]"
              >
                <div className="space-y-2.5 text-left">
                  <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                    {job.title}
                  </h3>

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E8E93] font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF1F26]" />
                      {job.employmentType}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF1F26]" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#FF1F26]" />
                      {job.experience}
                    </span>
                  </div>

                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-normal pt-1">
                    {job.description}
                  </p>
                </div>

                {/* Apply Button */}
                <div className="shrink-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => onApply(job)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF1F26] group-hover:text-[#FF383F] group-hover:translate-x-1 transition-all duration-300 cursor-pointer select-none"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 rounded-2xl bg-[#0E0E12] border border-[#222226] text-[#8E8E93]">
              <p className="text-base font-medium">No open positions found matching your criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                }}
                className="mt-3 text-sm font-semibold text-[#FF1F26] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* View All Openings Button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchTerm('');
              const el = document.getElementById('open-positions');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0D0D10] border border-[#292930] text-white text-sm sm:text-base font-semibold hover:border-[#FF1F26]/60 hover:bg-[#141418] hover:text-[#FF1F26] transition-all duration-300 select-none cursor-pointer"
          >
            <span>View All Openings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </Container>
    </section>
  );
};

export default CareersOpenings;
