import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Header } from '../components/layout/Header';
import { StatsStrip } from '../components/stats/StatsStrip';
import { FilterBar } from '../components/filters/FilterBar';
import { TicketBoard } from '../components/board/TicketBoard';
import { CreateTicketModal } from '../components/forms/CreateTicketModal';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useTickets } from '../hooks/useTickets';
import { useStats } from '../hooks/useStats';

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const { 
    tickets, 
    loading: ticketsLoading, 
    error: ticketsError, 
    filters, 
    updateFilters, 
    refetch: refetchTickets,
    createTicket,
    updateTicketStatus
  } = useTickets();
  
  const { 
    stats, 
    loading: statsLoading, 
    refetch: refetchStats 
  } = useStats();

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleRetry = () => {
    refetchTickets();
    refetchStats();
  };

  const handleCreateTicket = async (ticketData) => {
    await createTicket(ticketData);
    refetchStats(); // Refresh stats after creation
  };

  const handleUpdateStatus = async (ticketId, newStatus) => {
    await updateTicketStatus(ticketId, newStatus);
    refetchStats(); // Refresh stats when a ticket moves
  };

  return (
    <DashboardLayout header={<Header onCreateClick={() => setIsCreateModalOpen(true)} />}>
      {/* Top Section: Stats and Filters */}
      <div className="flex flex-col gap-4 mb-2">
        <StatsStrip stats={stats} loading={statsLoading} />
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Main Board Section */}
      <div className="flex-1 min-h-0">
        {ticketsError ? (
          <EmptyState 
            title="Failed to load tickets" 
            description={ticketsError}
            action={<Button onClick={handleRetry}>Retry</Button>}
          />
        ) : ticketsLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner className="w-8 h-8 text-indigo-600" />
          </div>
        ) : (
          <TicketBoard tickets={tickets} onUpdateStatus={handleUpdateStatus} />
        )}
      </div>

      {/* Modals */}
      <CreateTicketModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateTicket}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
