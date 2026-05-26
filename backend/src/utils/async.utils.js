/**
 * Wrapper for async route handlers to eliminate try-catch blocks
 * @param {Function} fn - Async express middleware/controller
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
