// Valid ticket creation
//  invalid request validation
// retrieve a ticket that doesn't exist

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
  it('updates selected fields of an existing ticket', async () => {
    const created = await request(app).post('/api/v1/tickets').send({
      subject: 'Ticket before update',
      description: 'Testing partial updates',
      priority: 'low',
    });

    const ticketId = created.body.data.id;

    const response = await request(app)
      .patch(`/api/v1/tickets/${ticketId}`)
      .send({
        subject: 'Ticket after update',
        status: 'in_progress',
      });

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(ticketId);
    expect(response.body.data.subject).toBe('Ticket after update');
    expect(response.body.data.status).toBe('in_progress');
    expect(response.body.data.priority).toBe('low');
    expect(response.body.data.description).toBe('Testing partial updates');
  });

  it('rejects an invalid ticket update', async () => {
    const created = await request(app).post('/api/v1/tickets').send({
      subject: 'Ticket for validation',
      description: 'Testing update validation',
      priority: 'medium',
    });

    const ticketId = created.body.data.id;

    const response = await request(app)
      .patch(`/api/v1/tickets/${ticketId}`)
      .send({
        priority: 'urgent',
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 404 when updating a ticket that does not exist', async () => {
    const response = await request(app)
      .patch('/api/v1/tickets/nonexistent-ticket-id')
      .send({
        subject: 'Updated subject',
      });

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('TICKET_NOT_FOUND');
  });

  it('lists tickets with default pagination', async () => {
    const response = await request(app).get('/api/v1/tickets');

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeLessThanOrEqual(20);
  });

  it('respects the requested pagination limit', async () => {
    const response = await request(app).get('/api/v1/tickets?limit=1&offset=0');

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeLessThanOrEqual(1);
  });

  it('rejects a pagination limit below the minimum', async () => {
    const response = await request(app).get('/api/v1/tickets?limit=0');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects a pagination limit above the maximum', async () => {
    const response = await request(app).get('/api/v1/tickets?limit=101');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects a negative pagination offset', async () => {
    const response = await request(app).get('/api/v1/tickets?offset=-1');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns an empty array when the offset exceeds available tickets', async () => {
    const response = await request(app).get(
      '/api/v1/tickets?limit=20&offset=1000000',
    );

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});
