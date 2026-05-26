import { TICKET_STATUS, TICKET_PRIORITY, STATUS_LABELS, PRIORITY_LABELS } from '../../constants/ticketConstants';

export const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Status:</label>
        <select 
          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1.5 border bg-white"
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="">All</option>
          {Object.values(TICKET_STATUS).map(status => (
            <option key={status} value={status}>{STATUS_LABELS[status]}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Priority:</label>
        <select 
          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1.5 border bg-white"
          value={filters.priority || ''}
          onChange={(e) => onFilterChange({ priority: e.target.value })}
        >
          <option value="">All</option>
          {Object.values(TICKET_PRIORITY).map(priority => (
            <option key={priority} value={priority}>{PRIORITY_LABELS[priority]}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm font-medium text-gray-600 flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={filters.breached === 'true'}
            onChange={(e) => onFilterChange({ breached: e.target.checked ? 'true' : '' })}
          />
          SLA Breached Only
        </label>
      </div>
    </div>
  );
};
