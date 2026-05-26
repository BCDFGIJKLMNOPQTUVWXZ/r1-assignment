const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validate.middleware');
const { createTicketSchema, updateTicketStatusSchema } = require('../validators/ticket.validator');
const ticketController = require('../controllers/ticket.controller');

// GET /api/v1/tickets/stats - Must be before /:id to prevent 'stats' being read as an ID
router.get('/stats', ticketController.getTicketStats);

// GET /api/v1/tickets
router.get('/', ticketController.getTickets);

// POST /api/v1/tickets
router.post('/', validateRequest(createTicketSchema), ticketController.createTicket);

// GET /api/v1/tickets/:id
router.get('/:id', ticketController.getTicketById);

// PATCH /api/v1/tickets/:id
router.patch('/:id', validateRequest(updateTicketStatusSchema), ticketController.updateTicketStatus);

// DELETE /api/v1/tickets/:id
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
