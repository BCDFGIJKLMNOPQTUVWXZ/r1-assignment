const { TICKET_STATUS } = require('../constants/ticket.constants');

const ALLOWED_TRANSITIONS = {
  [TICKET_STATUS.OPEN]: [TICKET_STATUS.IN_PROGRESS],
  [TICKET_STATUS.IN_PROGRESS]: [TICKET_STATUS.OPEN, TICKET_STATUS.RESOLVED],
  [TICKET_STATUS.RESOLVED]: [TICKET_STATUS.IN_PROGRESS, TICKET_STATUS.CLOSED],
  [TICKET_STATUS.CLOSED]: [TICKET_STATUS.RESOLVED],
};

/**
 * Validates if a state transition is allowed
 * @param {string} currentStatus 
 * @param {string} newStatus 
 * @returns {boolean}
 */
const isValidTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) return true; // No actual transition
  
  const allowedNextStates = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowedNextStates) return false;
  
  return allowedNextStates.includes(newStatus);
};

module.exports = {
  ALLOWED_TRANSITIONS,
  isValidTransition,
};
