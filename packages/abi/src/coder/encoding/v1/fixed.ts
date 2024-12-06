import { FuelError } from '@fuel-ts/errors';
import type { BN, BNInput } from '@fuel-ts/math';
import { toNumber, toBytes, bn, toHex } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import {
  B256_TYPE,
  B512_TYPE,
  BOOL_TYPE,
  U16_TYPE,
  U256_TYPE,
  U32_TYPE,
  U64_TYPE,
  U8_TYPE,
  VOID_TYPE,
} from '../encoding-constants';
import type { Coder, CoderType, FixedLengthCoder } from '../encoding-types';
import {
  assertBnValueByteLengthLessThan,
  assertBnValueNonNegative,
  assertBooleanValue,
  assertEncodedLengthEquals,
} from '../validation';

/**
 * A number coder (u8, u16, u32)
 *
 * @param encodedLength - The number of bytes to encode the value.
 * @param type - The type of the coder.
 * @returns A number based coder.
 */
const createNumberCoder = (
  encodedLength: number,
  type: CoderType
): FixedLengthCoder<number, number> => ({
  type,
  length: encodedLength,
  /**
   * Encode a number value.
   *
   * @param value - The number value to encode.
   * @returns The encoded number value.
   */
  encode: (value: number): Uint8Array => {
    const bnValue = bn(value);
    assertBnValueNonNegative(bnValue, type);
    assertBnValueByteLengthLessThan(bnValue, encodedLength, type);
    return toBytes(bnValue, encodedLength);
  },
  decode: (data: Uint8Array, offset: number = 0): [number, number] => {
    const elementData = data.slice(offset, offset + encodedLength);
    assertEncodedLengthEquals(elementData, encodedLength, type);
    return [toNumber(elementData), offset + encodedLength];
  },
});

/**
 * A big number coder (u64, u256)
 *
 * @param encodedLength - The number of bytes to encode the value.
 * @param type - The type of the coder.
 * @returns A big number based coder.
 */
const createBigNumberCoder = (encodedLength: number, type: CoderType): Coder<BNInput, BN> => ({
  type,
  /**
   * Encode a big number value.
   *
   * @param value - The big number value to encode.
   * @returns The encoded big number value.
   */
  encode: (value: BN | BNInput): Uint8Array => {
    let bnValue;
    try {
      bnValue = bn(value);
    } catch (error) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${type} value - expected a BNInput.`,
        { value }
      );
    }
    assertBnValueNonNegative(bnValue, type);
    assertBnValueByteLengthLessThan(bnValue, encodedLength, type);
    return toBytes(bnValue, encodedLength);
  },
  /**
   * Decode a big number value.
   *
   * @param data - The encoded data to decode.
   * @param offset - The offset to start decoding from.
   * @returns A tuple with the [decoded value, offset of the final decoded]
   */
  decode: (data: Uint8Array, offset: number = 0): [BN, number] => {
    const elementData = data.slice(offset, offset + encodedLength);
    assertEncodedLengthEquals(elementData, encodedLength, type);
    return [bn(elementData), offset + encodedLength];
  },
});

/**
 * A hex coder (b256, b512)
 *
 * @param encodedLength - The number of bytes to encode the value.
 * @param type - The type of the coder.
 * @returns A hex based coder.
 */
const createHexCoder = (encodedLength: number, type: CoderType): Coder<string, string> => ({
  type,
  /**
   * Encode a hex value.
   *
   * @param value - The hex value to encode.
   * @returns The encoded hex value.
   *
   * @throws {@link FuelError} - when a malformed hex value is provided
   * @throws {@link FuelError} - when the encoded value's byte length does not match the expected length
   */
  encode: (value: string): Uint8Array => {
    let encodedValue;
    try {
      encodedValue = arrayify(value);
    } catch (error) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${type} value - malformed hex value.`,
        {
          value,
          expectedLength: encodedLength,
        }
      );
    }

    assertEncodedLengthEquals(encodedValue, encodedLength, type);
    return encodedValue;
  },
  /**
   * Decode a hex value.
   *
   * @param data - The encoded data to decode.
   * @param offset - The offset to start decoding from.
   * @returns A tuple with the [decoded value, offset of the final decoded]
   *
   * @throws {@link FuelError} - when the encoded data length does not match the expected length
   */
  decode: (data: Uint8Array, offset: number = 0): [string, number] => {
    let bytes = data.slice(offset, offset + encodedLength);
    assertEncodedLengthEquals(bytes, encodedLength, type);

    if (bn(bytes).isZero()) {
      bytes = new Uint8Array(encodedLength);
    }
    return [toHex(bytes, encodedLength), offset + encodedLength];
  },
});

export const u8: FixedLengthCoder<number, number> = createNumberCoder(1, U8_TYPE);
export const u16: FixedLengthCoder<number, number> = createNumberCoder(2, U16_TYPE);
export const u32: FixedLengthCoder<number, number> = createNumberCoder(4, U32_TYPE);
export const u64: Coder<BNInput, BN> = createBigNumberCoder(8, U64_TYPE);
export const u256: Coder<BNInput, BN> = createBigNumberCoder(32, U256_TYPE);
export const b256: Coder<string, string> = createHexCoder(32, B256_TYPE);
export const b512: Coder<string, string> = createHexCoder(64, B512_TYPE);
export const voidCoder: Coder<undefined, undefined> = {
  type: VOID_TYPE,
  /**
   * Encode a void value.
   *
   * @returns The encoded void value.
   */
  encode: (): Uint8Array => new Uint8Array(),
  /**
   * Decode a void value.
   *
   * @param data - The encoded data to decode.
   * @param offset - The offset to start decoding from.
   * @returns A tuple with the [decoded value, offset of the final decoded]
   */
  decode: (_data: Uint8Array, offset: number = 0): [undefined, number] => [undefined, offset],
};

export const bool: Coder<boolean, boolean> = {
  type: BOOL_TYPE,
  /**
   * Encode a boolean value.
   *
   * @param value - The boolean value to encode.
   * @returns The encoded boolean value.
   */
  encode: (value: boolean): Uint8Array => {
    assertBooleanValue(value);
    return toBytes(value ? 1 : 0);
  },
  /**
   * Decode a boolean value.
   *
   * @param data - The encoded data to decode.
   * @param offset - The offset to start decoding from.
   * @returns A tuple with the [decoded value, offset of the final decoded]
   */
  decode: (data: Uint8Array, initialOffset: number = 0): [boolean, number] => {
    if (data.length < 1) {
      throw new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid boolean data - not enough data.', {
        data,
        type: BOOL_TYPE,
        expectedLength: 1,
      });
    }

    const [value, offset] = u8.decode(data, initialOffset);
    if (value !== 0 && value !== 1) {
      throw new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid boolean value.', {
        data,
        value,
        type: BOOL_TYPE,
      });
    }
    return [Boolean(value), offset];
  },
};
