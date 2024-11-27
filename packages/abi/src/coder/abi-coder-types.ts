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
  | undefined
  | Primitive
  | DecodedValue[]
  | { [key: string]: DecodedValue }
  | Record<string, Primitive>;

export type TypesOfCoder<TCoder> =
  TCoder extends Coder<infer TInput, infer TDecoded> ? { Input: TInput; Decoded: TDecoded } : never;

export interface Coder<TEncode = unknown, TDecode = TEncode> {
  type: string;
  encode: (value: TEncode) => Uint8Array;
  decode: (value: Uint8Array) => TDecode;
  encodedLength: (data: Uint8Array) => number;
}

export type GetCoderParams = { name?: string; type: AbiType };
export type GetCoderFn = (params: GetCoderParams) => Coder;

export interface AbiCoderFunction {
  name: AbiFunction['name'];
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
}

export interface AbiCoderLog {
  logId: AbiLoggedType['logId'];
  decode: (data: BytesLike) => DecodedValue;
}
