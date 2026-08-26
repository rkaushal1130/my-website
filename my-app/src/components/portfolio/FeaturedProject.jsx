import React from 'react';
import { ArrowRight, Sparkles, Cpu, Calendar } from 'lucide-react';
import Container from '../common/Container';

const FeaturedProject = ({ project, onSelectProject, onOpenDemo }) => {
  if (!project) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <section className="py-12 sm:py-16 relative bg-[#030303] overflow-hidden">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#FF1F26]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="wide">
        
        {/* Section Heading: Featured Work */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#FF1F26] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPOTLIGHT ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-[#FF1F26] text-glow">Work</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PRODUCTION VERIFIED // {project.year}</span>
          </div>
        </div>

        {/* Large Cinematic Featured Project Card */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Featured Case Study: ${project.title}`}
          onClick={() => onSelectProject(project)}
          onKeyDown={handleKeyDown}
          className="group relative rounded-[28px] bg-gradient-to-br from-[#0E0E14] via-[#0A0A0A] to-[#040407] border border-white/[0.08] hover:border-[#FF1F26]/70 transition-all duration-400 shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(255,31,38,0.22)] hover:-translate-y-1 sm:hover:-translate-y-1.5 overflow-hidden cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F26] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
        >
          
          {/* Volumetric ambient red backlight */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF1F26]/8 rounded-full blur-3xl group-hover:bg-[#FF1F26]/16 transition-all duration-700 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF1F26]/6 rounded-full blur-3xl group-hover:bg-[#FF1F26]/12 transition-all duration-700 pointer-events-none" />

          {/* 2-Column Cinematic Layout: LEFT Image / RIGHT Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 items-center">
            
            {/* ===================================================================== */}
            {/* LEFT COLUMN: Large Project Image / Visual */}
            {/* ===================================================================== */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#101015] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                
                {/* Visual Image with Zoom on Hover */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Dark Gradient Sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/20" />

                {/* Top-Left Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-[#0A0A0A]/90 backdrop-blur-md border border-white/[0.1] text-xs font-mono font-semibold text-white flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-ping" />
                    <span>FEATURED PROJECT</span>
                  </span>
                </div>

                {/* Bottom Overlay Telemetry Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A]/90 backdrop-blur-md border border-white/[0.08] text-xs font-mono">
                  <span className="text-[#A1A1AA] truncate max-w-[180px] sm:max-w-[240px]">
                    {project.client || 'Enterprise Deployment'}
                  </span>
                  <span className="text-[#FF1F26] font-semibold flex items-center gap-1">
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: Project Details & Action */}
            {/* ===================================================================== */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 text-left">
              
              {/* Category & Year Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14141C] border border-[#262634] text-xs font-mono font-semibold text-[#FF1F26] uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{project.category}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1AA] px-2.5 py-1 rounded-full bg-[#121218] border border-white/[0.08]">
                  <Calendar className="w-3.5 h-3.5 text-[#FF1F26]" />
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-normal">
                {project.shortDescription || project.description}
              </p>

              {/* Technologies List */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                  Technologies & Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || project.techStack)?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#141418] border border-white/[0.06] text-xs font-mono text-[#D4D4D8] group-hover:border-white/[0.18] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project Button */}
              <div className="pt-3">
                <button
                  type="button"
                  tabIndex={-1}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF1F26] text-white text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(255,31,38,0.3)] group-hover:bg-[#FF3030] group-hover:shadow-[0_0_30px_rgba(255,31,38,0.5)] transition-all duration-300 pointer-events-none"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default FeaturedProject;
