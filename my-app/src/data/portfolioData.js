/**
 * NeverquiT AI - Enterprise Reusable Project Data Structure & Normalizer
 *
 * Standard Project Schema:
 * {
 *   id: string,
 *   title: string,
 *   slug: string,
 *   category: string, // 'WEB DEVELOPMENT'
 *   shortDescription: string,
 *   description: string,
 *   image: string,
 *   languages: string[],      // Primary programming languages used (JS, TS, SQL, HTML/CSS)
 *   frontendTech: string[],   // React 19, Three.js, Vite, Tailwind CSS, etc.
 *   backendTech: string[],    // Node.js, Express.js, TypeScript, REST, Zod, JWT, etc.
 *   databaseTech: string[],   // PostgreSQL, Prisma ORM, Redis, MongoDB, etc.
 *   devopsTech: string[],     // Docker, Cloudflare, Git CI/CD, etc.
 *   technologies: string[],   // Unified array of all technologies
 *   featured: boolean,
 *   liveUrl?: string,
 *   githubUrl?: string,
 *   year: string | number
 * }
 */

export const PORTFOLIO_CATEGORIES = [
  'ALL',
  'WEB DEVELOPMENT',
];

/**
 * Normalizes any raw project (API response or custom object) into the standard project contract.
 * @param {Object} p Raw project object
 * @returns {Object} Standardized project data model
 */
export const normalizeProject = (p = {}) => {
  const rawTech = Array.isArray(p.technologies)
    ? p.technologies
    : Array.isArray(p.techStack)
    ? p.techStack
    : typeof p.technologies === 'string'
    ? p.technologies.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const rawLanguages = Array.isArray(p.languages)
    ? p.languages
    : typeof p.languages === 'string'
    ? p.languages.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const KNOWN_LANGUAGES = new Set([
    'JavaScript',
    'JavaScript (ES6+)',
    'TypeScript',
    'SQL',
    'HTML5',
    'CSS3',
    'GLSL',
    'GraphQL',
    'Python',
    'Rust',
    'Go',
  ]);

  const languages = rawLanguages.length > 0
    ? rawLanguages
    : rawTech.filter((t) => KNOWN_LANGUAGES.has(t));

  const finalLanguages = languages.length > 0
    ? languages
    : (p.language ? [p.language] : ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'HTML5/CSS3']);

  // Categorized tech stacks
  const frontendTech = Array.isArray(p.frontendTech) && p.frontendTech.length > 0
    ? p.frontendTech
    : ['React 19', 'Vite', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion'];

  const backendTech = Array.isArray(p.backendTech) && p.backendTech.length > 0
    ? p.backendTech
    : ['Node.js', 'Express.js', 'TypeScript', 'JWT Auth', 'Zod Validation'];

  const databaseTech = Array.isArray(p.databaseTech) && p.databaseTech.length > 0
    ? p.databaseTech
    : ['PostgreSQL', 'Prisma ORM', 'Redis Cache'];

  const devopsTech = Array.isArray(p.devopsTech) && p.devopsTech.length > 0
    ? p.devopsTech
    : ['Docker', 'Cloudflare Edge', 'Git CI/CD'];

  const allTechCombined = Array.from(
    new Set([
      ...finalLanguages,
      ...frontendTech,
      ...backendTech,
      ...databaseTech,
      ...devopsTech,
      ...rawTech,
    ])
  );

  const shortDescription =
    p.shortDescription ||
    p.tagline ||
    (p.description ? p.description.slice(0, 130).trim() + (p.description.length > 130 ? '...' : '') : 'High-impact enterprise JavaScript full-stack web solution.');

  const description = p.description || p.summary || shortDescription;

  const year = p.year
    ? String(p.year)
    : p.createdAt
    ? new Date(p.createdAt).getFullYear().toString()
    : '2026';

  const slug =
    p.slug ||
    (p.title
      ? p.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : `project-${Math.random().toString(36).substr(2, 6)}`);

  return {
    id: String(p.id || p._id || slug),
    title: p.title || 'Enterprise Web Solution',
    slug,
    category: 'WEB DEVELOPMENT',
    shortDescription,
    description,
    image:
      p.image ||
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    languages: finalLanguages,
    frontendTech,
    backendTech,
    databaseTech,
    devopsTech,
    technologies: allTechCombined,
    featured: Boolean(p.featured),
    liveUrl: p.liveUrl || p.url || '',
    githubUrl: p.githubUrl || p.github || '',
    year,

    // Auxiliary rich case-study metadata
    client: p.client || 'Enterprise Client',
    industry: p.industry || 'Web Technology & Cloud Applications',
    duration: p.duration || '3 Months',
    metrics: Array.isArray(p.metrics) ? p.metrics : [
      { label: 'Lighthouse Score', value: '100 / 100', highlight: true },
      { label: 'API Response Time', value: '< 12ms', highlight: true },
      { label: 'Database Queries', value: 'Strict ACID', highlight: false },
      { label: 'Edge Latency', value: '< 30ms TTFB', highlight: false },
    ],
    challenge: p.challenge || 'Scaling web application performance, interactive animations, and responsive reliability across global user bases.',
    solution: p.solution || 'Engineered a modern, hardware-accelerated frontend architecture delivering sub-second loads and fluid 60fps experiences.',
    architecture: Array.isArray(p.architecture) ? p.architecture : [
      'Hardware-Accelerated Three.js WebGL Particle & Mesh Shaders',
      'Vite & Rolldown Optimized Code Splitting (< 90KB initial bundle)',
      'Node.js & Express REST Engine with Zod & Rate Limiters',
      'Prisma ORM with PostgreSQL Relational Schema & Redis Caching',
    ],
    quote: p.quote || {
      text: 'The full-stack JavaScript platform built by NeverquiT AI redefined our brand prestige while delivering sub-millisecond API speeds and a 100/100 Lighthouse score.',
      author: 'VP of Product Engineering, Cybertronics Global',
    },
  };
};

