import { AbiEncoding, WORD_SIZE } from '@fuel-ts/abi';

const base = AbiEncoding.v1;

export const coders = {
  ...base,
  u8: AbiEncoding.utils.pad(base.u8, WORD_SIZE),
  u16: AbiEncoding.utils.pad(base.u16, WORD_SIZE),
  u32: AbiEncoding.utils.pad(base.u32, WORD_SIZE),
  u64: AbiEncoding.utils.pad(base.u64, WORD_SIZE),
};
