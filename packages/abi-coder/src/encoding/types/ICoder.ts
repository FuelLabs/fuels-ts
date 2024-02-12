import type { BN } from '@fuel-ts/math';
import type { BytesLike } from 'ethers';

export type Primitive = string | number | boolean;

export type SwayOption<T> = { None: [] } | { Some: T };
export type Option<T> = T | undefined;

export type InputValue<T = void> =
  | Primitive
  | BN
  | Option<T>
  | BytesLike
  | InputValue[]
  | { [key: string]: InputValue }
  | Record<string, Primitive | BytesLike>;

export type DecodedValue =
  | Primitive
  | BN
  | DecodedValue[]
  | { [key: string]: DecodedValue }
  | Record<string, Primitive>
  | Uint8Array;

export interface ICoder<TInput = unknown, TDecoded = unknown> {
  name: string;
  type: string;
  encodedLength: number;
  encode: (value: TInput, length?: number) => Uint8Array;
  decode: (data: Uint8Array, offset: number, length?: number) => [TDecoded, number];
}
