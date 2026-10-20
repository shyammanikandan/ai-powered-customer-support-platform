import { Router } from 'express';
import validateRequest from '../middleware/validate-request.js';
import { createTicketSchema, updateTicketSchema } from './ticket.schema.js';
import ticketController from './ticket.controller.js';
const router = Router();

router.get('/', ticketController.getTickets);
router.get('/:id', ticketController.getTicketById);
router.post(
  '/',
  validateRequest(createTicketSchema),
  ticketController.createTicket,
);

router.patch(
  '/:id',
  validateRequest(updateTicketSchema),
  ticketController.updateTicket,
);

export default router;
