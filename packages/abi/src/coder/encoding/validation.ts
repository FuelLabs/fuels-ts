import { FuelError } from '@fuel-ts/errors';
import type { BN, BNInput } from '@fuel-ts/math';

import type { Coder } from '../..';
import { MAX_BYTES } from '../constants';

export const errors = {
  /**
   * Encode errors
   */
  invalidValue: (type: string, value: unknown) =>
    new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid ${type} value - malformed value.`, {
      value,
    }),
  invalidBnValue: (type: string, value: BNInput) =>
    new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid ${type} value - expected a BNInput.`, {
      value,
    }),
  malformedHexValue: (type: string, value: string, expectedLength: number) =>
    new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid ${type} value - malformed hex value.`, {
      value,
      expectedLength,
    }),
  invalidEnumValueCaseKeyMissing: (type: string, value: unknown, validKeys: string[]) =>
    new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - a valid case key must be provided.`,
      {
        value,
        validKeys,
      }
    ),
  invalidEnumValueCaseKey: (type: string, value: unknown, caseKey: string, validKeys: string[]) =>
    new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - invalid case key "${caseKey}".`,
      { value, validKeys }
    ),
  invalidEnumValueMultipleCaseKeys: (type: string, value: unknown, validKeys: string[]) =>
    new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - only one field must be provided.`,
      { value, validKeys }
    ),
  /**
   * Decode errors
   */
  malformedData: (type: string, data: Uint8Array, expectedLength: number) =>
    new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - malformed data.`, {
      data,
      expectedLength,
    }),
  malformedBytes: (type: string, data: Uint8Array) =>
    new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - malformed bytes.`, {
      data,
    }),
  invalidEnumDataCaseKey: (type: string, validKeys: string[]) =>
    new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - invalid case key.`, {
      validKeys,
    }),
  invalidBooleanData: (type: string, data: Uint8Array, decoded: unknown) =>
    new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} value - invalid boolean value.`, {
      data,
      type,
      value: decoded,
    }),
};

export const assertEncode = <TValue, TOutput = Uint8Array>(
  encode: (value: TValue) => TOutput,
  value: TValue,
  thrownError: FuelError
) => {
  try {
    return encode(value);
  } catch (error) {
    throw thrownError;
  }
};

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

export const assertValueIsArray = (value: unknown, type: string) => {
  if (!Array.isArray(value)) {
    throw new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - expected array value.`,
      {
        value,
        type,
      }
    );
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

export function assertValueLengthEqualsExpected(
  value: ArrayLike<unknown>,
  expectedLength: number,
  type: string
) {
  if (value.length !== expectedLength) {
    throw new FuelError(
      FuelError.CODES.ENCODE_ERROR,
      `Invalid ${type} value - unexpected length.`,
      { value, expectedLength }
    );
  }
}

export function assertObjectKeysAllPresent<TCoders extends Record<string, Coder>>(
  value: Record<string, unknown>,
  coders: TCoders,
  type: string
) {
  const actualKeys = Object.keys(value);
  const expectedKeys = Object.keys(coders);

  // Check if there are any missing keys or extra keys
  const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
  if (missingKeys.length > 0) {
    const paths = missingKeys.map((key) => ({ path: key, error: 'Field not present.' }));
    throw new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid ${type} value - malformed object.`, {
      value,
      paths,
    });
  }
}

export const assertDecode = <T>(
  decode: (data: Uint8Array, offset: number) => [T, number],
  data: Uint8Array,
  offset: number,
  thrownError: FuelError
) => {
  try {
    return decode(data, offset);
  } catch (error) {
    throw thrownError;
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
  type: string
) => {
  if (data.length !== expectedLength) {
    throw new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - unexpected length.`, {
      data,
      type,
      expectedLength,
    });
  }
};

export function assertDataLengthLessThanMax(data: Uint8Array, type: string) {
  if (data.length > MAX_BYTES) {
    throw new FuelError(
      FuelError.CODES.DECODE_ERROR,
      `Invalid ${type} data - exceeds maximum bytes.`,
      {
        data,
        length: data.length,
        maxLength: MAX_BYTES,
      }
    );
  }
}

export function assertDataLengthMoreThanExpected(
  data: Uint8Array,
  expectedLength: number,
  type: string
) {
  if (data.length < expectedLength) {
    throw new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - not enough data.`, {
      data,
      expectedLength,
    });
  }
}
