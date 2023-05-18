import { bn } from '@fuel-ts/math';

export const U8_MAX = 2 ** 8 - 1;
export const U16_MAX = 2 ** 16 - 1;
export const U32_MAX = 2 ** 32 - 1;
export const U64_MAX = bn(2).pow(64).sub(1);

export default {
  U8_MAX,
  U16_MAX,
  U32_MAX,
  U64_MAX,
};
