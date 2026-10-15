import ticketRepository from './ticket.repository.js';

const getAllTickets = async () => {
  return await ticketRepository.findAllTickets();
};

export default { getAllTickets };
