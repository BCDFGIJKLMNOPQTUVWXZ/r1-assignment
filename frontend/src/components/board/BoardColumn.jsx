import { TicketCard } from '../cards/TicketCard';

export const BoardColumn = ({ title, status, tickets = [], onUpdateStatus }) => {
  return (
    <div className="flex flex-col bg-gray-50/50 rounded-xl h-full">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {tickets.length}
        </span>
      </div>
      
      <div className="p-3 flex-1 overflow-y-auto min-h-[500px] flex flex-col gap-3">
        {tickets.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            No tickets here
          </div>
        ) : (
          tickets.map(ticket => (
            <TicketCard key={ticket._id} ticket={ticket} onUpdateStatus={onUpdateStatus} />
          ))
        )}
      </div>
    </div>
  );
};
