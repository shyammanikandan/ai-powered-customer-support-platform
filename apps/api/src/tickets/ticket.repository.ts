import { pool } from '../db/pool.js';
import type { Ticket } from './ticket.types.js';

interface TicketRow extends Omit<Ticket, 'createdAt'> {
  createdAt: Date;
}

const findAllTickets = async (): Promise<Ticket[]> => {
  const result = await pool.query<TicketRow>(`SELECT
      id,
      subject,
      description,
      status,
      priority,
      created_at AS "createdAt"
    FROM tickets
    ORDER BY created_at ASC`);

  return result.rows.map((row) => {
    return { ...row, createdAt: row.createdAt.toISOString() };
  });
};

export default { findAllTickets };
