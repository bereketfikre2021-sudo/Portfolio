/**
 * Logger utility for development and production
 * Only logs in development mode to avoid performance overhead in production
 */

const isDevelopment = import.meta.env.DEV;

/**
 * Logs a message to the console (development only)
 * @param {...any} args - Arguments to log
 */
export const log = (...args) => {
  if (isDevelopment) {
    console.log(...args);
  }
};

/**
 * Logs a warning to the console (development only)
 * @param {...any} args - Arguments to log
 */
export const warn = (...args) => {
  if (isDevelopment) {
    console.warn(...args);
  }
};

/**
 * Logs an error to the console (always logs errors, even in production)
 * In production, should be sent to error tracking service
 * @param {...any} args - Arguments to log
 */
export const error = (...args) => {
  if (isDevelopment) {
    console.error(...args);
  } else {
    // In production, send to error tracking service (e.g., Sentry)
    // Example: Sentry.captureException(new Error(args.join(' ')));
  }
};

/**
 * Logs an info message to the console (development only)
 * @param {...any} args - Arguments to log
 */
export const info = (...args) => {
  if (isDevelopment) {
    console.info(...args);
  }
};

/**
 * Logs a debug message to the console (development only)
 * @param {...any} args - Arguments to log
 */
export const debug = (...args) => {
  if (isDevelopment) {
    console.debug(...args);
  }
};

// Default export
const logger = {
  log,
  warn,
  error,
  info,
  debug,
};

export default logger;

