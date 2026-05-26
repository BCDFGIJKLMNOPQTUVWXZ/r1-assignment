import { BoardColumn } from './BoardColumn';
import { TICKET_STATUS, STATUS_LABELS } from '../../constants/ticketConstants';

export const TicketBoard = ({ tickets = [], onUpdateStatus }) => {
  // Helper to group tickets by status
  const getTicketsByStatus = (status) => {
    return tickets.filter((t) => t.status === status);
  };

  const columns = [
    { id: TICKET_STATUS.OPEN, title: STATUS_LABELS[TICKET_STATUS.OPEN] },
    { id: TICKET_STATUS.IN_PROGRESS, title: STATUS_LABELS[TICKET_STATUS.IN_PROGRESS] },
    { id: TICKET_STATUS.RESOLVED, title: STATUS_LABELS[TICKET_STATUS.RESOLVED] },
    { id: TICKET_STATUS.CLOSED, title: STATUS_LABELS[TICKET_STATUS.CLOSED] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((col) => (
        <BoardColumn 
          key={col.id} 
          title={col.title} 
          status={col.id} 
          tickets={getTicketsByStatus(col.id)} 
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};
