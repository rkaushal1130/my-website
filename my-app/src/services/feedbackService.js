/**
 * Client Feedback Service for Avaura
 * Handles default testimonials, persistent storage via localStorage,
 * and event dispatching so feedback submitted on the Contact page
 * automatically and instantly appears on the Portfolio page.
 */

const STORAGE_KEY = 'avaura_client_feedbacks_v2';
const EVENT_NAME = 'avaura-feedback-updated';

export const DEFAULT_FEEDBACKS = [
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

const generateInitials = (name) => {
  if (!name) return 'CL';
  const clean = name.trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

export const feedbackService = {
  /**
   * Retrieve all feedbacks. Combines user-submitted feedbacks with default ones.
   */
  getFeedbacks: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FEEDBACKS));
        return DEFAULT_FEEDBACKS;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return DEFAULT_FEEDBACKS;
    } catch {
      return DEFAULT_FEEDBACKS;
    }
  },

  /**
   * Add new feedback from client/visitor form
   * @param {Object} feedbackData { name, service, quote, stars }
   */
  addFeedback: (feedbackData) => {
    try {
      const current = feedbackService.getFeedbacks();
      const newFeedback = {
        id: `fb-${Date.now()}`,
        name: feedbackData.name.trim(),
        service: feedbackData.service && feedbackData.service.trim() ? feedbackData.service.trim() : 'Digital Engineering',
        initials: generateInitials(feedbackData.name),
        stars: Number(feedbackData.stars) || 5,
        quote: feedbackData.quote.trim(),
        createdAt: new Date().toISOString(),
      };

      const updated = [newFeedback, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Broadcast update across current page and tabs
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(EVENT_NAME, { detail: { feedback: newFeedback, all: updated } })
        );
      }

      return { success: true, data: newFeedback };
    } catch (err) {
      console.error('Failed to save feedback:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Listen for updates to feedback (from form submissions or other tabs)
   */
  subscribe: (callback) => {
    if (typeof window === 'undefined') return () => {};

    const handleCustom = (e) => {
      if (e && e.detail && e.detail.all) {
        callback(e.detail.all);
      } else {
        callback(feedbackService.getFeedbacks());
      }
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        callback(feedbackService.getFeedbacks());
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
