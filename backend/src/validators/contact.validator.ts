import { z } from 'zod';

export const createContactSchema = z.object({
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
        .or(z.literal('')),
      company: z
        .string()
        .max(100, 'Company name cannot exceed 100 characters')
        .trim()
        .optional()
        .or(z.literal('')),
      service: z
        .string()
        .max(100, 'Service name cannot exceed 100 characters')
        .trim()
        .optional()
        .or(z.literal('')),
      message: z
        .string({ required_error: 'Message is required' })
        .min(5, 'Message must be at least 5 characters')
        .max(5000, 'Message cannot exceed 5000 characters')
        .trim(),
    })
    .strict(), // Disallow any arbitrary extraneous fields
});

export const listContactQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Math.max(1, parseInt(val, 10) || 1) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10) || 20)) : 20)),
    status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED']).optional(),
    search: z.string().optional(),
  }),
});

export const contactIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Message ID is required'),
  }),
});

export const updateContactStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Message ID is required'),
  }),
  body: z
    .object({
      status: z.enum(['NEW', 'READ', 'REPLIED', 'ARCHIVED'], {
        required_error: 'Status must be one of NEW, READ, REPLIED, or ARCHIVED',
      }),
    })
    .strict(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>['body'];
export type ListContactQueryInput = z.infer<typeof listContactQuerySchema>['query'];
export type UpdateContactStatusInput = z.infer<typeof updateContactStatusSchema>['body'];
