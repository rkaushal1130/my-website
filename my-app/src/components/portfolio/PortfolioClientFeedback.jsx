import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import feedbackService, { sanitizeQuote } from '../../services/feedbackService';

// Ultra-smooth easing curve (Quartic Deceleration) and optimal duration for luxurious motion
const TRANSITION_DURATION = 720; // ms
const EASING = 'cubic-bezier(0.25, 1, 0.5, 1)';

const PortfolioClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState(() => feedbackService.getFeedbacks());
  const rawTotal = feedbacks.length;

  // Seamless 3-set buffer (Left buffer, Center active set, Right buffer)
  const items = useMemo(() => {
    if (rawTotal === 0) return [];
    if (rawTotal === 1) {
      return [{ ...feedbacks[0], _uid: `${feedbacks[0].id || 'fb-0'}-v0`, originalIndex: 0 }];
    }
    const copies = 3;
    const list = [];
    for (let c = 0; c < copies; c++) {
      feedbacks.forEach((item, originalIdx) => {
        list.push({
          ...item,
          _uid: `${item.id || originalIdx}-c${c}`,
          originalIndex: originalIdx,
        });
      });
    }
    return list;
  }, [feedbacks, rawTotal]);

  // Start centered in the middle set
  const [currentIndex, setCurrentIndex] = useState(() => (rawTotal > 1 ? rawTotal : 0));
  const [isResetting, setIsResetting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(700);
  const [gap, setGap] = useState(28);

  const stageRef = useRef(null);
  const firstCardRef = useRef(null);
  const isNavigating = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);

  // Subscribe to real-time feedback updates
  useEffect(() => {
    const unsubscribe = feedbackService.subscribe((updatedList, isNewSubmission) => {
      setFeedbacks(updatedList);
      if (isNewSubmission) {
        // Automatically focus directly on the newly submitted review in the center
        setCurrentIndex(updatedList.length > 1 ? updatedList.length : 0);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
      }
    });
    return unsubscribe;
  }, []);

  // Center on newest review if user just submitted and arrived from form
  useEffect(() => {
    try {
      if (sessionStorage.getItem('avaura_new_review_submitted')) {
        sessionStorage.removeItem('avaura_new_review_submitted');
        setCurrentIndex(rawTotal > 1 ? rawTotal : 0);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
      }
    } catch {}
  }, [rawTotal]);

  // Measure card width and responsive gap on mount and window resize
  const measureLayout = useCallback(() => {
    if (firstCardRef.current) {
      const w = firstCardRef.current.offsetWidth;
      const g = window.innerWidth < 640 ? 16 : 28;
      setCardWidth(w);
      setGap(g);
    }
  }, []);

  useLayoutEffect(() => {
    measureLayout();
    window.addEventListener('resize', measureLayout);
    return () => window.removeEventListener('resize', measureLayout);
  }, [measureLayout]);

  // Silent infinite wrap reset once transition completes
  useEffect(() => {
    if (rawTotal <= 1) return;

    if (currentIndex >= 2 * rawTotal) {
      const timer = setTimeout(() => {
        setIsResetting(true);
        setCurrentIndex((prev) => prev - rawTotal);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsResetting(false);
          });
        });
      }, TRANSITION_DURATION + 20);
      return () => clearTimeout(timer);
    } else if (currentIndex < rawTotal) {
      const timer = setTimeout(() => {
        setIsResetting(true);
        setCurrentIndex((prev) => prev + rawTotal);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsResetting(false);
          });
        });
      }, TRANSITION_DURATION + 20);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, rawTotal]);

  const nextSlide = useCallback(() => {
    if (isNavigating.current || rawTotal <= 1) return;
    isNavigating.current = true;
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => {
      isNavigating.current = false;
    }, 280);
  }, [rawTotal]);

  const prevSlide = useCallback(() => {
    if (isNavigating.current || rawTotal <= 1) return;
    isNavigating.current = true;
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => {
      isNavigating.current = false;
    }, 280);
  }, [rawTotal]);

  const goToDot = useCallback(
    (targetOriginalIndex) => {
      if (isNavigating.current || rawTotal <= 1) return;
      isNavigating.current = true;

      const currentOriginalIndex = items[currentIndex]?.originalIndex ?? 0;
      let diff = targetOriginalIndex - currentOriginalIndex;

      if (diff > rawTotal / 2) diff -= rawTotal;
      if (diff < -rawTotal / 2) diff += rawTotal;

      setCurrentIndex((prev) => prev + diff);
      setTimeout(() => {
        isNavigating.current = false;
      }, 280);
    },
    [currentIndex, items, rawTotal]
  );

  // Autoplay rotation every 6.5s
  useEffect(() => {
    if (isPaused || rawTotal <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, rawTotal]);

  // Pointer / touch / swipe handlers for both desktop drag & mobile swipe
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging.current = true;
    dragStartX.current = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    dragDeltaX.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    dragDeltaX.current = currentX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDeltaX.current < -45) {
      nextSlide();
    } else if (dragDeltaX.current > 45) {
      prevSlide();
    }
    dragDeltaX.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Continuous track translateX placing the active card's center precisely at 50%
  const cardStep = cardWidth + gap;
  const translateX = -(currentIndex * cardStep + cardWidth / 2);
  const activeOriginalIndex = items[currentIndex]?.originalIndex ?? 0;

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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 font-sans">
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
        {/* 3. CONTINUOUS TRACK CAROUSEL WITH PROPERLY FITTED ARROWS */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-[1360px] mx-auto px-2 sm:px-6 md:px-10 lg:px-14">
          {/* Left Edge Gradient Vignette - Smoothly dissolves side cards before reaching arrow */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-r from-[#07070A] via-[#07070A]/85 to-transparent z-30" />

          {/* Right Edge Gradient Vignette - Smoothly dissolves side cards before reaching arrow */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-l from-[#07070A] via-[#07070A]/85 to-transparent z-30" />

          {/* Floating Left Arrow (Desktop / Tablet) - Positioned in dedicated dark vignette zone */}
          {rawTotal > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="hidden sm:flex absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0D0D15]/95 hover:bg-[#FF1F26] border border-white/20 hover:border-[#FF1F26] text-white/90 hover:text-white items-center justify-center transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:shadow-[0_0_30px_rgba(255,31,38,0.7)] backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#FF1F26]/60 select-none"
            >
              <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop / Tablet) - Positioned in dedicated dark vignette zone */}
          {rawTotal > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="hidden sm:flex absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0D0D15]/95 hover:bg-[#FF1F26] border border-white/20 hover:border-[#FF1F26] text-white/90 hover:text-white items-center justify-center transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:shadow-[0_0_30px_rgba(255,31,38,0.7)] backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#FF1F26]/60 select-none"
            >
              <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Viewport Stage */}
          <div
            ref={stageRef}
            className="relative w-full h-[460px] sm:h-[430px] md:h-[410px] flex items-center justify-start overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* The Unified Sliding Track: All cards slide as one continuous physical entity */}
            <div
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                transition: isResetting
                  ? 'none'
                  : `transform ${TRANSITION_DURATION}ms ${EASING}`,
                left: '50%',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: `${gap}px`,
                willChange: 'transform',
              }}
            >
              {items.map((item, idx) => {
                const isCenter = idx === currentIndex;

                return (
                  <div
                    key={item._uid}
                    ref={idx === 0 ? firstCardRef : null}
                    onClick={() => {
                      if (!isCenter) {
                        isNavigating.current = true;
                        setCurrentIndex(idx);
                        setTimeout(() => {
                          isNavigating.current = false;
                        }, 280);
                      }
                    }}
                    style={{
                      transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                      opacity: isCenter ? 1 : 0.40,
                      transition: isResetting
                        ? 'none'
                        : `transform ${TRANSITION_DURATION}ms ${EASING}, opacity ${TRANSITION_DURATION}ms ${EASING}`,
                      cursor: isCenter ? 'default' : 'pointer',
                      willChange: 'transform, opacity',
                    }}
                    className={`relative w-[86vw] sm:w-[560px] md:w-[640px] lg:w-[700px] xl:w-[720px] shrink-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between ${
                      isCenter
                        ? 'bg-[#0B0B11] border-2 border-[#FF1F26] z-20'
                        : 'bg-[#0A0A0F]/90 border border-white/10 hover:border-white/20 hover:opacity-60 backdrop-blur-md z-10'
                    }`}
                  >
                    {/* GPU-Accelerated Neon Glow Overlay (eliminates box-shadow repaints) */}
                    <div
                      style={{
                        opacity: isCenter ? 1 : 0,
                        transition: isResetting
                          ? 'none'
                          : `opacity ${TRANSITION_DURATION}ms ${EASING}`,
                      }}
                      className="pointer-events-none absolute -inset-0.5 rounded-2xl sm:rounded-3xl shadow-[0_0_55px_rgba(255,31,38,0.32),0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-[#FF1F26]/40 z-0"
                    />

                    <div className="relative z-10">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-5">
                        {[...Array(item.stars || 5)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#FBBF24] text-[#FBBF24] ${
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
                        className={`italic text-sm sm:text-base md:text-[17px] lg:text-[18px] leading-relaxed sm:leading-relaxed md:leading-[1.7] font-normal line-clamp-4 sm:line-clamp-5 ${
                          isCenter ? 'text-[#F1F1F5]' : 'text-[#A1A1AA]'
                        }`}
                      >
                        "{sanitizeQuote(item.quote)}"
                      </p>
                    </div>

                    {/* Divider Line & Author Footer */}
                    <div className="relative z-10">
                      <div
                        className={`w-full h-px my-4 sm:my-5 ${
                          isCenter
                            ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
                            : 'bg-white/5'
                        }`}
                      />

                      {/* Client Author Info */}
                      <div className="flex items-center gap-3.5">
                        {/* Circle Avatar with Initials */}
                        <div
                          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isCenter
                              ? 'bg-gradient-to-br from-[#FF1F26]/35 to-[#FF1F26]/12 border border-[#FF1F26]/60 text-[#FF3030] shadow-[0_0_16px_rgba(255,31,38,0.35)]'
                              : 'bg-[#14141A] border border-white/15 text-white/70'
                          }`}
                        >
                          {item.initials}
                        </div>

                        {/* Author Name */}
                        <div className="flex flex-col justify-center">
                          <h4
                            className={`text-base sm:text-lg font-bold leading-tight transition-colors duration-300 ${
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
        </div>

        {/* ========================================================================= */}
        {/* 4. PAGINATION & MOBILE CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
          {/* Mobile Prev Arrow Button (< sm) */}
          {rawTotal > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="sm:hidden w-10 h-10 rounded-full bg-[#101017] border border-white/15 text-white/80 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Dots Indicator (Mapped to original feedback count) */}
          {rawTotal > 1 && (
            <div className="flex items-center gap-2.5">
              {feedbacks.map((_, idx) => {
                const isActive = idx === activeOriginalIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToDot(idx)}
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
          {rawTotal > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="sm:hidden w-10 h-10 rounded-full bg-[#101017] border border-white/15 text-white/80 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
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
