import { FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';

import type { CoderType } from './encoding-types';

/**
 * Asserts that a value is a boolean.
 *
 * @throws {@link FuelError} - with a ENCODE_ERROR code if the value is not a boolean
 */
export const assertBooleanValue = (value: unknown) => {
  if (typeof value !== 'boolean') {
    throw new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.', { value });
  }
};

/**
 * Asserts that a BN value is non-negative.
 *
 * @throws {@link FuelError} - with a ENCODE_ERROR code if the value is less than zero
 */
export const assertBnValueNonNegative = (value: BN, type: string) => {
  if (value.isNeg()) {
    throw new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - value is less than zero.`,
      { value: value.toString(), type }
    );
  }
};

/**
 * Asserts that a BN value's byte length is less than a maximum.
 *
 * @throws {@link FuelError} - with a ENCODE_ERROR code if the value's byte length exceeds the maximum
 */
export const assertBnValueByteLengthLessThan = (value: BN, max: number, type: string) => {
  if (value.byteLength() > max) {
    throw new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - value exceeds maximum.`,
      { value: value.toString(), type }
    );
  }
};

/**
 * Asserts that the encoded data length matches the expected length
 *
 * @throws {@link FuelError} - with a DECODE_ERROR code if the encoded data length does not match the expected length
 */
export const assertEncodedLengthEquals = (
  data: Uint8Array,
  expectedLength: number,
  type: CoderType
) => {
  if (data.length !== expectedLength) {
    throw new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - unexpected length.`, {
      data,
      type,
      expectedLength,
    });
  }
};
