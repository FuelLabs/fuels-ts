import {
  B256_TYPE,
  U256_TYPE,
  U32_TYPE,
  U64_TYPE,
  B512_TYPE,
  BOOL_TYPE,
  VOID_TYPE,
  U8_TYPE,
  U16_TYPE,
} from '../encoding-constants';
import type { SupportedCodersV1 } from '../encoding-types';

import { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool } from './fixed';

export const v1: SupportedCodersV1 = {
  [U8_TYPE]: u8,
  [U16_TYPE]: u16,
  [U32_TYPE]: u32,
  [U64_TYPE]: u64,
  [U256_TYPE]: u256,
  [BOOL_TYPE]: bool,
  [B256_TYPE]: b256,
  [B512_TYPE]: b512,
  [VOID_TYPE]: voidCoder,
};
