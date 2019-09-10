/**
 * Validating a value is a number
 *
 * @param {*} value Value to be checked
 *
 * @returns {boolean}
 */
export function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}
