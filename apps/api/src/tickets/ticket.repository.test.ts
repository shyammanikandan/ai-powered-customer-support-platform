import { it, expect } from 'vitest';

import 'dotenv/config';
import ticketRepository from './ticket.repository.js';

it('findAllTickets returns tickets from PostgreSQL', async () => {
  const tickets = await ticketRepository.findAllTickets();

  expect(Array.isArray(tickets)).toBe(true);

  expect(tickets.length).toBeGreaterThan(0);

  for (const ticket of tickets) {
    expect(typeof ticket.id).toBe('string');
    expect(typeof ticket.subject).toBe('string');
    expect(typeof ticket.description).toBe('string');
    expect(typeof ticket.createdAt).toBe('string');
    expect(Number.isNaN(Date.parse(ticket.createdAt))).toBe(false);
  }
});
