const mongoose = require('mongoose');
const { TICKET_STATUS, TICKET_PRIORITY } = require('../constants/ticket.constants');

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    priority: {
      type: String,
      enum: {
        values: Object.values(TICKET_PRIORITY),
        message: '{VALUE} is not a valid priority',
      },
      required: [true, 'Priority is required'],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(TICKET_STATUS),
        message: '{VALUE} is not a valid status',
      },
      default: TICKET_STATUS.OPEN,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Indexes for query performance
ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });
ticketSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Ticket', ticketSchema);
