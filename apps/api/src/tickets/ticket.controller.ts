import type { Request, Response } from 'express';
import ticketService from './ticket.service.js';

const getTickets = (_req: Request, res: Response) => {
  const tickets = ticketService.getAllTickets();
  res.status(200).json({
    data: tickets,
  });
};

export default { getTickets };
