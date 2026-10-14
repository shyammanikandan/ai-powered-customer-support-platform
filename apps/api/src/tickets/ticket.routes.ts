import { Router } from 'express';
import ticketController from './ticket.controller.js';
const router = Router();

router.get('/', ticketController.getTickets);
export default router;
