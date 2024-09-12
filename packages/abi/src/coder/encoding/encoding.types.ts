import type { AbiType } from '../../parser';

import type { EncodingV1 } from './v1';

export type EncodeFn<TEncode = unknown> = (value: TEncode) => Uint8Array;
export type DecodeFn<TDecode = unknown> = (value: Uint8Array) => TDecode;

const makeLengthAwareCoder = (coder: Coder): Coder => ({
  encodedLength: 1,
  encode: (value: unknown) => coder.encode(value),
  decode: (value: Uint8Array) => coder.decode(value),
});

export type CoderFactory<TEncode = unknown, TDecode = TEncode> = (
  opts: { name?: string; type: AbiType },
  make: CoderFactory
) => Coder<TEncode, TDecode>;

export type Coder<TEncode = unknown, TDecode = TEncode> = {
  encodedLength: number;
  encode: EncodeFn<TEncode>;
  decode: DecodeFn<TDecode>;
};

class LengthAwareCoder implements Coder<number> {
  public constructor(private coder: Coder<number>) {}
  encode: EncodeFn<number> = (value: number) => this.coder.encode(value);
  decode: DecodeFn<number> = (value: Uint8Array) => this.coder.decode(value);

  public get encodedLength(): number {
    return 1;
  }
}

export type Encoding = EncodingV1;
