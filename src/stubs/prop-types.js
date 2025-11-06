// Stub module for prop-types to prevent default export errors
// This provides a CommonJS-compatible default export
const PropTypes = {
  string: () => null,
  number: () => null,
  bool: () => null,
  object: () => null,
  array: () => null,
  func: () => null,
  node: () => null,
  element: () => null,
  instanceOf: () => null,
  oneOf: () => null,
  oneOfType: () => null,
  arrayOf: () => null,
  objectOf: () => null,
  shape: () => null,
  exact: () => null
};

// Provide both named and default exports
export default PropTypes;
export { PropTypes };

