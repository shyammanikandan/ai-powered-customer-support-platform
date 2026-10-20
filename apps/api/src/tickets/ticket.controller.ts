import type { Request, Response, NextFunction } from 'express';
import ticketService from './ticket.service.js';
import type { CreateTicketInput, UpdateTicketInput } from './ticket.schema.js';
import { listTicketsQuerySchema } from './ticket.schema.js';

const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = listTicketsQuerySchema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid pagination parameters',
          details: result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
      });
      return;
    }

    const tickets = await ticketService.getAllTickets(result.data);

    res.status(200).json({ data: tickets });
  } catch (error) {
    next(error);
  }
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

const updateTicket = async (
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

    const ticket = await ticketService.updateTicket(
      id,
      req.body as UpdateTicketInput,
    );

    if (!ticket) {
      res.status(404).json({
        error: {
          code: 'TICKET_NOT_FOUND',
          message: 'Ticket not found',
        },
      });
      return;
    }

    res.status(200).json({ data: ticket });
  } catch (error) {
    next(error);
  }
};

export default {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
};
