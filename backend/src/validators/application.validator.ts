import { z } from 'zod';

export const createApplicationSchema = z.object({
  body: z
    .object({
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
      phone: z
        .string()
        .min(7, 'Phone number must be at least 7 digits')
        .max(30, 'Phone number cannot exceed 30 characters')
        .regex(/^[+0-9\s\-()]+$/, 'Please provide a valid phone number format')
        .optional()
        .or(z.literal(''))
        .nullable(),
      role: z.string().max(150).trim().optional().or(z.literal('')).nullable(),
      roleTitle: z.string().max(150).trim().optional().or(z.literal('')).nullable(),
      jobTitle: z.string().max(150).trim().optional().or(z.literal('')).nullable(),
      jobId: z.string().max(150).trim().optional().or(z.literal('')).nullable(),
      experience: z.string().max(100).trim().optional().or(z.literal('')).nullable(),
      portfolio: z.string().max(500).trim().optional().or(z.literal('')).nullable(),
      portfolioUrl: z.string().max(500).trim().optional().or(z.literal('')).nullable(),
      linkedinUrl: z.string().max(500).trim().optional().or(z.literal('')).nullable(),
      resume: z.string().max(500).trim().optional().or(z.literal('')).nullable(),
      resumeUrl: z.string().max(500).trim().optional().or(z.literal('')).nullable(),
      introduction: z.string().max(10000).trim().optional().or(z.literal('')).nullable(),
      coverLetter: z.string().max(10000).trim().optional().or(z.literal('')).nullable(),
    })
    .refine(
      (data) =>
        Boolean(
          (data.introduction && data.introduction.trim().length >= 10) ||
          (data.coverLetter && data.coverLetter.trim().length >= 10)
        ),
      {
        message: 'Please provide a brief introduction (minimum 10 characters)',
        path: ['introduction'],
      }
    ),
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
