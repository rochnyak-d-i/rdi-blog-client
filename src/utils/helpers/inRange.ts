import { isNumber } from './isNumber';

export type RangeOptions = {
  from?: number,
  to?: number,

  /* include or exclude from value in interval */
  fromInclude?: boolean,

  /* include or exclude from value in interval */
  toInclude?: boolean
};

/**
 * Checking value in range
 *
 * @param {*}       value Checking value
 * @param {RangeOptions} options
 * @param {number}  options.from  Top bound value
 * @param {number}  options.to    Bottom bound value
 * @param {boolean} options.fromInclude
 * @param {boolean} options.toInclude
 *
 * For *Include options values:
 *  - true - include interval [x, y]
 *  - false - exclude interval (x, y)
 *
 * @returns {boolean}
 */
export function inRange(
  value: any,
  {
    from = Number.POSITIVE_INFINITY,
    to = Number.NEGATIVE_INFINITY,
    fromInclude = true,
    toInclude = true
  }: RangeOptions = {}
) {
  return (
    isNumber(value) &&
    (fromInclude ? value >= from : value > from) &&
    (toInclude ? value <= to : value < to)
  );
}
