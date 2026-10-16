import type { Request, Response, NextFunction } from 'express';
import ticketService from './ticket.service.js';
import type { CreateTicketInput } from './ticket.schema.js';

const getTickets = async (_req: Request, res: Response) => {
  const tickets = await ticketService.getAllTickets();

  res.status(200).json({
    data: tickets,
  });
};

const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ticket = await ticketService.createTicket(
      req.body as CreateTicketInput,
    );

    res.status(201).json({
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      res.status(400).json({
        error: {
          code: 'INVALID_TICKET_ID',
          message: 'Ticket ID must be a single string',
        },
      });
      return;
    }

    const ticket = await ticketService.getTicketById(id);

    if (!ticket) {
      res.status(404).json({
        error: {
          code: 'TICKET_NOT_FOUND',
          message: 'Ticket not found',
        },
      });
      return;
    }

    res.status(200).json({
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getTickets,
  createTicket,
  getTicketById,
};
