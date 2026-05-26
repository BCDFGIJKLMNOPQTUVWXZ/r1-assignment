import { Spinner } from '../ui/Spinner';

export const StatsStrip = ({ stats, loading }) => {
  if (loading || !stats) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[80px]">
        <Spinner className="text-indigo-600" />
      </div>
    );
  }

  const statItems = [
    { label: 'Open', value: stats.byStatus?.open || 0, color: 'text-gray-700' },
    { label: 'In Progress', value: stats.byStatus?.in_progress || 0, color: 'text-indigo-600' },
    { label: 'Breached (Unresolved)', value: stats.breachedUnresolved || 0, color: 'text-red-600 font-bold' },
    { label: 'Urgent', value: stats.byPriority?.urgent || 0, color: 'text-orange-600' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 items-center">
      {statItems.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</span>
          <span className={`text-2xl font-semibold mt-1 ${item.color}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
