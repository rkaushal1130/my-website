import { prisma, withDbFallback } from '../config/prisma';
import { CreateProjectInput, UpdateProjectInput, slugify } from '../validators/project.validator';
import { logger } from '../utils/logger';

export class DuplicateSlugError extends Error {
  public statusCode = 409;
  constructor(message = 'A project with this slug already exists.') {
    super(message);
    this.name = 'DuplicateSlugError';
  }
}

export interface ListProjectFilters {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  published?: boolean;
  search?: string;
}

// Dev in-memory store fallback for offline mode
const devProjectsStore: any[] = [
  {
    id: 'proj-00000000-0000-0000-0000-000000000001',
    title: 'Aegis Neural Mesh — Autonomous Multi-Agent Swarm',
    slug: 'aegis-neural-mesh',
    description:
      'A multi-agent autonomous framework coordinating thousands of concurrent transport routing decisions across 42 international trade corridors with zero human intervention.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & AUTOMATION',
    featured: true,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000002',
    title: 'Nexus Prime — High-Performance 3D Enterprise Portal',
    slug: 'nexus-prime-web',
    description:
      'Next-generation responsive web application pairing Three.js hardware-accelerated shaders with sub-300ms global SSR page loads and dynamic dark mode visual architectures.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    category: 'WEB DEVELOPMENT',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000003',
    title: 'Aura UI/UX — Cyberpunk Generative Design System',
    slug: 'aura-design-system',
    description:
      'A comprehensive, futuristic UI/UX design architecture featuring glassmorphism surfaces, neon glow utilities, mathematical typographic scales, and fluid responsive behaviors.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    category: 'UI/UX',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000004',
    title: 'CogniCore — Enterprise Vector Graph & Synthesis SaaS',
    slug: 'cognicore-knowledge-graph',
    description:
      'Air-gapped enterprise SaaS intelligence architecture synthesizing financial disclosures, complex contracts, SEC filings, and proprietary research into instant verified analysis.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'SAAS',
    featured: true,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000005',
    title: 'SpectraMed BioScan — Multi-Modal Diagnostic Solution',
    slug: 'spectramed-bioscan',
    description:
      'FDA-ready multi-modal digital healthcare solution classifying MRI, CT, and histological scans to detect early-stage oncological markers.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    category: 'DIGITAL SOLUTIONS',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000006',
    title: 'Vortex Vision 4K — Sub-Millimeter Edge Inspection',
    slug: 'vortex-vision-4k',
    description:
      'Real-time tensor-accelerated computer vision system deployed directly onto automated cleanroom production lines, classifying nanoscale silicon wafer anomalies in 8ms.',
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & AUTOMATION',
    featured: true,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000007',
    title: 'Apex Trading Engine — Real-Time WebSocket Web App',
    slug: 'apex-fintech-trading',
    description:
      'A low-latency financial trading web application handling high-frequency market tick feeds, dynamic depth charts, and automated algorithmic order triggers.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    category: 'WEB DEVELOPMENT',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000008',
    title: 'HyperFlow — Autonomous Financial Decision SaaS',
    slug: 'hyperflow-agentic-erp',
    description:
      'Autonomous financial agent network processing multi-currency invoices, ledger reconciliation, and predictive cash flow liquidity optimization across 80 international subsidiaries.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'SAAS',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000009',
    title: 'Quantum Spatial OS — 3D Cybernetic Analytics UI',
    slug: 'spatial-os-interface',
    description:
      'Next-generation mission command UI/UX design featuring dark tactical surfaces, holographic spatial telemetry charts, and intuitive operator focal controls.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    category: 'UI/UX',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000010',
    title: 'NeuroEdge Tensor Hub — Ultra-Low Power Industrial IoT',
    slug: 'neuroedge-tensor-hub',
    description:
      'Extreme-efficiency micro-neural model for robotic arm safety geofencing and dynamic obstacle avoidance operating in ultra-constrained embedded environments.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    category: 'DIGITAL SOLUTIONS',
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class ProjectService {
  /**
   * Creates a new project in PostgreSQL with unique slug constraint.
   */
  public static async createProject(input: CreateProjectInput) {
    const finalSlug = (input.slug ? slugify(input.slug) : slugify(input.title)).trim();

    if (!finalSlug) {
      throw new Error('Valid slug or title is required.');
    }

    const data = {
      title: input.title.trim(),
      slug: finalSlug,
      description: input.description.trim(),
      image: input.image || null,
      category: input.category.trim(),
      featured: input.featured ?? false,
      published: input.published ?? false,
    };

    return withDbFallback(
      async () => {
        const existing = await prisma.project.findUnique({
          where: { slug: finalSlug },
        });

        if (existing) {
          throw new DuplicateSlugError(`A project with slug "${finalSlug}" already exists.`);
        }

        const project = await prisma.project.create({ data });
        logger.info(`Project created: ${project.id} (${project.slug})`);
        return project;
      },
      async () => {
        const devExisting = devProjectsStore.find((p) => p.slug === finalSlug);
        if (devExisting) {
          throw new DuplicateSlugError(`A project with slug "${finalSlug}" already exists.`);
        }

        const newProject = {
          id: `dev-proj-${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devProjectsStore.push(newProject);
        return newProject;
      }
    );
  }

  /**
   * Retrieves public published projects.
   */
  public static async getPublishedProjects(filters: ListProjectFilters = {}) {
    return this.listProjects({ ...filters, published: true }, false);
  }

  /**
   * Retrieves all projects for administrative view.
   */
  public static async getAllProjects(filters: ListProjectFilters = {}) {
    return this.listProjects(filters, true);
  }

  /**
   * Retrieves paginated projects with optional category/text filters.
   */
  public static async listProjects(filters: ListProjectFilters = {}, isAdmin: boolean = false) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 50;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (!isAdmin) {
      where.published = true;
    } else if (filters.published !== undefined) {
      where.published = filters.published;
    }

    if (filters.category && filters.category.trim()) {
      where.category = {
        contains: filters.category.trim(),
        mode: 'insensitive',
      };
    }

    if (typeof filters.featured === 'boolean') {
      where.featured = filters.featured;
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim();
      where.OR = [
        { title: { contains: term, mode: 'insensitive' } },
        { description: { contains: term, mode: 'insensitive' } },
        { category: { contains: term, mode: 'insensitive' } },
      ];
    }

    return withDbFallback(
      async () => {
        const [total, items] = await prisma.$transaction([
          prisma.project.count({ where }),
          prisma.project.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
          }),
        ]);

        return {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      },
      async () => {
        let items = [...devProjectsStore];
        if (!isAdmin) {
          items = items.filter((p) => p.published);
        } else if (filters.published !== undefined) {
          items = items.filter((p) => p.published === filters.published);
        }
        if (filters.category && filters.category.trim()) {
          items = items.filter((p) =>
            p.category.toLowerCase().includes(filters.category!.toLowerCase().trim())
          );
        }
        if (typeof filters.featured === 'boolean') {
          items = items.filter((p) => p.featured === filters.featured);
        }
        if (filters.search && filters.search.trim()) {
          const term = filters.search.toLowerCase().trim();
          items = items.filter(
            (p) =>
              p.title.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              p.category.toLowerCase().includes(term)
          );
        }

        const total = items.length;
        const paginatedItems = items.slice(skip, skip + limit);

        return {
          items: paginatedItems,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      }
    );
  }

  /**
   * Looks up a single project by unique slug.
   */
  public static async findBySlug(slug: string, isAdmin: boolean = false) {
    const normalizedSlug = slug.toLowerCase().trim();

    return withDbFallback(
      async () => {
        const where: any = { slug: normalizedSlug };
        if (!isAdmin) {
          where.published = true;
        }
        return await prisma.project.findFirst({ where });
      },
      async () => {
        const dev = devProjectsStore.find(
          (p) => p.slug === normalizedSlug && (isAdmin || p.published)
        );
        return dev || null;
      }
    );
  }

  /**
   * Updates an existing project by ID.
   */
  public static async updateProject(id: string, input: UpdateProjectInput) {
    const updateData: any = {};
    if (input.title !== undefined) updateData.title = input.title.trim();
    if (input.description !== undefined) updateData.description = input.description.trim();
    if (input.image !== undefined) updateData.image = input.image;
    if (input.category !== undefined) updateData.category = input.category.trim();
    if (input.featured !== undefined) updateData.featured = input.featured;
    if (input.published !== undefined) updateData.published = input.published;

    if (input.slug !== undefined || input.title !== undefined) {
      const rawSlug = input.slug !== undefined ? input.slug : input.title!;
      const finalSlug = slugify(rawSlug).trim();

      if (finalSlug) {
        updateData.slug = finalSlug;
      }
    }

    return withDbFallback(
      async () => {
        if (updateData.slug) {
          const existing = await prisma.project.findUnique({
            where: { slug: updateData.slug },
          });
          if (existing && existing.id !== id) {
            throw new DuplicateSlugError(`A project with slug "${updateData.slug}" already exists.`);
          }
        }

        const updated = await prisma.project.update({
          where: { id },
          data: updateData,
        });
        logger.info(`Project updated: ${updated.id} (${updated.slug})`);
        return updated;
      },
      async () => {
        const index = devProjectsStore.findIndex((p) => p.id === id);
        if (index === -1) return null;

        if (updateData.slug) {
          const slugConflict = devProjectsStore.find(
            (p) => p.slug === updateData.slug && p.id !== id
          );
          if (slugConflict) {
            throw new DuplicateSlugError(`A project with slug "${updateData.slug}" already exists.`);
          }
        }

        const updated = {
          ...devProjectsStore[index],
          ...updateData,
          updatedAt: new Date(),
        };
        devProjectsStore[index] = updated;
        return updated;
      }
    );
  }

  /**
   * Deletes a project by ID.
   */
  public static async deleteProject(id: string) {
    return withDbFallback(
      async () => {
        const deleted = await prisma.project.delete({ where: { id } });
        logger.info(`Project deleted: ${deleted.id}`);
        return deleted;
      },
      async () => {
        const index = devProjectsStore.findIndex((p) => p.id === id);
        if (index === -1) return null;
        const [deleted] = devProjectsStore.splice(index, 1);
        return deleted;
      }
    );
  }
}
