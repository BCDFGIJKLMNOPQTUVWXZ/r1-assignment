const { SLA_TARGETS_MINUTES, TICKET_STATUS } = require('../constants/ticket.constants');

/**
 * Calculates the difference in minutes between two dates
 * @param {Date} end 
 * @param {Date} start 
 * @returns {number}
 */
const diffInMinutes = (end, start) => {
  if (!end || !start) return 0;
  const diffMs = end.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60)));
};

/**
 * Enriches a ticket object with dynamic SLA fields (ageMinutes and slaBreached)
 * @param {Object} ticket - The raw ticket from DB (must have toObject() if Mongoose Document)
 * @returns {Object} Enriched ticket object
 */
const enrichWithSLA = (ticket) => {
  // Convert Mongoose document to plain object if necessary
  const ticketObj = typeof ticket.toObject === 'function' ? ticket.toObject() : { ...ticket };
  
  const endTime = (ticketObj.status === TICKET_STATUS.RESOLVED || ticketObj.status === TICKET_STATUS.CLOSED) && ticketObj.resolvedAt
    ? new Date(ticketObj.resolvedAt)
    : new Date();
    
  const ageMinutes = diffInMinutes(endTime, new Date(ticketObj.createdAt));
  const targetMinutes = SLA_TARGETS_MINUTES[ticketObj.priority];
  const slaBreached = ageMinutes > targetMinutes;
  
  return {
    ...ticketObj,
    ageMinutes,
    slaBreached
  };
};

/**
 * Enriches an array of tickets
 * @param {Array} tickets 
 * @returns {Array}
 */
const enrichTicketsWithSLA = (tickets) => {
  return tickets.map(enrichWithSLA);
};

module.exports = {
  enrichWithSLA,
  enrichTicketsWithSLA,
};
