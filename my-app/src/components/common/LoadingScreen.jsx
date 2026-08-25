import React, { useEffect, useState, useRef } from 'react';
import introLogo from '../../assets/images/intro-logo.png';
import { ArrowRight } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL CORE...');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Dynamic 3D mouse parallax tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 22; // -11deg to +11deg
    const y = (clientY / innerHeight - 0.5) * -22; // -11deg to +11deg
    setMousePos({ x, y });
  };

  useEffect(() => {
    // Smooth cinematic progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.max(1, Math.floor((100 - prev) * 0.14));
        const next = Math.min(100, prev + step);

        if (next > 80) {
          setStatusText('WELCOME TO NeverquiT.ai');
        } else if (next > 45) {
          setStatusText('SYNCHRONIZING INTELLIGENCE MESH...');
        } else if (next > 15) {
          setStatusText('CALIBRATING NEURAL PIPELINES...');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Hold at 100% briefly then smoothly transition out
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 450);

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 1200);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [progress]);

  const handleSkip = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 600);
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] select-none transition-all duration-800 ease-out overflow-hidden ${
        isLoading
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-105 filter blur-sm pointer-events-none'
      }`}
      style={{ perspective: '1400px' }}
    >
      {/* Volumetric Radial Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-radial-hero opacity-95 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF1F26]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Cybernetic horizontal light streaks */}
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26]/15 to-transparent pointer-events-none" />

      {/* 3D Floating Stage */}
      <div
        className="relative flex flex-col items-center justify-center transition-transform duration-300 ease-out z-10 max-w-2xl px-6 w-full"
        style={{
          transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        
        {/* Holographic Glowing 3D Pedestal Floor Rings */}
        <div
          className="absolute -bottom-8 flex items-center justify-center pointer-events-none"
          style={{
            transform: 'translateZ(-50px) rotateX(72deg)',
          }}
        >
          <div className="w-[480px] h-[480px] rounded-full border border-[#FF1F26]/25 animate-spin-slow shadow-[0_0_60px_rgba(255,31,38,0.35)]" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-[#FF3030]/35 animate-pulse" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-[#FF1F26]/50 shadow-[0_0_35px_rgba(255,31,38,0.5)]" />
          <div className="absolute w-[140px] h-[140px] rounded-full bg-[#FF1F26]/15 blur-2xl" />
        </div>

        {/* 3D Floating Logo Showcase (Seamlessly Blended) */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transform: 'translateZ(45px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Intense ambient backlight */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#FF1F26] rounded-full blur-[100px] opacity-25 animate-pulse pointer-events-none" />

          {/* High-Resolution 3D Logo Presentation with seamless edge mask */}
          <div className="relative w-full max-w-[420px] sm:max-w-[520px] transition-transform duration-700 hover:scale-105">
            <img
              src={introLogo}
              alt="NeverquiT.ai 3D Monogram"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,31,38,0.55)] select-none rounded-2xl"
              style={{
                maskImage: 'radial-gradient(circle at center, black 72%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 72%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Brand Typography & Status (Clean Sans Typography) */}
        <div
          className="mt-6 text-center space-y-2"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="text-2xl sm:text-3xl font-extrabold tracking-[0.05em] text-white flex items-center justify-center">
            <span>NeverquiT</span>
            <span className="text-[#FF1F26] text-glow">.ai</span>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-[#737373] font-medium">
            Autonomous Intelligence Infrastructure
          </p>
        </div>

        {/* Minimalist Futuristic Progress Bar */}
        <div
          className="mt-7 w-72 sm:w-80 space-y-2"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center justify-between text-xs font-medium text-[#8a8a8a]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F26] animate-ping" />
              {statusText}
            </span>
            <span className="text-[#FF1F26] font-bold">{progress}%</span>
          </div>

          <div className="h-[2px] w-full bg-[#1A1A1E] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF1F26] via-[#FF3B42] to-[#FFFFFF] rounded-full shadow-[0_0_12px_#FF1F26] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Skip / Enter Site Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-7 right-7 z-20 px-4 py-2 rounded-xl bg-[#0D0D10]/80 hover:bg-[#1A1A20] border border-[#26262B] hover:border-[#FF1F26] text-xs font-medium text-[#A7A7A7] hover:text-white flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 group"
      >
        <span>ENTER SITE</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#FF1F26] transition-transform group-hover:translate-x-1" />
      </button>

      {/* Corner Telemetry Meta */}
      <div className="absolute bottom-7 left-7 text-xs font-medium text-[#525252] hidden sm:block pointer-events-none">
        <div>CORE // AUTONOMOUS AI v4.2</div>
        <div>CHANDIGARH // GLOBAL HQ</div>
      </div>

    </div>
  );
};

export default LoadingScreen;
