const ticketService = require('../services/ticket.service');
const { successResponse, errorResponse } = require('../utils/response.utils');
const asyncHandler = require('../utils/async.utils');

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);
  return successResponse(res, 201, ticket, 'Ticket created successfully');
});

const getTickets = asyncHandler(async (req, res) => {
  const { status, priority, breached } = req.query;
  const tickets = await ticketService.getTickets({ status, priority, breached });
  return successResponse(res, 200, tickets, 'Tickets retrieved successfully');
});

const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);
  return successResponse(res, 200, ticket, 'Ticket retrieved successfully');
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await ticketService.updateTicketStatus(req.params.id, status);
    return successResponse(res, 200, ticket, 'Ticket status updated successfully');
  } catch (error) {
    if (error.isTransitionError) {
      return errorResponse(res, 400, error.message);
    }
    throw error; // Let global error handler catch other errors (like ObjectId format)
  }
});

const deleteTicket = asyncHandler(async (req, res) => {
  await ticketService.deleteTicket(req.params.id);
  return successResponse(res, 200, null, 'Ticket deleted successfully');
});

const getTicketStats = asyncHandler(async (req, res) => {
  const stats = await ticketService.getTicketStats();
  return successResponse(res, 200, stats, 'Ticket stats retrieved successfully');
});

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
  getTicketStats,
};
