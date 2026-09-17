import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import feedbackService from '../../services/feedbackService';

const PortfolioClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(() => feedbackService.getFeedbacks());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Subscribe to real-time feedback updates
  useEffect(() => {
    const unsubscribe = feedbackService.subscribe((updatedList) => {
      setFeedbacks(updatedList);
      setCurrentIndex(0);
    });
    return unsubscribe;
  }, []);

  const total = feedbacks.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay rotation every 6.5s
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Smooth 3D Depth Card Calculations
  const getCardStyle = (index) => {
    if (total === 1) {
      return {
        transform: 'translate3d(-50%, -50%, 0) scale(1)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto',
        isCenter: true,
      };
    }

    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      // Active center card
      return {
        transform: 'translate3d(-50%, -50%, 0) scale(1)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto',
        isCenter: true,
      };
    } else if (diff === 1) {
      // Right preview card
      return {
        transform: 'translate3d(calc(-50% + 68%), -50%, -40px) scale(0.88)',
        opacity: 0.30,
        zIndex: 10,
        pointerEvents: 'auto',
        cursor: 'pointer',
        action: nextSlide,
      };
    } else if (diff === -1) {
      // Left preview card
      return {
        transform: 'translate3d(calc(-50% - 68%), -50%, -40px) scale(0.88)',
        opacity: 0.30,
        zIndex: 10,
        pointerEvents: 'auto',
        cursor: 'pointer',
        action: prevSlide,
      };
    } else if (diff > 1) {
      // Offscreen right
      return {
        transform: 'translate3d(calc(-50% + 130%), -50%, -100px) scale(0.72)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
      };
    } else {
      // Offscreen left
      return {
        transform: 'translate3d(calc(-50% - 130%), -50%, -100px) scale(0.72)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <section
      id="clients-feedback"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#07070A] border-t border-[#1C1C24]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Client Feedback Testimonials"
    >
      {/* ========================================================================= */}
      {/* 1. HIGHLIGHTED BACKGROUND ILLUMINATION */}
      {/* ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/50 to-transparent" />
      
      {/* Central Luminous Volumetric Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(255,31,38,0.24),rgba(255,31,38,0.06)_45%,transparent_75%)] blur-[70px] pointer-events-none" />
      
      {/* Ambient Side Lights */}
      <div className="absolute top-1/4 left-8 w-[360px] h-[360px] bg-[#FF1F26]/7 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-8 w-[360px] h-[360px] bg-[#FF1F26]/7 rounded-full blur-[130px] pointer-events-none" />

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1F26]/35 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* ========================================================================= */}
        {/* 2. SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18 space-y-4 font-sans">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#FF1F26]/40 bg-[#FF1F26]/12 text-xs sm:text-[13px] font-semibold tracking-wider text-[#FF3030] uppercase shadow-[0_0_20px_rgba(255,31,38,0.25)] select-none">
            <span className="w-2 h-2 rounded-full bg-[#FF1F26] animate-pulse shadow-[0_0_8px_#FF1F26]" />
            <span>CLIENTS FEEDBACK</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            What Our <span className="text-[#FF1F26] text-glow">Clients Say</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto font-normal leading-relaxed">
            Real experiences from businesses we've helped scale through cutting-edge engineering.
          </p>

          {/* Link to leave feedback */}
          <div className="pt-2">
            <Link
              to="/contact#leave-feedback"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FF3030] hover:text-white transition-colors group"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#FF1F26] group-hover:scale-110 transition-transform" />
              <span>Have you worked with us? Leave your feedback &rarr;</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. 3D CAROUSEL STAGE WITH PROPERLY FITTED ARROWS */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-16 lg:px-20">
          
          {/* Floating Left Arrow (Desktop / Tablet) */}
          {total > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="hidden sm:flex absolute left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#0D0D14]/95 hover:bg-[#FF1F26]/20 border border-white/15 hover:border-[#FF1F26] text-white/80 hover:text-white items-center justify-center transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(255,31,38,0.5)] backdrop-blur-md group cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop / Tablet) */}
          {total > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="hidden sm:flex absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#0D0D14]/95 hover:bg-[#FF1F26]/20 border border-white/15 hover:border-[#FF1F26] text-white/80 hover:text-white items-center justify-center transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(255,31,38,0.5)] backdrop-blur-md group cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Stage Area for Cards */}
          <div
            className="relative w-full h-[470px] sm:h-[440px] md:h-[420px] lg:h-[400px] flex items-center justify-center select-none overflow-hidden sm:overflow-visible"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {feedbacks.map((item, idx) => {
              const style = getCardStyle(idx);
              const isCenter = style.isCenter;

              return (
                <div
                  key={item.id || idx}
                  onClick={style.action}
                  style={{
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                    transition:
                      'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms ease, box-shadow 400ms ease',
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute top-1/2 left-1/2 w-[92vw] max-w-[420px] sm:max-w-[580px] md:max-w-[700px] lg:max-w-[780px] xl:max-w-[820px] rounded-2xl sm:rounded-3xl p-7 sm:p-9 md:p-11 flex flex-col justify-between ${
                    isCenter
                      ? 'bg-[#0B0B11] border-2 border-[#FF1F26] shadow-[0_0_55px_rgba(255,31,38,0.32),0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-[#FF1F26]/40'
                      : 'bg-[#0A0A0F]/85 border border-white/10 hover:border-white/25 backdrop-blur-md'
                  }`}
                >
                  <div>
                    {/* Rating Stars */}
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      {[...Array(item.stars || 5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-5 h-5 sm:w-6 sm:h-6 fill-[#FBBF24] text-[#FBBF24] ${
                            isCenter ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : ''
                          }`}
                        />
                      ))}
                      {isCenter && (
                        <span className="text-xs sm:text-sm font-semibold text-[#FBBF24] ml-2 tracking-wide">
                          5.0 / 5.0
                        </span>
                      )}
                    </div>

                    {/* Feedback Quote */}
                    <p
                      className={`italic text-base sm:text-lg md:text-[18px] lg:text-[19px] leading-relaxed sm:leading-relaxed md:leading-[1.72] font-normal ${
                        isCenter ? 'text-[#F1F1F5]' : 'text-[#A1A1AA]'
                      }`}
                    >
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Divider Line */}
                  <div>
                    <div
                      className={`w-full h-px my-5 sm:my-6 ${
                        isCenter
                          ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
                          : 'bg-white/5'
                      }`}
                    />

                    {/* Client Author Info — Clean Without Designation */}
                    <div className="flex items-center gap-4">
                      {/* Circle Avatar with Initials */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full font-bold text-base sm:text-lg flex items-center justify-center shrink-0 transition-all ${
                          isCenter
                            ? 'bg-gradient-to-br from-[#FF1F26]/35 to-[#FF1F26]/12 border border-[#FF1F26]/60 text-[#FF3030] shadow-[0_0_16px_rgba(255,31,38,0.35)]'
                            : 'bg-[#14141A] border border-white/15 text-white/70'
                        }`}
                      >
                        {item.initials}
                      </div>

                      {/* Author Name Clean (No Designation) */}
                      <div className="flex flex-col justify-center">
                        <h4
                          className={`text-base sm:text-lg md:text-xl font-bold leading-tight ${
                            isCenter ? 'text-white' : 'text-white/80'
                          }`}
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PAGINATION & MOBILE CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
          {/* Mobile Prev Arrow Button (< sm) */}
          {total > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="sm:hidden w-10 h-10 rounded-full bg-[#101017] border border-white/15 text-white/80 hover:text-white flex items-center justify-center active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Dots Indicator */}
          {total > 1 && (
            <div className="flex items-center gap-2.5">
              {feedbacks.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-[#FF1F26] shadow-[0_0_14px_rgba(255,31,38,0.7)]'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Mobile Next Arrow Button (< sm) */}
          {total > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="sm:hidden w-10 h-10 rounded-full bg-[#101017] border border-white/15 text-white/80 hover:text-white flex items-center justify-center active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PortfolioClientFeedback;
