import { z } from 'zod';

export const createApplicationSchema = z.object({
  body: z
    .object({
      jobId: z.string().min(1, 'Job ID cannot be empty').optional().or(z.literal('')).nullable(),
      jobTitle: z
        .string()
        .min(2, 'Job title must be at least 2 characters')
        .max(100, 'Job title cannot exceed 100 characters')
        .trim()
        .optional(),
      name: z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .trim(),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Please provide a valid email address')
        .max(150, 'Email cannot exceed 150 characters')
        .toLowerCase()
        .trim(),
      coverLetter: z
        .string({ required_error: 'Cover letter is required' })
        .min(10, 'Cover letter must be at least 10 characters')
        .max(10000, 'Cover letter cannot exceed 10000 characters')
        .trim(),
      phone: z
        .string()
        .min(7, 'Phone number must be at least 7 digits')
        .max(30, 'Phone number cannot exceed 30 characters')
        .regex(/^[+0-9\s\-()]+$/, 'Please provide a valid phone number format')
        .optional()
        .or(z.literal(''))
        .nullable(),
      resumeUrl: z
        .string()
        .url('Resume URL must be a valid file or cloud document URL (e.g. https://...)')
        .max(500, 'Resume URL cannot exceed 500 characters')
        .optional()
        .or(z.literal(''))
        .nullable(),
    })
    .strict(), // Disallow any arbitrary extraneous fields (prevents users from overriding status)
});

export const updateApplicationStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Application ID is required'),
  }),
  body: z
    .object({
      status: z.enum(['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'], {
        required_error: 'Status must be one of: RECEIVED, REVIEWING, SHORTLISTED, REJECTED, HIRED',
      }),
    })
    .strict(),
});

export const applicationIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Application ID is required'),
  }),
});

export const listApplicationsQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Math.max(1, parseInt(val, 10) || 1) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10) || 20)) : 20)),
    status: z.enum(['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED']).optional(),
    jobId: z.string().optional(),
    jobTitle: z.string().optional(),
    search: z.string().optional(),
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>['body'];
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>['body'];
export type ListApplicationsQueryInput = z.infer<typeof listApplicationsQuerySchema>['query'];
