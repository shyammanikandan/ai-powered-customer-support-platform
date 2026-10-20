import ticketRepository from './ticket.repository.js';
import type { CreateTicketInput } from './ticket.schema.js';

import type { UpdateTicketInput } from './ticket.schema.js';
import type { z } from 'zod';
import type { listTicketsQuerySchema } from './ticket.schema.js';

type ListTicketsQuery = z.infer<typeof listTicketsQuerySchema>;

const getAllTickets = async (query: ListTicketsQuery) => {
  return await ticketRepository.findAllTickets(query);
};

const createTicket = async (input: CreateTicketInput) => {
  return await ticketRepository.createTicket({ ...input, status: 'open' });
};

const getTicketById = async (id: string) => {
  return await ticketRepository.findTicketById(id);
};

const updateTicket = async (id: string, input: UpdateTicketInput) => {
  return await ticketRepository.updateTicket(id, input);
};

export default { getAllTickets, createTicket, getTicketById, updateTicket };
