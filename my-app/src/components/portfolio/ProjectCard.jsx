import React from 'react';
import {
  ArrowRight,
  Cpu,
  Layers,
  Code2,
  Globe,
  Server,
  Database,
  Calendar,
} from 'lucide-react';

const ProjectCard = ({ project, onSelect, index = 0 }) => {
  if (!project) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const languages = project.languages && project.languages.length > 0
    ? project.languages
    : ['JavaScript (ES6+)', 'TypeScript', 'SQL'];

  const frontendTech = project.frontendTech && project.frontendTech.length > 0
    ? project.frontendTech
    : ['React 19', 'Three.js', 'Vite', 'Tailwind CSS'];

  const backendTech = project.backendTech && project.backendTech.length > 0
    ? project.backendTech
    : ['Node.js', 'Express.js', 'TypeScript', 'JWT Auth'];

  const databaseTech = project.databaseTech && project.databaseTech.length > 0
    ? project.databaseTech
    : ['PostgreSQL', 'Prisma ORM', 'Redis Cache'];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} case study`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      style={{ animationDelay: `${(index % 6) * 40}ms` }}
      className="group relative rounded-2xl bg-[#0A0A0A] border border-white/[0.08] hover:border-[#FF1F26]/60 hover:shadow-[0_15px_45px_rgba(255,31,38,0.22)] hover:-translate-y-1.5 transition-all duration-400 ease-out overflow-hidden flex flex-col justify-between cursor-pointer select-none animate-fade-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1F26] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
    >
      {/* Subtle Red Ambient Glow behind Card - Fades in on Hover */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF1F26]/0 rounded-full blur-3xl group-hover:bg-[#FF1F26]/15 transition-all duration-500 pointer-events-none" />

      <div>
        {/* ========================================================================= */}
        {/* 1. Project Image Container with Smooth 1.04 Hover Zoom & Red Gradient */}
        {/* ========================================================================= */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#111114]">
          
          {/* Main Visual Image */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transform-gpu group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />

          {/* Default Dark Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

          {/* Subtle Red Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF1F26]/25 via-[#FF1F26]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-3 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md border border-white/[0.1] text-[11px] font-sans font-semibold text-white flex items-center gap-1.5 shadow-md group-hover:border-[#FF1F26]/50 group-hover:shadow-[0_0_12px_rgba(255,31,38,0.3)] transition-all duration-400">
              <Cpu className="w-3 h-3 text-[#FF1F26]" />
              <span>{project.category}</span>
            </span>
          </div>

          {/* Deployment Year Badge */}
          {project.year && (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="px-2.5 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md border border-white/[0.08] text-[10px] font-sans text-[#A1A1AA] group-hover:text-white group-hover:border-white/[0.16] transition-all duration-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#FF1F26]" />
                <span>{project.year}</span>
              </span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* Card Content Body */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 space-y-4 text-left font-sans">
          
          {/* Client & Industry Header */}
          <div className="flex items-center justify-between text-xs text-[#71717A]">
            <span className="truncate max-w-[150px] group-hover:text-[#A1A1AA] transition-colors duration-400">
              {project.client || 'Enterprise Client'}
            </span>
            <span className="truncate max-w-[140px] text-right group-hover:text-[#A1A1AA] transition-colors duration-400">
              {project.industry || project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#FF3030] transition-colors duration-400 leading-snug">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#A1A1AA] group-hover:text-[#E4E4E7] line-clamp-2 leading-relaxed font-normal transition-colors duration-400">
            {project.shortDescription || project.description}
          </p>

          {/* ===================================================================== */}
          {/* 1. CORE LANGUAGES */}
          {/* ===================================================================== */}
          <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 tracking-wider uppercase font-mono">
              <Code2 className="w-3 h-3" />
              <span>Languages:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 group-hover:border-emerald-400/60 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 2. FRONTEND STACK (React & UI) */}
          {/* ===================================================================== */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              <Globe className="w-3 h-3" />
              <span>Frontend:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {frontendTech.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 group-hover:border-cyan-400/60 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {frontendTech.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#141418] border border-white/[0.06] text-[10px] font-mono text-[#71717A]">
                  +{frontendTech.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3. BACKEND & DATABASE STACK (Node.js & Postgres) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Backend Column */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 tracking-wider uppercase font-mono">
                <Server className="w-3 h-3" />
                <span>Backend:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {backendTech.slice(0, 2).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Database Column */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 tracking-wider uppercase font-mono">
                <Database className="w-3 h-3" />
                <span>Database:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {databaseTech.slice(0, 2).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* View Project Action Bar & Animated Arrow */}
      {/* ========================================================================= */}
      <div className="px-5 sm:px-6 py-3.5 border-t border-white/[0.06] bg-[#0E0E12]/50 group-hover:bg-[#14141A]/70 group-hover:border-white/[0.14] flex items-center justify-between transition-all duration-400 font-sans">
        <span className="text-xs text-[#71717A] group-hover:text-[#A1A1AA] flex items-center gap-1.5 transition-colors duration-400">
          <Layers className="w-3.5 h-3.5 text-[#FF1F26]" />
          <span>Full-Stack Architecture</span>
        </span>
        
        <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#FF1F26] transition-colors duration-400">
          <span>Explore Details</span>
          <ArrowRight className="w-3.5 h-3.5 transform-gpu transition-transform duration-400 ease-out group-hover:translate-x-1.5" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
