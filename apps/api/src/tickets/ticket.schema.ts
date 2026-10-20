import { z } from 'zod';
import type { TicketStatus, Priority } from './ticket.types.js';

export const createTicketSchema = z.object({
  subject: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(5000),
  priority: z.enum(['low', 'medium', 'high']),
});

export const updateTicketSchema = z
  .object({
    subject: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).max(5000).optional(),
    status: z.enum(['open', 'in_progress', 'resolved']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const listTicketsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
