import React, { useEffect, useState, useRef } from 'react';
import brandLogo from '../../assets/images/logo.png';
import { ArrowRight } from 'lucide-react';

const QUOTES = [
  "Innovating Today. Building Tomorrow.",
  "Technology That Drives Growth.",
];

const LoadingScreen = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    // Quote 0 is shown immediately
    // Velvety smooth pacing: 1200ms display + 800ms pure GPU hardware cross-drift
    const t1 = setTimeout(() => {
      setQuoteIndex(1);
    }, 1200);

    const t2 = setTimeout(() => {
      setIsLoading(false);
      const t3 = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      timeoutsRef.current.push(t3);
    }, 2500);

    timeoutsRef.current = [t1, t2];

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleSkip = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    setIsLoading(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 400);
  };

  if (!shouldRender) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141414] select-none transition-all duration-700 ease-out overflow-hidden cursor-pointer ${
        isLoading
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-105 filter blur-sm pointer-events-none'
      }`}
    >
      {/* Main Content: Centered Logo & Quote Stack */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl w-full px-4 text-center">
        
        {/* Company Logo Lockup with subtle breath animation */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-11 transition-transform duration-700 hover:scale-105">
          <img
            src={brandLogo}
            alt="Avaura"
            className="relative z-10 h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[360px] sm:max-w-[440px] md:max-w-[520px] object-contain select-none"
          />
        </div>

        {/* Pure GPU-Accelerated Velvety Crossfade (Zero blur/scale jitter, pure opacity & gentle 8px float) */}
        <div className="relative h-12 sm:h-14 md:h-16 w-full max-w-3xl mx-auto flex items-center justify-center overflow-hidden">
          {QUOTES.map((quote, idx) => {
            const isActive = idx === quoteIndex;
            const isPrev = idx < quoteIndex;
            return (
              <p
                key={idx}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className={`absolute inset-x-0 text-center whitespace-nowrap text-base sm:text-xl md:text-2xl lg:text-[28px] xl:text-3xl font-light text-white tracking-wide select-none px-4 will-change-[transform,opacity] ${
                  isActive
                    ? 'opacity-100 translate-y-0 z-10'
                    : isPrev
                    ? 'opacity-0 -translate-y-2 z-0 pointer-events-none'
                    : 'opacity-0 translate-y-2 z-0 pointer-events-none'
                }`}
              >
                {quote}
              </p>
            );
          })}
        </div>

        {/* Minimal Subtle Quote Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {QUOTES.map((_, idx) => (
            <span
              key={idx}
              style={{
                transitionProperty: 'all',
                transitionDuration: '800ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className={`h-1.5 rounded-full ${
                idx === quoteIndex
                  ? 'w-8 bg-[#FF1F26] shadow-[0_0_12px_rgba(255,31,38,0.7)]'
                  : idx < quoteIndex
                  ? 'w-2 bg-white/40'
                  : 'w-2 bg-white/15'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Subtle Skip Prompt in Corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute bottom-6 right-6 z-20 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF1F26]/50 text-xs font-medium text-white/50 hover:text-white flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95"
      >
        <span>Skip</span>
        <ArrowRight className="w-3 h-3 text-[#FF1F26]" />
      </button>

      {/* Discreet click hint */}
      <div className="absolute bottom-6 left-6 text-[11px] text-white/30 hidden sm:block pointer-events-none">
        Click anywhere to continue
      </div>
    </div>
  );
};

export default LoadingScreen;
