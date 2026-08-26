import React, { useEffect, useRef, useState } from 'react';
import Container from '../common/Container';
import brandLogo from '../../assets/images/logo.png';

// =========================================================================
// ACCURATE BRAND VECTOR ICONS MATCHING SCREENSHOT
// =========================================================================

const JiraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.77v1.74c0 2.4 1.97 4.35 4.35 4.35V2h-10.47zm-5.76 5.82c0 2.4 1.97 4.35 4.35 4.35h1.77v1.74c0 2.4 1.97 4.35 4.35 4.35V7.82H5.77zM0 13.65c0 2.4 1.97 4.35 4.35 4.35h1.77v1.74C6.12 22.14 8.09 24 10.47 24V13.65H0z"/>
  </svg>
);

const Microsoft365Icon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm0 3.3l5.5 3.2v6.5L12 18.2l-5.5-3.2V8.5L12 5.3zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
  </svg>
);

const PowerBIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M16 2h5v20h-5V2zm-6 6h5v14h-5V8zm-6 6h5v8H4v-8zm-4 4h3v4H0v-4z"/>
  </svg>
);

const SalesforceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-2.9 0-5.43 1.64-6.66 4.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.6.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
  </svg>
);

const SapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M0 6h24v12H0V6zm2 2v8h20V8H2zm3 1.5h3.5c.8 0 1.5.7 1.5 1.5s-.7 1-1.5 1H6.5v2H5v-4.5zm1.5 1.5v1h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2zm6.5-1.5h1.5l2 4.5h-1.6l-.4-1h-2l-.4 1h-1.6l2.5-4.5zm1 1.2l-.6 1.8h1.2l-.6-1.8zm4.5-1.2h3.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-2v1.5h-1.5v-4.5zm1.5 1.5v1h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2z"/>
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const WorkdayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-6.5l2-5h3l2 5-1.5 3.5h-4l-1.5-3.5zm2.2-.8h2.6l-.7-2.1h-1.2l-.7 2.1z"/>
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M10.8 0h2.4v9.6h-2.4V0zm0 14.4h2.4V24h-2.4v-9.6zM0 10.8h9.6v2.4H0v-2.4zm14.4 0H24v2.4h-9.6v-2.4zM3.4 4.5l6.8 6.8-1.7 1.7-6.8-6.8 1.7-1.7zm13.7 13.7l6.8 6.8-1.7 1.7-6.8-6.8 1.7-1.7zm0-13.7l1.7 1.7-6.8 6.8-1.7-1.7 6.8-6.8zM8.6 16.5l1.7 1.7-6.8 6.8-1.7-1.7 6.8-6.8z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const ROW1 = [
  { name: 'Jira', icon: JiraIcon },
  { name: 'Microsoft 365', icon: Microsoft365Icon },
  { name: 'Power BI', icon: PowerBIIcon },
  { name: 'Salesforce', icon: SalesforceIcon },
];

const ROW3 = [
  { name: 'Workday', icon: WorkdayIcon },
  { name: 'Zapier', icon: ZapierIcon },
  { name: 'LinkedIn', icon: LinkedinIcon },
  { name: 'GitHub', icon: GithubIcon },
];

