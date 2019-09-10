/**
 * Validating a value as an instance of an Object class
 *
 * @param {*} value Value to be checked
 *
 * @returns {boolean}
 */
export function isObject(value: any) {
  return (
    value !== null &&
    typeof value === 'object' && (
      Object.getPrototypeOf(value) === null || (
        typeof value.constructor === 'function' &&
        value.constructor.name === Object.name
      )
    )
  );
}
