import { DEFAULT_PRECISION, DEFAULT_MIN_PRECISION } from './configs';
import type { ToFixedConfig } from './types';

export function toFixed(value?: string | number, options?: ToFixedConfig) {
  const { precision = DEFAULT_PRECISION, minPrecision = DEFAULT_MIN_PRECISION } = options || {};

  const [valueUnits = '0', valueDecimals = '0'] = String(value || '0.0').split('.');
  const groupRegex = /(\d)(?=(\d{3})+\b)/g;
  const units = valueUnits.replace(groupRegex, '$1,');
  let decimals = valueDecimals.slice(0, precision);

  // strip traling zeros limited by minPrecision
  if (minPrecision < precision) {
    const trimmedDecimal = decimals.match(/.*[1-9]/);
    const lastNonZeroIndex = trimmedDecimal?.[0].length || 0;
    const keepChars = Math.max(minPrecision, lastNonZeroIndex);
    decimals = decimals.slice(0, keepChars);
  }

  const decimalPortion = decimals ? `.${decimals}` : '';
  return `${units}${decimalPortion}`;
}
