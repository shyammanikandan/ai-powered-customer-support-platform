import { z } from 'zod';

export const createTicketSchema = z.object({
  subject: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(5000),
  priority: z.enum(['low', 'medium', 'high']),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
