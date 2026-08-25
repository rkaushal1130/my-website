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
    title: 'Autonomous Enterprise AI Agent Platform',
    slug: 'autonomous-enterprise-ai-agent-platform',
    description:
      'Next-generation autonomous agent orchestration system enabling continuous multi-step reasoning, automated DevOps pipelines, and enterprise workflow execution with real-time feedback loops.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Autonomous Systems',
    featured: true,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'proj-00000000-0000-0000-0000-000000000002',
    title: 'Neural Cloud Infrastructure Optimizer',
    slug: 'neural-cloud-infrastructure-optimizer',
    description:
      'Self-healing Kubernetes control plane utilizing real-time anomaly detection, telemetry inference, and predictive autoscaling to reduce cloud compute expenditures by 42%.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'Cloud Engineering',
    featured: true,
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
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 12;
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
   * Looks up a project by unique ID.
   */
  public static async findById(id: string) {
    return withDbFallback(
      async () => {
        return await prisma.project.findUnique({ where: { id } });
      },
      async () => {
        return devProjectsStore.find((p) => p.id === id) || null;
      }
    );
  }

  /**
   * Updates an existing project and prevents slug collisions.
   */
  public static async updateProject(id: string, input: UpdateProjectInput) {
    return withDbFallback(
      async () => {
        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing) return null;

        const updateData: any = {};
        if (input.title !== undefined) updateData.title = input.title.trim();
        if (input.description !== undefined) updateData.description = input.description.trim();
        if (input.image !== undefined) updateData.image = input.image || null;
        if (input.category !== undefined) updateData.category = input.category.trim();
        if (typeof input.featured === 'boolean') updateData.featured = input.featured;
        if (typeof input.published === 'boolean') updateData.published = input.published;

        if (input.slug) {
          const newSlug = slugify(input.slug);
          if (newSlug !== existing.slug) {
            const slugConflict = await prisma.project.findFirst({
              where: { slug: newSlug, NOT: { id } },
            });
            if (slugConflict) {
              throw new DuplicateSlugError(`A project with slug "${newSlug}" already exists.`);
            }
            updateData.slug = newSlug;
          }
        }

        return await prisma.project.update({
          where: { id },
          data: updateData,
        });
      },
      async () => {
        const devIndex = devProjectsStore.findIndex((p) => p.id === id);
        if (devIndex === -1) return null;

        const dev = devProjectsStore[devIndex];
        if (input.slug) {
          const newSlug = slugify(input.slug);
          const conflict = devProjectsStore.find((p) => p.slug === newSlug && p.id !== id);
          if (conflict) {
            throw new DuplicateSlugError(`A project with slug "${newSlug}" already exists.`);
          }
          dev.slug = newSlug;
        }
        if (input.title !== undefined) dev.title = input.title.trim();
        if (input.description !== undefined) dev.description = input.description.trim();
        if (input.image !== undefined) dev.image = input.image || null;
        if (input.category !== undefined) dev.category = input.category.trim();
        if (typeof input.featured === 'boolean') dev.featured = input.featured;
        if (typeof input.published === 'boolean') dev.published = input.published;
        dev.updatedAt = new Date();

        return dev;
      }
    );
  }

  /**
   * Deletes a project by ID.
   */
  public static async deleteProject(id: string) {
    return withDbFallback(
      async () => {
        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing) return null;

        await prisma.project.delete({ where: { id } });
        logger.info(`Project ${id} deleted by administrator`);
        return true;
      },
      async () => {
        const devIndex = devProjectsStore.findIndex((p) => p.id === id);
        if (devIndex === -1) return null;
        devProjectsStore.splice(devIndex, 1);
        return true;
      }
    );
  }
}
