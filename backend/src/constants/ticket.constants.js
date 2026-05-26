const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

const SLA_TARGETS_MINUTES = {
  [TICKET_PRIORITY.URGENT]: 60, // 1 hour
  [TICKET_PRIORITY.HIGH]: 4 * 60, // 4 hours
  [TICKET_PRIORITY.MEDIUM]: 24 * 60, // 24 hours
  [TICKET_PRIORITY.LOW]: 72 * 60, // 72 hours
};

module.exports = {
  TICKET_STATUS,
  TICKET_PRIORITY,
  SLA_TARGETS_MINUTES,
};
