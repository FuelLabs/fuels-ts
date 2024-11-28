import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN, BNInput } from '@fuel-ts/math';

import type { AbiConfigurable, AbiFunction, AbiLoggedType, AbiType } from '../parser';

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

export type TypesOfCoder<TCoder> =
  TCoder extends Coder<infer TInput, infer TDecoded> ? { Input: TInput; Decoded: TDecoded } : never;

export interface Coder<TEncoded = unknown, TDecoded = unknown> {
  type: string;
  encode: (value: TEncoded) => Uint8Array;
  decode: (value: Uint8Array) => TDecoded;
  encodedLength: (data: Uint8Array) => number;
}

export abstract class AbstractCoder<TEncoded = unknown, TDecoded = unknown>
  implements Coder<TEncoded, TDecoded>
{
  abstract readonly type: string;
  abstract encodedLength: (data: Uint8Array) => number;
  abstract encode(value: TEncoded): Uint8Array;
  abstract decode(data: Uint8Array): TDecoded;
}

export type GetCoderParams = { name?: string; type: AbiType };
export type GetCoderFn = (params: GetCoderParams) => Coder;

export interface AbiCoderFunction {
  name: AbiFunction['name'];
  inputs: AbiFunction['inputs'];
  signature: string;
  selector: string;
  selectorBytes: Uint8Array;
  attributes: AbiFunction['attributes'];

  // Methods
  isReadOnly: () => boolean;
  encodeArguments: (values: InputValue[]) => Uint8Array;
  decodeArguments: (data: BytesLike) => DecodedValue[];
  encodeOutput: (value: InputValue) => Uint8Array;
  decodeOutput: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderConfigurable {
  name: AbiConfigurable['name'];
  offset: AbiConfigurable['offset'];
  encode: (values: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderLog {
  logId: AbiLoggedType['logId'];
  encode: (values: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}

export interface AbiCoderType {
  encode: (value: InputValue) => Uint8Array;
  decode: (data: BytesLike) => DecodedValue;
}
