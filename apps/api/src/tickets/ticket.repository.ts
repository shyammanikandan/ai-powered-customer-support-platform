import { pool } from '../db/pool.js';
import type { Ticket } from './ticket.types.js';
import { CreateTicketInput } from './ticket.schema.js';
interface TicketRow extends Omit<Ticket, 'createdAt'> {
  createdAt: Date;
}
// List Tickets
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

// Create a new Ticket

const createTicket = async (
  input: CreateTicketInput & { status: 'open' },
): Promise<Ticket> => {
  const result = await pool.query<TicketRow>(
    `INSERT INTO tickets (id,subject,description,status,priority,created_at)
    VALUES ($1,$2,$3,$4,$5,NOW())
    RETURNING
       id,
       subject,
       description,
       status,
       priority,
       created_at AS "createdAt"`,
    [
      crypto.randomUUID(),
      input.subject,
      input.description,
      input.status,
      input.priority,
    ],
  );

  const row = result.rows[0];

  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
};

const findTicketById = async (id: string): Promise<Ticket | null> => {
  const result = await pool.query<TicketRow>(
    `SELECT
       id,
       subject,
       description,
       status,
       priority,
       created_at AS "createdAt"
     FROM tickets
     WHERE id = $1`,
    [id],
  );
  const row = result.rows[0];

  if (!row) {
    return null;
  }

  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
};
export default { findAllTickets, createTicket, findTicketById };
