import React from 'react';
import { Bot, Cloud, Cpu, ShieldCheck, Database, Eye, Zap, Server, Sparkles, Code2, Terminal, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const itCourses = [
  {
    id: 1,
    title: 'Generative AI & Agentic Systems',
    tag: 'ENTERPRISE AI',
    icon: Bot,
    highlight: 'Multi-Agent Swarms',
  },
  {
    id: 2,
    title: 'LLM Fine-Tuning & Advanced RAG',
    tag: 'NLP & EMBEDDINGS',
    icon: Cpu,
    highlight: 'Vector Search',
  },
  {
    id: 3,
    title: 'Full-Stack Cloud & Microservices',
    tag: 'AWS / GCP / AZURE',
    icon: Cloud,
    highlight: 'Serverless',
  },
  {
    id: 4,
    title: 'Cyber Security & Zero-Trust Architecture',
    tag: 'SOC2 & THREAT INTEL',
    icon: ShieldCheck,
    highlight: 'Encrypted Enclaves',
  },
  {
    id: 5,
    title: 'Data Engineering & Vector Databases',
    tag: 'PINECONE & BIGQUERY',
    icon: Database,
    highlight: 'Real-Time Pipelines',
  },
  {
    id: 6,
    title: 'Computer Vision & Multimodal Neural Networks',
    tag: 'PYTORCH & TENSORFLOW',
    icon: Eye,
    highlight: 'Edge Inference',
  },
  {
    id: 7,
    title: 'Kubernetes, Docker & MLOps CI/CD',
    tag: 'CLOUD NATIVE',
    icon: Server,
    highlight: 'Auto-Scaling',
  },
  {
    id: 8,
    title: 'Autonomous Tool Use & MCP Engineering',
    tag: 'TOOL ORCHESTRATION',
    icon: Zap,
    highlight: 'Sub-14ms Latency',
  },
  {
    id: 9,
    title: 'AI Product Engineering & System Design',
    tag: 'ARCHITECTURE',
    icon: Sparkles,
    highlight: 'High-Throughput',
  },
  {
    id: 10,
    title: 'Neural Optimization & Model Quantization',
    tag: 'HARDWARE ACCEL',
    icon: Code2,
    highlight: 'GPU CUDA',
  },
];

const CoursesRibbon = () => {
  // Duplicate array to achieve seamless infinite marquee loop
  const duplicatedCourses = [...itCourses, ...itCourses];

  return (
    <section className="relative py-6 sm:py-8 bg-[#060608] border-y border-[#18181D] overflow-hidden group">
      
      {/* Subtle background red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 bg-[#FF1F26]/6 blur-2xl pointer-events-none" />

      {/* Left and Right Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 lg:w-48 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 lg:w-48 bg-gradient-to-l from-[#060608] via-[#060608]/90 to-transparent z-20 pointer-events-none" />

      {/* Top Ticker Label */}
      <div className="w-full px-5 sm:px-8 mb-3 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF1F26] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-ping" />
          <span>TECH & AI SPECIALIZATION TRACKS</span>
        </div>
        <Link
          to="/services"
          className="text-xs font-semibold text-[#8A8A8A] hover:text-[#FF1F26] transition-colors flex items-center gap-1"
        >
          <span>Explore All Curriculums</span>
          <span>→</span>
        </Link>
      </div>

      {/* Continuous Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex">
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
          {duplicatedCourses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div
                key={`${course.id}-${idx}`}
                className="flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-[#0C0C10] border border-[#202026] hover:border-[#FF1F26]/70 transition-all duration-300 hover:scale-105 group/item shadow-sm hover:shadow-[0_0_20px_rgba(255,31,38,0.25)] shrink-0 cursor-pointer"
              >
                {/* Icon Box */}
                <div className="w-9 h-9 rounded-xl bg-[#14141A] border border-[#262630] group-hover/item:border-[#FF1F26] flex items-center justify-center text-[#FF1F26] transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Course Details */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#FF3030] px-1.5 py-0.5 rounded bg-[#FF1F26]/10 border border-[#FF1F26]/20">
                      {course.tag}
                    </span>
                    <span className="text-[10px] text-[#666] font-medium hidden sm:inline">
                      • {course.highlight}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#FF1F26] transition-colors whitespace-nowrap">
                    {course.title}
                  </h4>
                </div>

                {/* Dot separator */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#333] group-hover/item:bg-[#FF1F26] transition-colors ml-1" />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default CoursesRibbon;
