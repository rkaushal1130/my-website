import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Cpu,
  Calendar,
  Layers,
  CheckCircle2,
  Zap,
  Target,
  Terminal,
  TrendingUp,
  ShieldCheck,
  Building,
  Clock,
  Quote,
  Sparkles,
  SearchX,
  Code2,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import ProjectCard from '../components/portfolio/ProjectCard';
import PortfolioCTA from '../components/portfolio/PortfolioCTA';
import ProjectModal from '../components/portfolio/ProjectModal';
import Portfolio3DBackground from '../components/portfolio/Portfolio3DBackground';
import { PORTFOLIO_PROJECTS, normalizeProject } from '../data/portfolioData';
import { projectService } from '../services';

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ProjectDetail = ({ onOpenDemo }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState(PORTFOLIO_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRelatedProject, setSelectedRelatedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load project dynamically via GET /api/projects/:slug with local registry fallback
  useEffect(() => {
    let isMounted = true;

    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        // 1. Try to fetch from backend API
        const response = await projectService.getProjectBySlug(slug);
        const apiProject = response?.data;

        if (apiProject && isMounted) {
          // Merge API data with rich blueprints if available
          const localMatch = PORTFOLIO_PROJECTS.find(
            (lp) => lp.slug === slug || lp.title.toLowerCase() === (apiProject.title || '').toLowerCase()
          );
          setProject(normalizeProject(localMatch ? { ...localMatch, ...apiProject } : apiProject));
        } else {
          // Fallback to local rich dataset
          const found = PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
          if (isMounted) setProject(found ? normalizeProject(found) : null);
        }
      } catch (err) {
        // Fallback to local database if offline
        const found = PORTFOLIO_PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (isMounted) setProject(found ? normalizeProject(found) : null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Also fetch all projects for the Related Projects section
    const fetchAllProjects = async () => {
      try {
        const response = await projectService.getProjects({ limit: 50 });
        const items = response?.data?.items || response?.data;
        if (Array.isArray(items) && items.length > 0 && isMounted) {
          const normalized = items.map((item) => {
            const localMatch = PORTFOLIO_PROJECTS.find((lp) => lp.slug === item.slug);
            return normalizeProject(localMatch ? { ...localMatch, ...item } : item);
          });
          setAllProjects(normalized);
        }
      } catch {
        if (isMounted) setAllProjects(PORTFOLIO_PROJECTS);
      }
    };

    fetchProjectData();
    fetchAllProjects();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Related projects dynamically filtered from the same category
  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug && (p.category === project?.category || !project?.category))
    .slice(0, 3);

  // If loading
  if (isLoading) {
    return (
      <PageWrapper title="Loading Project Architecture — NeverquiT AI">
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader text="Loading Enterprise System Telemetry..." />
        </div>
      </PageWrapper>
    );
  }

  // If not found
  if (!project) {
    return (
      <PageWrapper title="Project Not Found — NeverquiT AI">
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/30 flex items-center justify-center text-[#FF1F26] mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Project Architecture Not Found</h1>
          <p className="text-sm text-[#A7A7A7] max-w-md mb-6">
            The requested deployment slug <code className="text-[#FF1F26] font-mono">"{slug}"</code> does not exist or has been relocated.
          </p>
          <Button onClick={() => navigate('/portfolio')} variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return to Portfolio</span>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  // Multi-viewport gallery screenshots
  const galleryScreenshots = [
    {
      title: 'Neural Dashboard & Telemetry Console',
      caption: 'Real-time telemetry streaming and multi-pod status monitoring.',
      image: project.image,
    },
    {
      title: 'Distributed Orchestration & Graph View',
      caption: 'Visualized state sync and low-latency message broker channels.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Production Edge Inference Stream',
      caption: 'Hardware-accelerated tensor pipeline executing sub-millisecond predictions.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <PageWrapper
      title={`${project.title} | NeverQuit.ai Case Study`}
      description={project.shortDescription || project.description}
      canonicalUrl={`/portfolio/${project.slug}`}
      ogTitle={`${project.title} — NeverQuit.ai Architecture`}
      ogDescription={project.shortDescription || project.description}
      ogImage={project.image}
      ogType="article"
    >
      {/* Lightweight 3D Background Elements */}
      <Portfolio3DBackground />

      <div className="bg-[#050505] text-white">

        {/* ========================================================================= */}
        {/* 1. PROJECT HERO SECTION */}
        {/* ========================================================================= */}
        <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 relative overflow-hidden border-b border-white/[0.06]">
          {/* Ambient red backlight */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF1F26]/6 rounded-full blur-[140px] pointer-events-none" />

          <Container size="wide">
            
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-mono text-[#737373] mb-6 select-none">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-[#FF1F26] truncate max-w-[200px] sm:max-w-none">{project.title}</span>
            </nav>

            {/* Badges & Meta Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge icon={Cpu}>{project.category}</Badge>
              <span className="px-3 py-1 rounded-full bg-[#121218] border border-white/[0.08] text-xs font-mono text-[#A7A7A7]">
                {project.industry || 'Enterprise Technology'}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#121218] border border-white/[0.08] text-xs font-mono text-[#A7A7A7] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF1F26]" />
                <span>Deployed {project.year}</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="max-w-4xl space-y-4 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-base sm:text-xl text-[#FF3030] font-medium leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF1F26] text-white text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] hover:shadow-[0_0_35px_rgba(255,31,38,0.5)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Project</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14141A] border border-white/[0.1] text-sm sm:text-base font-mono font-semibold text-white hover:border-[#FF1F26] hover:text-[#FF1F26] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Repository</span>
                </a>
              )}
              <Button
                onClick={onOpenDemo}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Discuss Architecture
              </Button>
            </div>

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 2. PROJECT OVERVIEW & METADATA BAR */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <Container size="wide">
            
            {/* Cinematic Hero Visual */}
            <div className="relative rounded-[24px] overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] aspect-[21/9] min-h-[280px] sm:min-h-[420px] bg-[#111115] mb-10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#09090D]/85 backdrop-blur-md border border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono text-[#CCCCCC]">
                    Active Production System // Tier-1 Architecture
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FF1F26] font-semibold">
                  Verified by NeverquiT AI Engineering
                </span>
              </div>
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0A0A0E] border border-white/[0.06] text-left mb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">Client Partner</span>
                <span className="text-sm sm:text-base font-bold text-white mt-1 block">{project.client}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">Industry Domain</span>
                <span className="text-sm sm:text-base font-bold text-white mt-1 block">{project.industry}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">Engineering Timeline</span>
                <span className="text-sm sm:text-base font-bold text-white mt-1 block">{project.duration || '3.5 Months'}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">Security Compliance</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400 mt-1 block">Zero Data Retention</span>
              </div>
            </div>

            {/* Executive Overview Narrative */}
            <div className="max-w-4xl text-left space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Executive Overview</h2>
              <p className="text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 3 & 4. THE CHALLENGE & THE NEVERQUIT AI SOLUTION */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#08080C] border-y border-white/[0.06]">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 3. The Challenge */}
              <div className="p-8 rounded-[24px] bg-[#0C0C12] border border-white/[0.06] text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1F26]/10 border border-[#FF1F26]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F26]">
                  <Target className="w-3.5 h-3.5" />
                  <span>The Architectural Challenge</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Legacy Bottlenecks & Operational Constraints
                </h3>
                <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-normal">
                  {project.challenge || 'The enterprise suffered from fragmented data pipelines, high latency decision queues, and monolithic limitations that hindered dynamic scalability during demand surges.'}
                </p>
              </div>

              {/* 4. The Solution */}
              <div className="p-8 rounded-[24px] bg-[#0C0C12] border border-white/[0.06] text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The NeverquiT AI Solution</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Autonomous Multi-Agent & Edge Orchestration
                </h3>
                <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-normal">
                  {project.solution || 'We architected a distributed, low-latency microservices fabric utilizing edge computing, continuous neural optimization, and real-time telemetry pipelines.'}
                </p>
              </div>

            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 5. KEY FEATURES & ARCHITECTURE HIGHLIGHTS */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <Container size="wide">
            
            <div className="text-left space-y-2 mb-10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF1F26] uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>CORE CAPABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Key Architectural Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(project.architecture || [
                'Zero-Trust Cryptographic Communication Layer',
                'Asynchronous Event-Driven Micro-Agent Clusters',
                'High-Throughput Sub-Millisecond Shared Memory State Sync',
                'Continuous Cloud Optimization & Predictive Auto-Scaling'
              ]).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#0A0A0E] border border-white/[0.06] hover:border-[#FF1F26]/40 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#FF1F26]/10 border border-[#FF1F26]/20 flex items-center justify-center text-[#FF1F26] shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{feature}</h4>
                    <p className="text-xs text-[#737373] mt-1 font-mono">Verified in production telemetry logs.</p>
                  </div>
                </div>
              ))}
            </div>

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 6. TECHNOLOGIES & FRAMEWORK STACK */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#08080C] border-y border-white/[0.06]">
          <Container size="wide">
            
            <div className="text-left space-y-2 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF1F26] uppercase">
                <Code2 className="w-3.5 h-3.5" />
                <span>TECHNOLOGY STACK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Frameworks, Models & Infrastructure
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {(project.technologies || project.techStack)?.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-[#0E0E14] border border-white/[0.08] hover:border-[#FF1F26]/50 hover:bg-[#14141A] text-xs sm:text-sm font-mono text-[#D4D4D8] hover:text-white transition-all shadow-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 7. PROJECT SCREENSHOTS & MEDIA SHOWCASE */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <Container size="wide">
            
            <div className="text-left space-y-2 mb-10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF1F26] uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>VISUAL BLUEPRINTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Project Screenshots & Interface Views
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryScreenshots.map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-[#0A0A0E] border border-white/[0.08] hover:border-[#FF1F26]/60 transition-all duration-400 overflow-hidden text-left shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121217]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent" />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF1F26] transition-colors">{item.title}</h4>
                    <p className="text-xs text-[#A7A7A7]">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 8. RESULTS & MEASURABLE OUTCOMES */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#08080C] border-y border-white/[0.06]">
          <Container size="wide">
            
            <div className="text-left space-y-2 mb-10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#FF1F26] uppercase">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>MEASURABLE IMPACT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Production Results & ROI
              </h2>
            </div>

            {/* 4 Metric Chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {(project.metrics && project.metrics.length > 0 ? project.metrics : [
                { label: 'Throughput Increase', value: '+58%', highlight: true },
                { label: 'Decision Latency', value: '< 18ms', highlight: false },
                { label: 'Operational Uptime', value: '99.99%', highlight: false },
                { label: 'Annual Capital Saved', value: '$14.2M', highlight: true }
              ]).map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0C0C12] border border-white/[0.08] text-left space-y-1 shadow-md"
                >
                  <div className="text-xs font-mono uppercase tracking-wider text-[#737373]">{m.label}</div>
                  <div className={`text-2xl sm:text-3xl font-extrabold ${m.highlight ? 'text-[#FF1F26]' : 'text-white'}`}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            {project.quote && (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#12121A] to-[#08080C] border border-white/[0.08] text-left relative overflow-hidden">
                <div className="absolute top-4 right-6 opacity-10 text-white pointer-events-none">
                  <Quote className="w-20 h-20" />
                </div>
                <p className="text-base sm:text-lg text-white italic leading-relaxed font-normal relative z-10">
                  "{project.quote.text}"
                </p>
                <div className="mt-4 text-xs font-mono text-[#FF1F26] font-semibold relative z-10">
                  — {project.quote.author}
                </div>
              </div>
            )}

          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 9. LIVE PROJECT LAUNCH BANNER */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <Container size="wide">
            <div className="p-8 sm:p-12 rounded-[28px] bg-gradient-to-r from-[#12121A] via-[#0A0A0E] to-[#12121A] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#FF1F26] font-bold uppercase tracking-wider block">
                  READY FOR DEPLOYMENT REVIEW
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Experience {project.title} Live
                </h3>
                <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-xl">
                  Access active staging environments, interactive product instances, or review verified GitHub architecture blueprints.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF1F26] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,31,38,0.35)] hover:bg-[#FF3030] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Site</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14141A] border border-white/[0.1] text-sm font-mono font-semibold text-white hover:border-[#FF1F26] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 10. RELATED PROJECTS */}
        {/* ========================================================================= */}
        {relatedProjects.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#08080C] border-t border-white/[0.06]">
            <Container size="wide">
              
              <div className="flex items-center justify-between mb-8">
                <div className="text-left space-y-1">
                  <div className="text-xs font-mono text-[#FF1F26] font-bold uppercase tracking-wider">
                    EXPLORE MORE WORK
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Related Case Studies
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="text-xs font-mono text-[#A7A7A7] hover:text-[#FF1F26] flex items-center gap-1 transition-colors"
                >
                  <span>View All Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedProjects.map((relProj, idx) => (
                  <ProjectCard
                    key={relProj.id || relProj.slug}
                    project={relProj}
                    index={idx}
                    onSelect={(p) => {
                      setSelectedRelatedProject(p);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>

            </Container>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 11. CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <PortfolioCTA onOpenDemo={onOpenDemo} />

        {/* Quick Modal for Related Projects */}
        <ProjectModal
          project={selectedRelatedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOpenDemo={onOpenDemo}
        />

      </div>
    </PageWrapper>
  );
};

export default ProjectDetail;
