import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { AbiConfigurable, AbiFunction } from '../parser';

import type { DecodeFn, EncodeFn } from './encoding';

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

export interface AbiCoderFunction {
  name: AbiFunction['name'];
  arguments: {
    encode: EncodeFn<unknown[]>;
    decode: DecodeFn<unknown[]>;
  };
  output: {
    decode: DecodeFn;
  };
}

export interface AbiCoderConfigurable {
  name: AbiConfigurable['name'];
  encode: EncodeFn;
  decode: DecodeFn;
}
