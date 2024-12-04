import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { CoderType } from './encoding';

export type Primitive = string | number | boolean;

export type Option<T> = T | undefined;

/**
 * The type of value you can provide to `Coder.encode`
 */
export type InputValue<T = void> =
  | Primitive
  | BN
  | Option<T>
  | BytesLike
  | InputValue<T>[]
  | { [key: string]: InputValue<T> }
  | Record<string, Primitive | BytesLike>;

/**
 * The type of value you can get from `Coder.decode`
 */
export type DecodedValue =
  | Primitive
  | DecodedValue[]
  | { [key: string]: DecodedValue }
  | Record<string, Primitive>;

export abstract class Coder<TEncoded = unknown, TDecoded = unknown> {
  /**
   * The type of the coder
   *
   * @see {@link CoderType} for a list of supported types
   */
  abstract type: CoderType;

  /**
   * Encode a value.
   *
   * @param value - The value to encode.
   * @returns The encoded value.
   *
   * @throws FuelError - with a ENCODE_ERROR code
   */
  abstract encode(value: TEncoded): Uint8Array;

  /**
   * Decode a value.
   *
   * @param value - The value to decode.
   * @param offset - The offset to start decoding from.
   * @returns A tuple with the [decoded value, offset of the final decoded]
   *
   * @throws FuelError - with a DECODE_ERROR code
   */
  abstract decode(value: Uint8Array, offset?: number): [TDecoded, number];
}
