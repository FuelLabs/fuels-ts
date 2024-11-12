import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { AbiConfigurable, AbiFunction, AbiType } from '../parser';

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

  arguments: Coder<unknown[]>;
  output: Coder<unknown>;
}

export interface AbiCoderConfigurable {
  name: AbiConfigurable['name'];
  value: Coder<unknown>;
}
