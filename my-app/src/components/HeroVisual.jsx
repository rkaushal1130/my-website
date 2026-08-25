import React from 'react';
import { Box, Sparkles, ShieldCheck, Radio } from 'lucide-react';
import nqHeroImg from '../assets/images/nq-hero.png';

const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      
      {/* Background Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[520px] h-[400px] sm:h-[520px] bg-[#FF1F26]/16 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#FF3030]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Glassmorphic AI Badges around Stage */}
      {/* Top Right: Core Engine Badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none sm:pointer-events-auto">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#101014]/90 border border-[#FF1F26]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,31,38,0.25)] flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#FF1F26]/20 border border-[#FF1F26] flex items-center justify-center text-[#FF1F26]">
            <Box className="w-3.5 h-3.5 text-[#FF1F26] animate-spin" />
          </div>
          <div className="text-left">
            <div className="text-[9px] text-[#737373] uppercase font-mono tracking-wider">Autonomous Core</div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>NQ-Neural 4.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Left: Latency Badge */}
      <div className="absolute top-4 left-3 sm:top-5 sm:left-4 z-20 pointer-events-none">
        <div className="px-2.5 py-1 rounded-xl bg-[#101014]/85 border border-[#242424] backdrop-blur-sm shadow-md flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] shadow-[0_0_6px_#FF1F26]" />
          <span className="text-[10px] font-mono text-[#A7A7A7]">LATENCY: 8ms</span>
        </div>
      </div>

      {/* Bottom Left: Precision Metric */}
      <div className="absolute bottom-4 left-3 sm:bottom-5 sm:left-4 z-20 pointer-events-none sm:pointer-events-auto hidden sm:block">
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#101014]/90 border border-[#242424] backdrop-blur-md shadow-lg flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#FF1F26]" />
          <div className="text-left">
            <div className="text-[9px] text-[#737373] font-mono uppercase">Neural Accuracy</div>
            <div className="text-[11px] font-semibold text-white">99.98% Precision</div>
          </div>
        </div>
      </div>

      {/* Bottom Right: Status Online */}
      <div className="absolute bottom-4 right-3 sm:bottom-5 sm:right-4 z-20 pointer-events-none sm:pointer-events-auto">
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#101014]/90 border border-[#242424] backdrop-blur-md shadow-lg flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#FF1F26] animate-pulse" />
          <span className="text-[10px] font-mono text-[#A7A7A7]">
            STATUS: <span className="text-[#FF3030] font-semibold">ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Hero Visual Container */}
      <div className="relative z-10 w-full rounded-[28px] bg-gradient-to-b from-[#0a0a0d] via-[#060608] to-[#030303] border border-[#222226] shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden group">
        
        {/* Top Viewport Header Bar */}
        <div className="absolute top-0 inset-x-0 h-9 px-4 border-b border-[#202024] bg-[#070709]/80 backdrop-blur-sm z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF1F26]" />
            <div className="w-2 h-2 rounded-full bg-[#242424]" />
            <div className="w-2 h-2 rounded-full bg-[#242424]" />
          </div>
          <div className="text-[10px] font-mono text-[#737373] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF1F26]" />
            <span>NEVERQUIT AI INTELLIGENCE INTERFACE</span>
          </div>
          <div className="text-[9px] font-mono text-[#FF1F26]">ONLINE</div>
        </div>

        {/* NQ Hero Logo Visual */}
        <div className="relative w-full pt-9 pb-2 px-2 sm:px-4 flex items-center justify-center overflow-hidden">
          <div className="relative w-full aspect-[4/3] max-h-[460px] sm:max-h-[520px] flex items-center justify-center">
            {/* Ambient Red Glow under image */}
            <div className="absolute inset-0 bg-radial-hero opacity-80 pointer-events-none" />
            <div className="absolute bottom-6 w-3/4 h-24 bg-[#FF1F26]/25 rounded-full blur-2xl pointer-events-none" />

            {/* Reference Image */}
            <img
              src={nqHeroImg}
              alt="NeverQuit.ai NQ Logo"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(255,31,38,0.25)] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom Platform Red Ambient Ground Line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-transparent shadow-[0_0_15px_#FF1F26] pointer-events-none" />
      </div>

    </div>
  );
};

export default HeroVisual;
