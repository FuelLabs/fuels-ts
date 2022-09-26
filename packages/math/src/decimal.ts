import { DEFAULT_MIN_PRECISION, DEFAULT_PRECISION } from './constants';
import type { ToFixedConfig } from './types';

export function toFixed(value?: string | number, options?: ToFixedConfig) {
  const { precision = DEFAULT_PRECISION, minPrecision = DEFAULT_MIN_PRECISION } = options || {};

  const [valueUnits = '0', valueDecimals = '0'] = String(value || '0.0').split('.');
  const groupRegex = /(\d)(?=(\d{3})+\b)/g;
  const units = valueUnits.replace(groupRegex, '$1,');
  let decimals = valueDecimals.slice(0, precision);

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
