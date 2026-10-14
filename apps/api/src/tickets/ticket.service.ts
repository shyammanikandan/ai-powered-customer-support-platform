import ticketRepository from './ticket.repository.js';

const getAllTickets = () => {
  return ticketRepository.findAllTickets();
};

export default { getAllTickets };
