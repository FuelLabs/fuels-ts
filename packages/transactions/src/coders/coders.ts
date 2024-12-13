import { encoding, WORD_SIZE } from '@fuel-ts/abi';
import type { Coder } from '@fuel-ts/abi';

import { pad } from './pad-coder';

const base = encoding.v1;

export const coders = {
  ...base,
  type: <Type extends number>(type: Type): Coder<Type, Type> => ({
    type: 'TypeCoder',
    encode: () => new Uint8Array([]),
    decode: (_data: Uint8Array, offset: number) => [type, offset],
  }),
  u8: pad(base.u8, 1, WORD_SIZE),
  u16: pad(base.u16, 2, WORD_SIZE),
  u32: pad(base.u32, 4, WORD_SIZE),
};
