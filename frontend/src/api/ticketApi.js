import apiClient from './axios';

export const ticketApi = {
  getTickets: (filters = {}) => {
    // Clean up undefined or empty string filters
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.breached) params.append('breached', filters.breached);
    
    return apiClient.get(`/tickets?${params.toString()}`);
  },

  getStats: () => {
    return apiClient.get('/tickets/stats');
  },

  createTicket: (ticketData) => {
    return apiClient.post('/tickets', ticketData);
  },

  updateTicketStatus: (id, status) => {
    return apiClient.patch(`/tickets/${id}`, { status });
  },
};
