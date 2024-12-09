import { AbiEncoding, WORD_SIZE } from '@fuel-ts/abi';
import type { Coder } from '@fuel-ts/abi';

const base = AbiEncoding.v1;

export const coders = {
  ...base,
  type: <Type extends number>(type: Type): Coder<Type, Type> => ({
    type: 'TypeCoder',
    encode: () => new Uint8Array([]),
    decode: (data: Uint8Array, offset: number) => [type, offset],
  }),
  u8: AbiEncoding.utils.pad(base.u8, WORD_SIZE),
  u16: AbiEncoding.utils.pad(base.u16, WORD_SIZE),
  u32: AbiEncoding.utils.pad(base.u32, WORD_SIZE),
};
