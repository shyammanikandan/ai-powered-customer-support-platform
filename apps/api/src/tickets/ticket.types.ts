type TicketStatus = 'open' | 'in_progress' | 'resolved';

type Priority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
}
export { TicketStatus, Priority, Ticket };