/**
 * Flagship Full-Stack JavaScript & Modern Web Development Projects
 */
export const PORTFOLIO_PROJECTS = [
  normalizeProject({
    id: 'nexus-prime-web',
    slug: 'nexus-prime-web',
    title: 'Nexus Prime — High-Performance 3D Enterprise Portal',
    category: 'WEB DEVELOPMENT',
    shortDescription: 'Ultra-fast WebGL & React 19 web platform with real-time Node.js Express telemetry and Prisma/Postgres database.',
    description:
      'Next-generation responsive full-stack web application pairing Three.js hardware-accelerated shaders with sub-12ms Node.js API response times, strict Prisma ORM migrations, and PostgreSQL relational data persistence.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    languages: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'GLSL', 'HTML5/CSS3'],
    frontendTech: ['React 19', 'Vite', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion'],
    backendTech: ['Node.js', 'Express.js', 'TypeScript', 'JWT HttpOnly', 'Zod Validation', 'Helmet'],
    databaseTech: ['PostgreSQL', 'Prisma ORM', 'Redis Cache', 'Connection Pooling'],
    devopsTech: ['Docker', 'Cloudflare Edge CDN', 'Git CI/CD', 'Vercel'],
    featured: true,
    liveUrl: 'https://neverquit.ai',
    githubUrl: 'https://github.com/neverquit-ai',
    year: '2026',
    client: 'Cybertronics Global Tech',
    industry: 'Enterprise Software & DeepTech',
    duration: '2.5 Months',
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100', highlight: true },
      { label: 'API Latency', value: '< 11.4ms', highlight: true },
      { label: 'Database Throughput', value: '14,500 QPS', highlight: false },
      { label: 'Global Edge CDN', value: '320+ PoPs', highlight: false },
    ],
    challenge:
      'Legacy web applications suffered from heavy bundle bloat, sluggish mobile rendering, fragile database queries without type safety, and poor Core Web Vitals that penalized global enterprise conversions.',
    solution:
      'Built a unified JavaScript/TypeScript full-stack architecture using React 19, Vite, GPU shader instancing, Node.js Express REST API, and Prisma ORM backed by PostgreSQL and Redis caching.',
    architecture: [
      'Hardware-Accelerated Three.js WebGL Particle & Mesh Shaders',
      'Vite & Rolldown Optimized Code Splitting (< 88KB initial bundle)',
      'Layered Node.js Express REST Architecture with Rate Limiting & Helmet',
      'Prisma ORM Schema Migrations & ACID PostgreSQL Relational Storage',
      'Redis Sub-Millisecond Cache Invalidation & Session Management',
    ],
    quote: {
      text: 'The full-stack platform built by NeverquiT AI redefined our brand prestige while delivering a flawless 100/100 Lighthouse performance score and instant database queries.',
      author: 'VP of Product Engineering, Cybertronics Global',
    },
  }),

  normalizeProject({
    id: 'aetherflow-automation',
    slug: 'aetherflow-automation',
    title: 'AetherFlow — Real-Time Autonomous Workflow Engine',
    category: 'WEB DEVELOPMENT',
    shortDescription: 'Interactive workflow orchestrator built with React, WebSockets, Node.js microservices, and MongoDB/Redis streaming.',
    description:
      'Enterprise workflow management portal delivering real-time task automation, bi-directional WebSocket telemetry, dynamic visual node graphs, and low-latency document storage.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    languages: ['JavaScript (ES6+)', 'TypeScript', 'JSON/GraphQL', 'HTML5/CSS3'],
    frontendTech: ['React 19', 'Zustand State', 'Tailwind CSS', 'Vite', 'Lucide React'],
    backendTech: ['Node.js', 'Express.js', 'Socket.io', 'GraphQL Apollo', 'Zod'],
    databaseTech: ['MongoDB', 'Mongoose ODM', 'Redis Pub/Sub', 'pgvector AI'],
    devopsTech: ['Docker Compose', 'GitHub Actions CI/CD', 'AWS ECS'],
    featured: true,
    liveUrl: 'https://neverquit.ai',
    githubUrl: 'https://github.com/neverquit-ai',
    year: '2026',
    client: 'AetherFlow Intelligent Systems',
    industry: 'Autonomous SaaS & Cloud Workflows',
    duration: '3.0 Months',
    metrics: [
      { label: 'Event Latency', value: '< 4ms', highlight: true },
      { label: 'Socket Concurrency', value: '50,000+', highlight: true },
      { label: 'Data Accuracy', value: '99.999%', highlight: false },
      { label: 'Uptime Reliability', value: '99.98%', highlight: false },
    ],
    challenge:
      'Managing massive parallel asynchronous worker events while maintaining responsive 60fps graph visualizations on the client side without memory leaks.',
    solution:
      'Engineered an event-driven Node.js & Socket.io streaming pipeline with Redis Pub/Sub backplanes and an optimized React Zustand state layer.',
    architecture: [
      'Bi-directional Socket.io & WebSocket Streaming Telemetry Gateway',
      'Redis Distributed Pub/Sub Message Bus with TTL Deduplication',
      'Mongoose ODM Schema Hooks & Dynamic JSON Document Storage',
      'React Zustand High-Frequency Immutable State Dispatchers',
    ],
    quote: {
      text: 'AetherFlow transformed our real-time visibility. Sub-4ms WebSocket propagation with Node.js has given us complete operational command.',
      author: 'Chief Technology Officer, AetherFlow Systems',
    },
  }),

  normalizeProject({
    id: 'cybercore-dashboard',
    slug: 'cybercore-dashboard',
    title: 'CyberCore — Enterprise Microservices & Security Console',
    category: 'WEB DEVELOPMENT',
    shortDescription: 'Cybersecurity operations console with JWT HttpOnly authentication, REST API rate-limiting, and PostgreSQL audit logging.',
    description:
      'High-security administrative platform pairing strict RBAC permission models, audit trail logging, real-time threat maps, and hardened REST endpoints.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    languages: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'HTML5/CSS3'],
    frontendTech: ['React 19', 'Tailwind CSS', 'Chart.js / Canvas', 'Vite', 'Framer Motion'],
    backendTech: ['Node.js', 'Express.js', 'TypeScript', 'Bcrypt(12)', 'JWT HttpOnly', 'Express-Rate-Limit'],
    databaseTech: ['PostgreSQL', 'Prisma ORM', 'Redis Session Store'],
    devopsTech: ['Docker', 'Nginx Reverse Proxy', 'Cloudflare WAF'],
    featured: false,
    liveUrl: 'https://neverquit.ai',
    githubUrl: 'https://github.com/neverquit-ai',
    year: '2026',
    client: 'CyberCore Defense Labs',
    industry: 'Cybersecurity & Cloud Compliance',
    duration: '2.0 Months',
    metrics: [
      { label: 'Security Score', value: 'A+ (SSLLabs)', highlight: true },
      { label: 'Auth Validation', value: '< 2.1ms', highlight: true },
      { label: 'Threat Block Rate', value: '100%', highlight: false },
      { label: 'Audit Compliance', value: 'SOC 2 / ISO', highlight: false },
    ],
    challenge:
      'Zero-trust security compliance requiring cryptographic token rotation, strict rate limiting per IP/User, and immutable PostgreSQL audit logs.',
    solution:
      'Architected Express.js security middlewares with Helmet, Bcrypt(12), HttpOnly SameSite cookie sessions, and Prisma transactional audit logs.',
    architecture: [
      'Layered Express Security Pipeline with Tiered Sliding Rate Limiters',
      'Stateless Cryptographic JWT Authentication with Automatic Refresh Rotation',
      'Prisma ORM Transactional Audit Trails in Partitioned PostgreSQL Tables',
      'Redis In-Memory Token Blacklist & Suspicious IP Quarantine',
    ],
    quote: {
      text: 'NeverquiT AI built a bulletproof console. Their full-stack TypeScript and Express architecture passed all enterprise penetration tests on day one.',
      author: 'Head of Information Security, CyberCore Labs',
    },
  }),
];
