import { test } from 'node:test';
import assert from 'node:assert/strict';
import 'dotenv/config';
import ticketRepository from './ticket.repository.js';

test('findAllTickets returns tickets from PostgreSQL', async () => {
  const tickets = await ticketRepository.findAllTickets();

  assert.ok(Array.isArray(tickets));
  assert.ok(tickets.length > 0, 'Expected at least one ticket');
  for (const ticket of tickets) {
    assert.equal(typeof ticket.id, 'string');
    assert.equal(typeof ticket.subject, 'string');
    assert.equal(typeof ticket.description, 'string');
    assert.equal(typeof ticket.createdAt, 'string');
    assert.ok(!Number.isNaN(Date.parse(ticket.createdAt)));
  }
});
