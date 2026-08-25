import React from 'react';
import { Cpu, Activity, Radio, Sparkles, Server, ShieldCheck, Zap } from 'lucide-react';

const ContactVisual = () => {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wide Futuristic AI Environment Container */}
        <div className="relative rounded-[24px] bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#050505] border border-[#252525] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          {/* Background Ambient Glow & Light Cone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF1F26]/12 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Futuristic Architecture Stage Simulation */}
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

              <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed max-w-xl font-normal">
                Our global command center unifies autonomous multi-agent swarms, zero-latency vector pipelines, and dedicated enterprise compute clusters.
              </p>

              {/* Technical Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#252525]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Global Latency</div>
                  <div className="text-lg font-bold text-white mt-0.5">&lt; 14ms</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#252525]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Neural Clusters</div>
                  <div className="text-lg font-bold text-[#FF1F26] mt-0.5">24 Regions</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#252525]">
                  <div className="text-[10px] text-[#737373] uppercase font-mono">Compliance</div>
                  <div className="text-lg font-bold text-white mt-0.5">SOC2 Type II</div>
                </div>
              </div>
            </div>

            {/* Right Holographic Display Window */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#050505] border border-[#252525] p-5 shadow-2xl overflow-hidden group hover:border-[#FF1F26]/60 transition-colors">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF1F26]" />
                    <span className="text-[10px] font-mono text-[#A8A8A8]">SYSTEM: NQ-HQ-CORE</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">ACTIVE</span>
                </div>

                {/* Animated Waveform Simulation */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#A8A8A8]">
                    <span>Neural Stream Sync</span>
                    <span className="text-[#FF1F26] font-mono">100%</span>
                  </div>

                  <div className="flex items-end justify-between gap-1 h-14 bg-[#111111] p-2 rounded-lg border border-[#1C1C1C]">
                    {[40, 75, 55, 95, 80, 60, 100, 70, 85, 45, 90, 65, 80, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#252525] rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i % 2 === 0 ? '#FF1F26' : '#252525'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Small Floating Card over image: NEVERQUIT.AI - Building intelligent solutions for the future. */}
                <div className="mt-2 p-3 rounded-xl bg-[#111111] border border-[#FF1F26]/40 shadow-[0_0_20px_rgba(255,31,38,0.2)] text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF1F26]" />
                    <span>NEVERQUIT.AI</span>
                  </div>
                  <div className="text-[11px] text-[#A8A8A8] mt-0.5">
                    Building intelligent solutions for the future.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactVisual;
