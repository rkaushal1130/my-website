import React, { useState, useEffect, Component, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Sparkles, ShieldCheck, Radio } from 'lucide-react';
import NQScene from './NQScene';

// WebGL Support Detection Helper
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

// Error Boundary for 3D Canvas
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Canvas encountered error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback UI when WebGL is unsupported or errors
const WebGLFallback = () => (
  <div className="relative w-full h-full min-h-[480px] rounded-[28px] bg-gradient-to-b from-[#0e0e11] via-[#08080a] to-[#030303] border border-[#242424] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
    <div className="absolute inset-0 bg-radial-hero opacity-70 pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#FF1F26]/15 rounded-full blur-[80px] pointer-events-none" />

    {/* Fallback Static NQ Monogram Graphic */}
    <div className="relative z-10 flex flex-col items-center space-y-4">
      <div className="relative w-28 h-28 rounded-2xl bg-[#111114] border border-[#FF1F26]/40 shadow-[0_0_35px_rgba(255,31,38,0.3)] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-16 h-16">
          <path d="M7 23V9L15 19V9H18.5V23L10.5 13V23H7Z" fill="#FF1F26" />
          <path d="M21 14C21 11.2386 22.7909 9 25 9C27.2091 9 29 11.2386 29 14V18C29 20.7614 27.2091 23 25 23C23.8954 23 22.8954 22.4404 22.1716 21.5435L24.5 19C24.6667 19.3333 25 19.5 25.5 19.5C26.3284 19.5 27 18.8284 27 18V14C27 13.1716 26.3284 12.5 25.5 12.5C24.6716 12.5 24 13.1716 24 14V16H21V14Z" fill="#FFFFFF" />
          <circle cx="27" cy="9" r="2" fill="#FF1F26" />
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-bold text-white tracking-wide">neverquit.ai</div>
        <div className="text-xs text-[#737373] font-mono">3D AI Neural Engine</div>
      </div>
    </div>
  </div>
);

// High-tech Loading Screen
const LoadingScreen = ({ isLoaded }) => (
  <div
    className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#030303] transition-opacity duration-700 pointer-events-none rounded-[28px] ${
      isLoaded ? 'opacity-0' : 'opacity-100'
    }`}
  >
    <div className="relative flex flex-col items-center space-y-5">
      {/* Brand logo text */}
      <div className="text-base sm:text-lg font-extrabold text-white tracking-wider">
        neverquit<span className="text-[#FF1F26]">.ai</span>
      </div>

      {/* Red pulsating loading ring */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#FF1F26]/20 border-t-[#FF1F26] animate-spin" />
        <div className="w-4 h-4 rounded-full bg-[#FF1F26]/20 border border-[#FF1F26] animate-ping" />
      </div>

      {/* Loading state message */}
      <div className="text-xs font-mono text-[#8a8a8a] tracking-widest uppercase animate-pulse">
        Initializing Intelligence...
      </div>
    </div>
  </div>
);

const NQHeroCanvas = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (!supported) {
    return <WebGLFallback />;
  }

  return (
    <div className={`relative w-full max-w-2xl mx-auto select-none ${className}`}>
      
      {/* Ambient Red Glow Backdrop behind 3D Canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] bg-[#FF1F26]/14 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#FF3030]/20 rounded-full blur-[75px] pointer-events-none" />

      {/* Floating Glassmorphic AI Badges around 3D Stage */}
      {/* Top Right: Core Engine Badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none sm:pointer-events-auto">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#101014]/90 border border-[#FF1F26]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,31,38,0.25)] flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#FF1F26]/20 border border-[#FF1F26] flex items-center justify-center text-[#FF1F26]">
            <Box className="w-3.5 h-3.5 text-[#FF1F26] animate-spin-slow" />
          </div>
          <div className="text-left">
            <div className="text-[9px] text-[#737373] uppercase font-mono tracking-wider">3D Core</div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>NQ-Engine 3.0</span>
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

      {/* 3D Scene Viewport Container */}
      <div className="relative z-10 w-full aspect-[4/3.8] sm:aspect-[4/3.5] lg:aspect-[4/3.6] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] rounded-[28px] bg-gradient-to-b from-[#0a0a0d] via-[#060608] to-[#030303] border border-[#222226] shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
        
        {/* Loading Overlay */}
        <LoadingScreen isLoaded={isLoaded} />

        {/* Top Viewport Header Bar */}
        <div className="absolute top-0 inset-x-0 h-9 px-4 border-b border-[#202024] bg-[#070709]/80 backdrop-blur-sm z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF1F26]" />
            <div className="w-2 h-2 rounded-full bg-[#242424]" />
            <div className="w-2 h-2 rounded-full bg-[#242424]" />
          </div>
          <div className="text-[10px] font-mono text-[#737373] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF1F26]" />
            <span>NEVERQUIT 3D MONOGRAM INTERFACE</span>
          </div>
          <div className="text-[9px] font-mono text-[#FF1F26]">INTERACTIVE</div>
        </div>

        {/* Three.js R3F Canvas */}
        <CanvasErrorBoundary fallback={<WebGLFallback />}>
          <div className="w-full h-full pt-8 cursor-grab active:cursor-grabbing">
            <Canvas
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
              }}
              dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1]}
            >
              <Suspense fallback={null}>
                <NQScene onLoaded={() => setIsLoaded(true)} />
              </Suspense>
            </Canvas>
          </div>
        </CanvasErrorBoundary>

        {/* Bottom Platform Red Ambient Ground Line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-transparent shadow-[0_0_15px_#FF1F26] pointer-events-none" />
      </div>

    </div>
  );
};

export default NQHeroCanvas;
