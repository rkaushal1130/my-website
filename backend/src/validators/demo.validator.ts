import { z } from 'zod';

export const createDemoRequestSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
    workEmail: z.string().email('Please provide a valid work email address'),
    companyName: z.string().min(2, 'Company name is required').max(100),
    companySize: z.string().max(50).optional(),
    primaryInterest: z.string().max(100).optional(),
    notes: z.string().max(2000).optional(),
  }),
});

export type CreateDemoRequestInput = z.infer<typeof createDemoRequestSchema>['body'];
