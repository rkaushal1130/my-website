import { z } from 'zod';

export const createContactInquirySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please provide a valid email address'),
    company: z.string().max(100).optional(),
    service: z.string().max(100).optional(),
    budget: z.string().max(50).optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  }),
});

export type CreateContactInquiryInput = z.infer<typeof createContactInquirySchema>['body'];
