import React, { useEffect, useState } from 'react';
import {
  X,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  Terminal,
  Quote,
  Building,
  Calendar,
  Clock,
  ExternalLink,
  Target,
  TrendingUp,
  Award,
  Globe,
  Server,
  Database,
  Cloud,
  Code2,
  Braces,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ProjectModal = ({ project, isOpen, onClose, onOpenDemo }) => {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Handle open/close lifecycle, scroll locking & entrance animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setAnimateIn(true), 15);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = 'unset';
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !project) return null;

  const languages = project.languages || ['JavaScript (ES6+)', 'TypeScript', 'SQL'];
  const frontendTech = project.frontendTech || ['React 19', 'Three.js', 'Vite', 'Tailwind CSS'];
  const backendTech = project.backendTech || ['Node.js', 'Express.js', 'TypeScript', 'JWT Auth', 'Zod'];
  const databaseTech = project.databaseTech || ['PostgreSQL', 'Prisma ORM', 'Redis Cache'];
  const devopsTech = project.devopsTech || ['Docker', 'Cloudflare Edge', 'Git CI/CD'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto"
    >
      {/* 1. Dark Glass Backdrop with Click-Outside-To-Close */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. Modal Window with Opacity, Scale & Y-Position Animation */}
      <div
        className={`relative w-full max-w-4xl rounded-[24px] sm:rounded-[28px] bg-[#09090D]/95 backdrop-blur-2xl border border-[#22222C] shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col transform-gpu transition-all duration-350 ease-out ${
          animateIn
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-5'
        }`}
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF1F26]/8 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* TOP BAR: Navigation, Slug & Close Button */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0E0E14]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF1F26] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              FULL-STACK ARCHIVE // {project.slug}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#16161D] border border-white/[0.1] text-[#A7A7A7] hover:text-white hover:border-[#FF1F26] hover:bg-[#1E1E28] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close case study modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SCROLLABLE BODY */}
        {/* ========================================================================= */}
        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-8 flex-grow scrollbar-thin scrollbar-thumb-white/10">
          
          {/* 1. Large Project Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[21/9] min-h-[220px] bg-[#121217] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-[#09090D]/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#08080C]/85 backdrop-blur-md border border-white/[0.12] text-xs font-mono font-semibold text-white flex items-center gap-1.5 shadow-md">
                  <Cpu className="w-3.5 h-3.5 text-[#FF1F26]" />
                  <span>{project.category}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#08080C]/85 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-[#CCCCCC]">
                  {project.industry || project.client}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#A7A7A7] bg-[#08080C]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.08]">
                <Calendar className="w-3.5 h-3.5 text-[#FF1F26]" />
                <span>Deployed {project.year}</span>
              </div>
            </div>
          </div>

          {/* 2. Project Title & Subheading */}
          <div className="space-y-2 text-left">
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#FF3030] font-medium">
              {project.shortDescription || project.tagline}
            </p>
          </div>

          {/* 3. Action Buttons: Live Website & GitHub Repository */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1F26] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(255,31,38,0.3)] hover:bg-[#FF3030] hover:shadow-[0_0_25px_rgba(255,31,38,0.5)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Website</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14141A] border border-white/[0.1] text-xs sm:text-sm font-mono font-semibold text-white hover:border-[#FF1F26] hover:text-[#FF1F26] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          )}

          {/* 4. Full Project Description */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.06] text-left space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#737373]">
              Overview & Full-Stack Solution Architecture
            </div>
            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* ===================================================================== */}
          {/* 5. FULL-STACK JAVASCRIPT & CLOUD TECH STACK BREAKDOWN (Categorized Grid) */}
          {/* ===================================================================== */}
          <div className="space-y-4 text-left font-sans">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <Braces className="w-4 h-4 text-[#FF1F26]" />
              <span>Full-Stack JavaScript Technology Breakdown</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Frontend Card */}
              <div className="p-4 rounded-2xl bg-[#0B0B10] border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Frontend (UI/3D)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {frontendTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="p-4 rounded-2xl bg-[#0B0B10] border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
                  <Server className="w-3.5 h-3.5" />
                  <span>Backend (Node.js)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {backendTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Card */}
              <div className="p-4 rounded-2xl bg-[#0B0B10] border border-purple-500/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase">
                  <Database className="w-3.5 h-3.5" />
                  <span>Database & Cache</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {databaseTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps & Cloud Card */}
              <div className="p-4 rounded-2xl bg-[#0B0B10] border border-[#FF1F26]/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF1F26] uppercase">
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Cloud & DevOps</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {devopsTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#FF1F26]/10 border border-[#FF1F26]/30 text-xs font-mono text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Programming Languages Strip */}
            <div className="p-3.5 rounded-xl bg-[#0E0E14] border border-emerald-500/30 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
                <Code2 className="w-3.5 h-3.5" />
                <span>Languages Used:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Results & Outcome / Key Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <TrendingUp className="w-4 h-4 text-[#FF1F26]" />
                <span>Results & Measurable Outcomes</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0E0E14] border border-white/[0.06] text-left"
                  >
                    <div className="text-[10px] font-mono text-[#737373] uppercase tracking-wider truncate">
                      {m.label}
                    </div>
                    <div className={`text-xl sm:text-2xl font-extrabold mt-1 ${
                      m.highlight ? 'text-[#FF1F26]' : 'text-white'
                    }`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Project Objectives & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Objectives / Challenge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F26]">
                <Target className="w-4 h-4" />
                <span>Project Objectives & Challenges</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-normal">
                {project.challenge || 'Scaling enterprise workflows with mission-critical security and sub-millisecond execution standards.'}
              </p>
            </div>

            {/* Key Features & Solution */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Features & Delivered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-normal">
                {project.solution || 'Engineered high-throughput modern services with real-time telemetry, automated resilience, and verified ROI.'}
              </p>
            </div>
          </div>

          {/* 8. Key Architecture Features */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.06] space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                <Terminal className="w-4 h-4 text-[#FF1F26]" />
                <span>Key Architectural Highlights</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#08080C] border border-white/[0.04] text-xs text-[#CCCCCC] font-mono leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. Client Quote Card */}
          {project.quote && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14141C] to-[#0A0A0E] border border-white/[0.08] relative overflow-hidden text-left">
              <div className="absolute top-3 right-4 opacity-10 text-white pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>
              <p className="text-sm sm:text-base text-white italic leading-relaxed font-normal relative z-10">
                "{project.quote.text}"
              </p>
              <div className="mt-3 text-xs font-mono text-[#FF1F26] font-semibold relative z-10">
                — {project.quote.author}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ACTION BAR */}
        {/* ========================================================================= */}
        <div className="p-5 border-t border-white/[0.08] bg-[#0A0A0E] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#737373] font-mono text-center sm:text-left">
            NeverquiT AI Production Architecture
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => {
                onClose();
                if (onOpenDemo) onOpenDemo();
              }}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              Discuss Similar Architecture
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="md"
              icon={false}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
