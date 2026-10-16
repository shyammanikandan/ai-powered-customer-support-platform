// Valid ticket creation
//  invalid request validation
// retrieve a ticket that doesn't exist

import 'dotenv/config';

import { describe, it, expect } from 'vitest';

import request from 'supertest';

import app from '../app.js';

describe('Ticket endpoints', () => {
  it('creates a ticket when a request is valid', async () => {
    const response = await request(app).post('/api/v1/tickets').send({
      subject: 'Test ticket',
      description: 'Created by an automated test',
      priority: 'medium',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.subject).toBe('Test ticket');
    expect(response.body.data.status).toBe('open');
    expect(response.body.data.id).toBeDefined();
  });

  it('rejects an invalid ticket request', async () => {
    const response = await request(app).post('/api/v1/tickets').send({
      subject: '   ',
      description: 'Test description',
      priority: 'urgent',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
  it('retrieves a ticket that exists', async () => {
    const created = await request(app).post('/api/v1/tickets').send({
      subject: 'Ticket to retrieve',
      description: 'Testing retrieval by ID',
      priority: 'low',
    });

    const ticketId = created.body.data.id;

    const response = await request(app).get(`/api/v1/tickets/${ticketId}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(ticketId);
    expect(response.body.data.subject).toBe('Ticket to retrieve');
  });
  it('returns 404 when a ticket does not exist', async () => {
    const response = await request(app).get(
      '/api/v1/tickets/nonexistent-ticket-id',
    );

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('TICKET_NOT_FOUND');
  });
});
