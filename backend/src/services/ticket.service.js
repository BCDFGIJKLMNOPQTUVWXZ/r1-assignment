const Ticket = require('../models/Ticket.model');
const { isValidTransition } = require('../utils/transition.utils');
const { enrichWithSLA, enrichTicketsWithSLA } = require('../utils/sla.utils');
const { TICKET_STATUS } = require('../constants/ticket.constants');

/**
 * Service to handle ticket business logic
 */
class TicketService {
  async createTicket(ticketData) {
    const ticket = await Ticket.create(ticketData);
    return enrichWithSLA(ticket);
  }

  async getTickets(filters = {}) {
    const { status, priority, breached } = filters;
    
    // 1. Build MongoDB query
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Fetch tickets from DB
    // Sort by createdAt descending so newest tickets appear first
    const tickets = await Ticket.find(query).sort({ createdAt: -1 });

    // 2. Enrich with SLA metrics
    const enrichedTickets = enrichTicketsWithSLA(tickets);

    // 3. Apply memory filter for dynamically calculated 'breached' property
    if (breached !== undefined) {
      const isBreached = breached === 'true' || breached === true;
      return enrichedTickets.filter((t) => t.slaBreached === isBreached);
    }

    return enrichedTickets;
  }

  async getTicketById(id) {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      const error = new Error('Ticket not found');
      error.name = 'CastError'; // Handled by global error middleware as 404
      error.kind = 'ObjectId';
      throw error;
    }
    return enrichWithSLA(ticket);
  }

  async updateTicketStatus(id, newStatus) {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      const error = new Error('Ticket not found');
      error.name = 'CastError';
      error.kind = 'ObjectId';
      throw error;
    }

    const currentStatus = ticket.status;

    // Validate Transition
    if (!isValidTransition(currentStatus, newStatus)) {
      const error = new Error(`Cannot move ticket directly from ${currentStatus} to ${newStatus}`);
      error.isTransitionError = true;
      throw error;
    }

    // Apply status and handle resolvedAt lifecycle
    ticket.status = newStatus;

    if (newStatus === TICKET_STATUS.RESOLVED) {
      ticket.resolvedAt = new Date();
    } else if (currentStatus === TICKET_STATUS.RESOLVED && newStatus !== TICKET_STATUS.CLOSED) {
      // Moving backward from resolved, clear the timestamp
      ticket.resolvedAt = null;
    }

    await ticket.save();
    return enrichWithSLA(ticket);
  }

  async deleteTicket(id) {
    const result = await Ticket.findByIdAndDelete(id);
    if (!result) {
      const error = new Error('Ticket not found');
      error.name = 'CastError';
      error.kind = 'ObjectId';
      throw error;
    }
    return true;
  }

  async getTicketStats() {
    // We can use a simple grouping in JS or simple queries since we aren't using complex aggregations
    const allTickets = await Ticket.find({});
    
    const stats = {
      byStatus: {
        [TICKET_STATUS.OPEN]: 0,
        [TICKET_STATUS.IN_PROGRESS]: 0,
        [TICKET_STATUS.RESOLVED]: 0,
        [TICKET_STATUS.CLOSED]: 0,
      },
      byPriority: {},
      breachedUnresolved: 0
    };

    const enrichedTickets = enrichTicketsWithSLA(allTickets);

    enrichedTickets.forEach(ticket => {
      // Status counts
      stats.byStatus[ticket.status] = (stats.byStatus[ticket.status] || 0) + 1;
      
      // Priority counts
      stats.byPriority[ticket.priority] = (stats.byPriority[ticket.priority] || 0) + 1;

      // Breached unresolved
      if (ticket.slaBreached && ticket.status !== TICKET_STATUS.RESOLVED && ticket.status !== TICKET_STATUS.CLOSED) {
        stats.breachedUnresolved += 1;
      }
    });

    return stats;
  }
}

module.exports = new TicketService();
