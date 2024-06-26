import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { Option } from './OptionCoder';

type Primitive = string | number | boolean;

/**
 * The type of value you can provide to `Coder.encode`
 */
export type InputValue<T = void> =
  | Primitive
  | BN
  | Option<T>
  | BytesLike
  | InputValue[]
  | { [key: string]: InputValue }
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

export abstract class Coder<TInput = unknown, TDecoded = unknown> {
  readonly name: string;
  readonly type: string;
  readonly encodedLength: number;

  constructor(name: string, type: string, encodedLength: number) {
    this.name = name;
    this.type = type;
    this.encodedLength = encodedLength;
  }

  abstract encode(value: TInput, length?: number): Uint8Array;

  abstract decode(data: Uint8Array, offset: number, length?: number): [TDecoded, number];
}
