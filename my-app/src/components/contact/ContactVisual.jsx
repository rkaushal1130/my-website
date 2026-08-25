import React from 'react';
import { Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';
import Container from '../common/Container';

const ContactVisual = () => {
  return (
    <section className="py-14 sm:py-18 relative overflow-hidden">
      <Container>
        
        {/* Wide AI Environment Container */}
        <div className="relative rounded-[24px] bg-gradient-to-b from-[#101010] via-[#0A0A0A] to-[#050505] border border-[#242424] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF1F26]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Technical Telemetry Panel */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF1F26] animate-ping" />
                <span className="text-xs font-mono text-[#FF3030] tracking-wider uppercase">
                  ENTERPRISE OPERATIONS HUB
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Architecting the Future of AI Operations
              </h3>

              <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed max-w-xl font-normal">
                Our global command center unifies autonomous multi-agent swarms, zero-latency vector pipelines, and dedicated enterprise compute clusters.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Global Latency</div>
                  <div className="text-lg font-bold text-white mt-0.5">&lt; 14ms</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Neural Clusters</div>
                  <div className="text-lg font-bold text-[#FF1F26] mt-0.5">24 Regions</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#242424]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Compliance</div>
                  <div className="text-lg font-bold text-white mt-0.5">SOC2 Type II</div>
                </div>
              </div>
            </div>

            {/* Right Tech Display Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#050505] border border-[#242424] p-5 shadow-2xl overflow-hidden group hover:border-[#FF1F26]/60 transition-colors flex flex-col justify-between">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF1F26]" />
                    <span className="text-[10px] font-mono text-[#A7A7A7]">NQ-DATA-CORE</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">ACTIVE</span>
                </div>

                {/* Animated Core Node */}
                <div className="h-44 w-full relative flex flex-col items-center justify-center my-2">
                  <div className="w-20 h-20 rounded-2xl bg-[#141416] border border-[#FF1F26] shadow-[0_0_30px_rgba(255,31,38,0.35)] flex items-center justify-center text-[#FF1F26] mb-2">
                    <Cpu className="w-10 h-10 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono text-white font-bold">24/7 AUTONOMOUS ORCHESTRATION</span>
                </div>

                {/* Floating Card */}
                <div className="p-3 rounded-xl bg-[#101010] border border-[#FF1F26]/40 shadow-[0_0_20px_rgba(255,31,38,0.15)] text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
                    <span>NEVERQUIT.AI</span>
                  </div>
                  <div className="text-[11px] text-[#A7A7A7] mt-0.5">
                    Building intelligent solutions for the future.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default ContactVisual;
