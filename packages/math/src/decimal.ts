import { DEFAULT_MIN_PRECISION, DEFAULT_PRECISION } from './constants';
import type { ToFixedConfig } from './types';

// export function toFixed(value?: string | number, precision: number = DEFAULT_PRECISION) {
export function toFixed(value?: string | number, options?: ToFixedConfig) {
  const { precision = DEFAULT_PRECISION, minPrecision = DEFAULT_MIN_PRECISION } = options || {};

  // todo: minPrecision higher than precision, should override or respect precision?

  const [valueUnits = '0', valueDecimals = '0'] = String(value || '0.0').split('.');
  const groupRegex = new RegExp(`(\\d)(?=(\\d{${precision}})+\\b)`, 'g');
  const units = valueUnits.replace(groupRegex, '$1,');
  let decimals = valueDecimals.slice(0, precision);

  // increase precision if decimal formatted is zero, but has more numbers out of precision
  // 0.000014 and precision 3 will be = 0.00001 instead of 0.000
  // todo: should create a prop for this??
  if (valueUnits === '0') {
    const firstNonZero = valueDecimals.match(/[1-9]/);
    if (firstNonZero && firstNonZero.index && firstNonZero.index + 1 > precision) {
      decimals = valueDecimals.slice(0, firstNonZero.index + 1);
    }
  }

  // strip traling zeros limited by minPrecision
  if (minPrecision < precision) {
    const firstNonZero = decimals.match(/[1-9]/);
    const firstNonZeroIndex = firstNonZero?.index == null ? -1 : firstNonZero.index;
    const keepChars = Math.max(minPrecision, firstNonZeroIndex + 1);
    decimals = decimals.slice(0, keepChars);
  }

  const decimalPortion = decimals ? `.${decimals}` : '';
  return `${units}${decimalPortion}`;
}
