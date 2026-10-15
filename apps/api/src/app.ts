import express from 'express';
import ticketRoutes from './tickets/ticket.routes.js';
import { errorHandler } from './middleware/error-handler.js';
const app = express();

app.use(express.json());
app.use('/api/v1/tickets', ticketRoutes);
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use(errorHandler);
export default app;
