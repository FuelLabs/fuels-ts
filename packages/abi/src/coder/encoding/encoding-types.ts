import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { AbiConcreteType, AbiTypeComponent } from '../../parser';

import type { v1 } from './v1';

export type SupportedCodersV1 = typeof v1;

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
   */
  abstract type: string;

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

export type CoderFactoryParameters = {
  name?: string;
  type: AbiConcreteType | AbiTypeComponent['type'];
};
export type CoderFactory<TCoder extends Coder = Coder> = (
  params: CoderFactoryParameters,
  factory: CoderFactory
) => TCoder;

type CurrentEncoding = typeof v1;

export type Encoding = CurrentEncoding & {
  v1: typeof v1;
  fromVersion: (version: string) => AbiEncoding;
};

export type AbiEncoding = {
  coders: SupportedCoders;

  /**
   * Get a coder for a given type and name
   *
   * @param opts - The options object
   * @returns A coder
   */
  getCoder: (params: CoderFactoryParameters) => Coder;
};
