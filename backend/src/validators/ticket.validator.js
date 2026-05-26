const { z } = require('zod');
const { TICKET_STATUS, TICKET_PRIORITY } = require('../constants/ticket.constants');

const createTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters long')
    .max(150, 'Subject must be less than 150 characters'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters long'),
  customerEmail: z
    .string()
    .trim()
    .email('Please provide a valid customer email address'),
  priority: z.enum(Object.values(TICKET_PRIORITY), {
    errorMap: () => ({ message: 'Invalid priority level selected' }),
  }),
});

const updateTicketStatusSchema = z.object({
  status: z.enum(Object.values(TICKET_STATUS), {
    errorMap: () => ({ message: 'Invalid ticket status provided' }),
  }),
});

module.exports = {
  createTicketSchema,
  updateTicketStatusSchema,
};
