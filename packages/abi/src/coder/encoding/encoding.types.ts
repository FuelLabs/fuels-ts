import type { EncodingV1 } from './v1';

export type EncodeFn<TEncode = unknown> = (value: TEncode) => Uint8Array;
export type DecodeFn<TDecode = unknown> = (value: Uint8Array) => TDecode;

export type Coder<TEncode = unknown, TDecode = TEncode> = {
  length: number;
  encode: EncodeFn<TEncode>;
  decode: DecodeFn<TDecode>;
};

export type Encoding = EncodingV1;
