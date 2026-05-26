import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatAge } from '../../utils/formatters';
import { getAvailableActions } from '../../utils/statusActions';

export const TicketCard = ({ ticket, onUpdateStatus }) => {
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdate = async (newStatus) => {
    setUpdatingId(newStatus);
    try {
      await onUpdateStatus(ticket._id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const priorityVariant = {
    urgent: 'danger',
    high: 'orange',
    medium: 'warning',
    low: 'success',
  }[ticket.priority];

  const availableActions = getAvailableActions(ticket.status);

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow
        ${ticket.slaBreached ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{ticket.subject}</h4>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={priorityVariant} className="capitalize">
          {ticket.priority}
        </Badge>
        <span className="text-xs text-gray-500 font-mono">
          {formatAge(ticket.ageMinutes)}
        </span>
        {ticket.slaBreached && (
          <span className="text-xs text-red-600 font-semibold" title="SLA Breached">
            ⚠️ SLA Breached
          </span>
        )}
      </div>

      {availableActions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-gray-100">
          {availableActions.map((action) => (
            <Button 
              key={action.targetStatus}
              variant="secondary" 
              size="sm" 
              className="flex-1 text-xs px-2 py-1"
              loading={updatingId === action.targetStatus}
              disabled={updatingId !== null && updatingId !== action.targetStatus}
              onClick={() => handleUpdate(action.targetStatus)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
