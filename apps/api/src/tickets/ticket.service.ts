import ticketRepository from './ticket.repository.js';
import type { CreateTicketInput } from './ticket.schema.js';
const getAllTickets = async () => {
  return await ticketRepository.findAllTickets();
};

const createTicket = async (input: CreateTicketInput) => {
  return await ticketRepository.createTicket({ ...input, status: 'open' });
};

const getTicketById = async (id: string) => {
  return await ticketRepository.findTicketById(id);
};

export default { getAllTickets, createTicket, getTicketById };
