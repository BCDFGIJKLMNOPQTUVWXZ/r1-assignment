import { useState, useEffect, useCallback } from 'react';
import { ticketApi } from '../api/ticketApi';
import toast from 'react-hot-toast';

export const useTickets = (initialFilters = {}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ticketApi.getTickets(filters);
      setTickets(response.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const createTicket = async (ticketData) => {
    try {
      const response = await ticketApi.createTicket(ticketData);
      setTickets((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    // 1. Snapshot previous state
    const previousTickets = [...tickets];
    
    // 2. Optimistic UI update
    setTickets((prev) =>
      prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t))
    );

    try {
      // 3. Fire API request
      const response = await ticketApi.updateTicketStatus(ticketId, newStatus);
      
      // 4. Update with actual server response (to get fresh ageMinutes, resolvedAt, etc)
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? response.data : t))
      );
      toast.success('Ticket status updated');
    } catch (err) {
      // Rollback on failure
      setTickets(previousTickets);
      toast.error(err.message || 'Failed to update ticket');
      throw err;
    }
  };

  return { 
    tickets, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    refetch: fetchTickets,
    createTicket,
    updateTicketStatus
  };
};
