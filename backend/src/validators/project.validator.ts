import { z } from 'zod';

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export const createProjectSchema = z.object({
  body: z
    .object({
      title: z
        .string({ required_error: 'Title is required' })
        .min(2, 'Title must be at least 2 characters')
        .max(200, 'Title cannot exceed 200 characters')
        .trim(),
      slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(200, 'Slug cannot exceed 200 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g., ai-platform)')
        .optional(),
      description: z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be at least 10 characters')
        .max(10000, 'Description cannot exceed 10000 characters')
        .trim(),
      image: z
        .string()
        .max(500, 'Image URL cannot exceed 500 characters')
        .optional()
        .or(z.literal(''))
        .nullable(),
      category: z
        .string({ required_error: 'Category is required' })
        .min(2, 'Category must be at least 2 characters')
        .max(100, 'Category cannot exceed 100 characters')
        .trim(),
      featured: z.boolean().optional().default(false),
      published: z.boolean().optional().default(false),
    })
    .strict(),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Project ID is required'),
  }),
  body: z
    .object({
      title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(200, 'Title cannot exceed 200 characters')
        .trim()
        .optional(),
      slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(200, 'Slug cannot exceed 200 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g., ai-platform)')
        .optional(),
      description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(10000, 'Description cannot exceed 10000 characters')
        .trim()
        .optional(),
      image: z
        .string()
        .max(500, 'Image URL cannot exceed 500 characters')
        .optional()
        .or(z.literal(''))
        .nullable(),
      category: z
        .string()
        .min(2, 'Category must be at least 2 characters')
        .max(100, 'Category cannot exceed 100 characters')
        .trim()
        .optional(),
      featured: z.boolean().optional(),
      published: z.boolean().optional(),
    })
    .strict(),
});

export const projectSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required'),
  }),
});

export const projectIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Project ID is required'),
  }),
});

export const listProjectsQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Math.max(1, parseInt(val, 10) || 1) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10) || 12)) : 12)),
    category: z.string().optional(),
    featured: z
      .string()
      .optional()
      .transform((val) => (val === undefined ? undefined : val === 'true' || val === '1')),
    published: z
      .string()
      .optional()
      .transform((val) => (val === undefined ? undefined : val === 'true' || val === '1')),
    search: z.string().optional(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>['body'];
export type ListProjectsQueryInput = z.infer<typeof listProjectsQuerySchema>['query'];
