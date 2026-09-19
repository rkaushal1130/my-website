/**
 * Client Feedback Service for Avaura
 * Connects to MongoDB Atlas via /api/feedback with real-time caching,
 * optimistic offline-first local storage, and event dispatching.
 */

const STORAGE_KEY = 'avaura_client_feedbacks_v3';
export const EVENT_NAME = 'avaura-feedback-updated';

export const sanitizeQuote = (str) => {
  if (!str) return '';
  return str.replace(/^["'“”«»]+|["'“”«»]+$/g, '').trim();
};

export const generateInitials = (name) => {
  if (!name) return 'CL';
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

export const DEFAULT_FEEDBACKS = [
  {
    id: 'fb-comet-ai',
    name: 'Comet AI',
    service: 'AI & Web Engineering',
    initials: 'CA',
    stars: 5,
    quote:
      'Excellent company with outstanding execution. The team is responsive, professional, and delivered very well. The website turned out fast, sleek, and easy to navigate. Highly recommended for any business looking for professional digital solutions.',
    createdAt: '2026-09-19T08:00:00.000Z',
  },
  {
    id: 'fb-1',
    name: 'Aman Mahajan',
    service: 'Full-Stack Web Architecture',
    initials: 'AM',
    stars: 5,
    quote:
      'Avaura transformed our digital infrastructure with absolute precision. Their team’s technical depth in scalable microservices architecture and modern web engineering is peerless. The entire delivery was seamless, on schedule, and elevated our product performance to an entirely new standard.',
    createdAt: '2026-03-10T10:00:00.000Z',
  },
  {
    id: 'fb-2',
    name: 'Ankita Kaushal',
    service: 'UI/UX & Frontend Engineering',
    initials: 'AK',
    stars: 5,
    quote:
      'Working with Avaura has been an exceptional experience. Their eye for intuitive UI/UX design combined with lightning-fast full-stack execution delivered a platform our clients genuinely love using every single day. They consistently went above and beyond to ensure every micro-interaction was flawless.',
    createdAt: '2026-03-11T12:30:00.000Z',
  },
  {
    id: 'fb-3',
    name: 'Slidevance',
    service: 'Cloud Architecture & APIs',
    initials: 'SV',
    stars: 5,
    quote:
      'Avaura was instrumental in modernizing and scaling our core presentation platform. From high-throughput backend APIs to fluid interactive frontend components, their engineering rigor and proactive communication made them feel like a natural extension of our leadership team.',
    createdAt: '2026-03-12T14:15:00.000Z',
  },
  {
    id: 'fb-4',
    name: 'Aniket Chaudhary',
    service: 'Enterprise MVP Engineering',
    initials: 'AC',
    stars: 5,
    quote:
      'A huge special thanks to the Avaura team for being incredibly kind, professional, and supportive throughout our entire journey. Everything went smoothly from system architecture to production launch. The experience was completely hassle-free, and the results exceeded all expectations.',
    createdAt: '2026-03-14T09:00:00.000Z',
  },
];

/**
 * Merges lists while deduplicating by normalized name + start of quote,
 * keeping the most complete or latest entry.
 */
function mergeFeedbacks(...lists) {
  const map = new Map();

  // Process lists in priority order (first lists override later lists)
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (!item || !item.name || !item.quote) continue;
      const cleanName = item.name.trim().toLowerCase();
      const cleanQ = sanitizeQuote(item.quote).toLowerCase().slice(0, 40);
      const key = `${cleanName}::${cleanQ}`;

      if (!map.has(key)) {
        map.set(key, {
          id: item.id || `fb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: item.name.trim(),
          service: item.service && item.service.trim() ? item.service.trim() : 'Digital Engineering',
          initials: item.initials || generateInitials(item.name),
          stars: Number(item.stars) || 5,
          quote: sanitizeQuote(item.quote),
          createdAt: item.createdAt || new Date().toISOString(),
        });
      }
    }
  }

  // Sort by createdAt descending (newest first)
  return Array.from(map.values()).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

let isSyncing = false;

export const feedbackService = {
  /**
   * Retrieve all feedbacks synchronously from memory/localStorage,
   * while initiating a background fetch from MongoDB Atlas.
   */
  getFeedbacks: () => {
    try {
      if (typeof window === 'undefined') return DEFAULT_FEEDBACKS;

      const stored = localStorage.getItem(STORAGE_KEY);
      let parsed = [];
      if (stored) {
        try {
          parsed = JSON.parse(stored);
        } catch {}
      }

      // Merge defaults with stored items to ensure defaults are always present
      const combined = mergeFeedbacks(parsed, DEFAULT_FEEDBACKS);

      // Trigger background sync with MongoDB Atlas
      feedbackService.syncFromBackend();

      return combined;
    } catch {
      return DEFAULT_FEEDBACKS;
    }
  },

  /**
   * Background sync from MongoDB Atlas via /api/feedback
   */
  syncFromBackend: async () => {
    if (isSyncing || typeof window === 'undefined') return;
    isSyncing = true;

    try {
      const res = await fetch('/api/feedback', {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const result = await res.json();
        if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
          const current = [];
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) current.push(...JSON.parse(raw));
          } catch {}

          const merged = mergeFeedbacks(result.data, current, DEFAULT_FEEDBACKS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

          // Broadcast to active views if count or items differ
          window.dispatchEvent(
            new CustomEvent(EVENT_NAME, { detail: { all: merged } })
          );
        }
      }
    } catch (err) {
      // Offline or local dev fallback
      console.debug('Feedback backend sync skipped:', err.message);
    } finally {
      isSyncing = false;
    }
  },

  /**
   * Add new feedback from client/visitor form
   * Saves optimistically to localStorage and persists to MongoDB Atlas.
   * @param {Object} feedbackData { name, service, quote, stars }
   */
  addFeedback: async (feedbackData) => {
    try {
      const cleanName = feedbackData.name.trim();
      const cleanQuoteText = sanitizeQuote(feedbackData.quote);
      const service =
        feedbackData.service && feedbackData.service.trim()
          ? feedbackData.service.trim()
          : 'Digital Engineering';
      const stars = Number(feedbackData.stars) || 5;
      const initials = generateInitials(cleanName);
      const tempId = `fb-${Date.now()}`;
      const nowIso = new Date().toISOString();

      const newFeedback = {
        id: tempId,
        name: cleanName,
        service,
        initials,
        stars,
        quote: cleanQuoteText,
        createdAt: nowIso,
      };

      // 1. Optimistically add to top of local storage
      const current = feedbackService.getFeedbacks();
      const updated = mergeFeedbacks([newFeedback], current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // 2. Broadcast immediately so the current page & other tabs focus on the new review
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('avaura_new_review_submitted', 'true');
        } catch {}

        window.dispatchEvent(
          new CustomEvent(EVENT_NAME, {
            detail: {
              feedback: newFeedback,
              all: updated,
              isNewSubmission: true,
            },
          })
        );
      }

      // 3. Persist to MongoDB Atlas via /api/feedback
      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: cleanName,
            service,
            stars,
            quote: cleanQuoteText,
          }),
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.success && resData.data) {
            const confirmedItem = {
              ...newFeedback,
              id: resData.data.id || newFeedback.id,
              createdAt: resData.data.createdAt || newFeedback.createdAt,
            };

            const reconciled = updated.map((item) =>
              item.id === tempId ? confirmedItem : item
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reconciled));

            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent(EVENT_NAME, {
                  detail: {
                    feedback: confirmedItem,
                    all: reconciled,
                    isNewSubmission: true,
                  },
                })
              );
            }

            return { success: true, data: confirmedItem };
          }
        }
      } catch (postErr) {
        console.warn('MongoDB Atlas feedback POST warning:', postErr.message);
      }

      return { success: true, data: newFeedback };
    } catch (err) {
      console.error('Failed to save feedback:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Listen for updates to feedback (from form submissions, MongoDB sync, or other tabs)
   */
  subscribe: (callback) => {
    if (typeof window === 'undefined') return () => {};

    const handleCustom = (e) => {
      if (e && e.detail && e.detail.all) {
        callback(e.detail.all, e.detail.isNewSubmission);
      } else {
        callback(feedbackService.getFeedbacks(), false);
      }
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        callback(feedbackService.getFeedbacks(), false);
      }
    };

    window.addEventListener(EVENT_NAME, handleCustom);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  },
};

export default feedbackService;
