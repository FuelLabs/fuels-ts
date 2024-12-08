/* eslint-disable max-classes-per-file */
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { AbiType } from '../../parser';

import type { ENCODING_TYPES } from './encoding-constants';
import type { SupportedCodersV1 } from './v1';

/**
 * A type of coder.
 *
 * @see {@link ENCODING_TYPES} for a list of all supported types
 */
export type CoderType = (typeof ENCODING_TYPES)[number];

/**
 * All the supported coders, across all versions.
 */
export type SupportedCoders = SupportedCodersV1;
export type SupportedCoder = SupportedCoders[keyof SupportedCoders];

/**
 * A primitive type value
 */
export type Primitive = string | number | boolean;

/**
 * An option type value
 */
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

/**
 * Used to infer the encoded and decoded values of a coder.
 */
export type TypesOfCoder<TCoder> =
  TCoder extends Coder<infer TInput, infer TDecoded> ? { Input: TInput; Decoded: TDecoded } : never;

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

export abstract class FixedLengthCoder<TEncoded = unknown, TDecoded = unknown> extends Coder<
  TEncoded,
  TDecoded
> {
  /**
   * The length of the encoded value
   */
  abstract length: number;
}

export type GetCoderParams = { name?: string; type: AbiType };
export type GetCoderFn = (params: GetCoderParams) => Coder;