const IntegrationsSection = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [line3Visible, setLine3Visible] = useState(false);

  // Set up scroll intersection observer for each individual line of boxes
  useEffect(() => {
    const createObserver = (ref, setVisible) => {
      if (!ref.current) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px',
        }
      );
      observer.observe(ref.current);
      return observer;
    };

    const line1Obs = createObserver(line1Ref, setLine1Visible);
    const line2Obs = createObserver(line2Ref, setLine2Visible);
    const line3Obs = createObserver(line3Ref, setLine3Visible);

    return () => {
      if (line1Obs) line1Obs.disconnect();
      if (line2Obs) line2Obs.disconnect();
      if (line3Obs) line3Obs.disconnect();
    };
  }, []);

  return (
    <section
      id="integrations"
      className="py-20 sm:py-28 relative overflow-hidden bg-[#030303] font-sans"
    >
      {/* Dynamic Keyframes for Spring Pop-out Animation */}
      <style>{`
        @keyframes popOutBounce {
          0% {
            opacity: 0;
            transform: scale(0.45) translateY(40px);
          }
          58% {
            opacity: 1;
            transform: scale(1.08) translateY(-6px);
          }
          80% {
            transform: scale(0.96) translateY(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .pop-card {
          animation: popOutBounce 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>

      {/* Ambient Red & Dark Blue Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-radial-glow opacity-40 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (Static & Locked in Place) */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-18 space-y-3.5">
          {/* Eyebrow with glowing horizontal gradient lines */}
          <div className="flex items-center justify-center gap-4 text-[13px] sm:text-sm font-sans font-semibold uppercase tracking-wider text-white select-none">
            <span className="w-12 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
            <span>INTEGRATION</span>
            <span className="w-12 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#FF1F26]/60 to-[#FF1F26]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Seamlessly Integrate with{' '}
            <span className="text-[#FF1F26] text-glow inline-block">
              Favorite Tools
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-xl mx-auto font-normal">
            Connect your existing tools and workflows with ease
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. 3-TIER INTEGRATION CLOUD MATRIX (SCROLL-TRIGGERED POP-OUT LINE BY LINE) */}
        {/* ========================================================================= */}
        <div className="max-w-[1240px] mx-auto space-y-4 sm:space-y-6">
          
          {/* ======================================================================= */}
          {/* LINE 1 (TOP): 4 BOXES — Pops out as you scroll to Line 1 */}
          {/* ======================================================================= */}
          <div
            ref={line1Ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {ROW1.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  style={
                    line1Visible
                      ? { animationDelay: `${idx * 90}ms` }
                      : { opacity: 0 }
                  }
                  className={`group relative rounded-[22px] bg-gradient-to-b from-[#090E17] to-[#05070B] border border-[#161D2B]/90 hover:border-[#FF1F26]/70 hover:from-[#0C121E] hover:to-[#07090F] hover:shadow-[0_0_30px_rgba(255,31,38,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center p-6 sm:p-8 h-36 sm:h-44 text-center cursor-pointer select-none ${
                    line1Visible ? 'pop-card' : 'opacity-0'
                  }`}
                >
                  <div className="text-[#7E8B9E] group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                    <Icon />
                  </div>
                  <span className="text-sm sm:text-[15px] font-medium text-[#8D9AA8] group-hover:text-white transition-colors">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ======================================================================= */}
          {/* LINE 2 (MIDDLE): 3 BOXES — Pops out as you scroll to Line 2 */}
          {/* ======================================================================= */}
          <div
            ref={line2Ref}
            className="max-w-[940px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center"
          >
            
            {/* Box 1: SAP */}
            <div
              style={
                line2Visible
                  ? { animationDelay: '0ms' }
                  : { opacity: 0 }
              }
              className={`group relative rounded-[22px] bg-gradient-to-b from-[#090E17] to-[#05070B] border border-[#161D2B]/90 hover:border-[#FF1F26]/70 hover:from-[#0C121E] hover:to-[#07090F] hover:shadow-[0_0_30px_rgba(255,31,38,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center p-6 sm:p-8 h-36 sm:h-44 text-center cursor-pointer select-none ${
                line2Visible ? 'pop-card' : 'opacity-0'
              }`}
            >
              <div className="text-[#7E8B9E] group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                <SapIcon />
              </div>
              <span className="text-sm sm:text-[15px] font-medium text-[#8D9AA8] group-hover:text-white transition-colors">
                SAP
              </span>
            </div>

            {/* Box 2 (Center Hero Hub): NeverquiT AI */}
            <div
              style={
                line2Visible
                  ? { animationDelay: '100ms' }
                  : { opacity: 0 }
              }
              className={`group relative rounded-[22px] bg-gradient-to-b from-[#0F1018] to-[#08080C] border-2 border-[#FF1F26]/80 shadow-[0_0_40px_rgba(255,31,38,0.28)] hover:shadow-[0_0_55px_rgba(255,31,38,0.5)] hover:border-[#FF1F26] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center px-4 sm:px-6 py-5 sm:py-7 h-36 sm:h-44 text-center select-none cursor-pointer overflow-hidden ${
                line2Visible ? 'pop-card' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF1F26]/5 via-[#FF1F26]/12 to-[#FF1F26]/5 pointer-events-none" />

              <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 relative z-10 max-w-full">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-transparent border border-[#FF1F26]/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_18px_rgba(255,31,38,0.35)]">
                  <img
                    src={brandLogo}
                    alt="NeverquiT AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
                  NeverquiT <span className="text-[#FF1F26] text-glow">AI</span>
                </span>
              </div>
            </div>

            {/* Box 3: Slack */}
            <div
              style={
                line2Visible
                  ? { animationDelay: '200ms' }
                  : { opacity: 0 }
              }
              className={`group relative rounded-[22px] bg-gradient-to-b from-[#090E17] to-[#05070B] border border-[#161D2B]/90 hover:border-[#FF1F26]/70 hover:from-[#0C121E] hover:to-[#07090F] hover:shadow-[0_0_30px_rgba(255,31,38,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center p-6 sm:p-8 h-36 sm:h-44 text-center cursor-pointer select-none ${
                line2Visible ? 'pop-card' : 'opacity-0'
              }`}
            >
              <div className="text-[#7E8B9E] group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                <SlackIcon />
              </div>
              <span className="text-sm sm:text-[15px] font-medium text-[#8D9AA8] group-hover:text-white transition-colors">
                Slack
              </span>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* LINE 3 (BOTTOM): 4 BOXES — Pops out as you scroll to Line 3 */}
          {/* ======================================================================= */}
          <div
            ref={line3Ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {ROW3.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  style={
                    line3Visible
                      ? { animationDelay: `${idx * 90}ms` }
                      : { opacity: 0 }
                  }
                  className={`group relative rounded-[22px] bg-gradient-to-b from-[#090E17] to-[#05070B] border border-[#161D2B]/90 hover:border-[#FF1F26]/70 hover:from-[#0C121E] hover:to-[#07090F] hover:shadow-[0_0_30px_rgba(255,31,38,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center p-6 sm:p-8 h-36 sm:h-44 text-center cursor-pointer select-none ${
                    line3Visible ? 'pop-card' : 'opacity-0'
                  }`}
                >
                  <div className="text-[#7E8B9E] group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                    <Icon />
                  </div>
                  <span className="text-sm sm:text-[15px] font-medium text-[#8D9AA8] group-hover:text-white transition-colors">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default IntegrationsSection;
