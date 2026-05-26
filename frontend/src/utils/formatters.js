/**
 * Formats minutes into a readable string (e.g. 12m, 3h 22m, 1d 4h)
 * @param {number} minutes 
 * @returns {string}
 */
export const formatAge = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) return '0m';
  
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`.trim();
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours > 0 ? `${remainingHours}h` : ''}`.trim();
};
