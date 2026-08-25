import { z } from 'zod';
import { slugify } from './project.validator';

export { slugify };

export const createJobSchema = z.object({
  body: z
    .object({
      title: z
        .string({ required_error: 'Job title is required' })
        .min(2, 'Job title must be at least 2 characters')
        .max(200, 'Job title cannot exceed 200 characters')
        .trim(),
      slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(200, 'Slug cannot exceed 200 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
        .optional(),
      department: z
        .string({ required_error: 'Department is required' })
        .min(2, 'Department must be at least 2 characters')
        .max(100, 'Department cannot exceed 100 characters')
        .trim(),
      location: z
        .string({ required_error: 'Location is required' })
        .min(2, 'Location must be at least 2 characters')
        .max(100, 'Location cannot exceed 100 characters')
        .trim(),
      employmentType: z
        .string({ required_error: 'Employment type is required' })
        .min(2, 'Employment type must be at least 2 characters')
        .max(50, 'Employment type cannot exceed 50 characters')
        .trim(),
      description: z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be at least 10 characters')
        .max(20000, 'Description cannot exceed 20000 characters')
        .trim(),
      requirements: z
        .string({ required_error: 'Requirements are required' })
        .min(10, 'Requirements must be at least 10 characters')
        .max(20000, 'Requirements cannot exceed 20000 characters')
        .trim(),
      salaryRange: z
        .string()
        .max(100, 'Salary range cannot exceed 100 characters')
        .optional()
        .or(z.literal(''))
        .nullable(),
      published: z.boolean().optional().default(false),
    })
    .strict(),
});

export const updateJobSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Job ID is required'),
  }),
  body: z
    .object({
      title: z
        .string()
        .min(2, 'Job title must be at least 2 characters')
        .max(200, 'Job title cannot exceed 200 characters')
        .trim()
        .optional(),
      slug: z
        .string()
        .min(2, 'Slug must be at least 2 characters')
        .max(200, 'Slug cannot exceed 200 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
        .optional(),
      department: z
        .string()
        .min(2, 'Department must be at least 2 characters')
        .max(100, 'Department cannot exceed 100 characters')
        .trim()
        .optional(),
      location: z
        .string()
        .min(2, 'Location must be at least 2 characters')
        .max(100, 'Location cannot exceed 100 characters')
        .trim()
        .optional(),
      employmentType: z
        .string()
        .min(2, 'Employment type must be at least 2 characters')
        .max(50, 'Employment type cannot exceed 50 characters')
        .trim()
        .optional(),
      description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(20000, 'Description cannot exceed 20000 characters')
        .trim()
        .optional(),
      requirements: z
        .string()
        .min(10, 'Requirements must be at least 10 characters')
        .max(20000, 'Requirements cannot exceed 20000 characters')
        .trim()
        .optional(),
      salaryRange: z
        .string()
        .max(100, 'Salary range cannot exceed 100 characters')
        .optional()
        .or(z.literal(''))
        .nullable(),
      published: z.boolean().optional(),
    })
    .strict(),
});

export const jobSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Job slug is required'),
  }),
});

export const jobIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Job ID is required'),
  }),
});

export const listJobsQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Math.max(1, parseInt(val, 10) || 1) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10) || 12)) : 12)),
    department: z.string().optional(),
    location: z.string().optional(),
    employmentType: z.string().optional(),
    published: z
      .string()
      .optional()
      .transform((val) => (val === undefined ? undefined : val === 'true' || val === '1')),
    search: z.string().optional(),
  }),
});

export type CreateJobInput = z.infer<typeof createJobSchema>['body'];
export type UpdateJobInput = z.infer<typeof updateJobSchema>['body'];
export type ListJobsQueryInput = z.infer<typeof listJobsQuerySchema>['query'];
