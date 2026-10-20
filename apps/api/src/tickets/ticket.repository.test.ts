import { it, expect } from 'vitest';
import ticketRepository from './ticket.repository.js';

it('returns an array of tickets from PostgreSQL', async () => {
  const tickets = await ticketRepository.findAllTickets({
    limit: 20,
    offset: 0,
  });

  expect(Array.isArray(tickets)).toBe(true);

  for (const ticket of tickets) {
    expect(ticket.id).toBeDefined();
    expect(ticket.subject).toBeDefined();
    expect(ticket.description).toBeDefined();
    expect(ticket.status).toBeDefined();
    expect(ticket.priority).toBeDefined();
    expect(typeof ticket.createdAt).toBe('string');
    expect(Number.isNaN(Date.parse(ticket.createdAt))).toBe(false);
  }
});
