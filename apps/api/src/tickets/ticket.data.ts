import type { Ticket } from './ticket.types.js';

export const tickets: Ticket[] = [
  {
    id: 'ticket-001',
    subject: 'Unable to log in',
    description: 'Customer cannot access their account.',
    status: 'open',
    priority: 'high',
    createdAt: '2026-10-14T09:00:00.000Z',
  },
  {
    id: 'ticket-002',
    subject: 'Invoice has incorrect amount',
    description: 'Customer reports an unexpected charge.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-10-14T09:30:00.000Z',
  },
  {
    id: 'ticket-003',
    subject: 'Update contact email',
    description: 'Customer wants to change their email address.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-10-14T10:00:00.000Z',
  },
];
