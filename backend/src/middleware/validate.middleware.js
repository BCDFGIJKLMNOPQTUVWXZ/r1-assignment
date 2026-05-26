const { errorResponse } = require('../utils/response.utils');

/**
 * Middleware to validate request bodies using Zod schemas
 * @param {import('zod').ZodSchema} schema 
 * @returns {Function} Express middleware
 */
const validateRequest = (schema) => async (req, res, next) => {
  try {
    // Parse and validate the request body
    const validatedData = await schema.parseAsync(req.body);
    req.body = validatedData; // Replace body with sanitized/validated data
    next();
  } catch (error) {
    // Zod throws an error object with an 'errors' array
    if (error.errors) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return errorResponse(res, 400, 'Validation failed', formattedErrors);
    }
    return errorResponse(res, 400, 'Invalid request data');
  }
};

module.exports = validateRequest;
