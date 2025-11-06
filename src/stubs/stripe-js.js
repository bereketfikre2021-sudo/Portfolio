// Stub module for @stripe/stripe-js to prevent errors
// This module is not used in the project, but some dependencies may try to import it
export const loadStripe = () => Promise.resolve(null);
export default {
  loadStripe: () => Promise.resolve(null)
};

