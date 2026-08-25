import { z } from 'zod';

export const createJobApplicationSchema = z.object({
  body: z.object({
    roleId: z.string().optional(),
    roleTitle: z.string().min(2, 'Role title is required').max(100),
    applicantName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please provide a valid email address'),
    phone: z.string().max(30).optional(),
    linkedinUrl: z.string().url('Please provide a valid LinkedIn URL').optional().or(z.literal('')),
    portfolioUrl: z.string().url('Please provide a valid URL').optional().or(z.literal('')),
    resumeUrl: z.string().optional(),
    coverNote: z.string().max(3000).optional(),
  }),
});

export type CreateJobApplicationInput = z.infer<typeof createJobApplicationSchema>['body'];
