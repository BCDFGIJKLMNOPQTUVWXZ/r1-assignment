import { TICKET_STATUS, STATUS_LABELS } from '../constants/ticketConstants';

// Matches the backend transition logic exactly
const ALLOWED_TRANSITIONS = {
  [TICKET_STATUS.OPEN]: [TICKET_STATUS.IN_PROGRESS],
  [TICKET_STATUS.IN_PROGRESS]: [TICKET_STATUS.OPEN, TICKET_STATUS.RESOLVED],
  [TICKET_STATUS.RESOLVED]: [TICKET_STATUS.IN_PROGRESS, TICKET_STATUS.CLOSED],
  [TICKET_STATUS.CLOSED]: [TICKET_STATUS.RESOLVED],
};

/**
 * Returns an array of objects representing allowed actions for a given status
 */
export const getAvailableActions = (currentStatus) => {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  
  return allowed.map(status => ({
    targetStatus: status,
    label: `Move to ${STATUS_LABELS[status]}`
  }));
};
