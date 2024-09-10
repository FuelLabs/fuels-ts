import type { Coder } from '../encoding.types';

import { bool } from './boolean';
import { u16, u32, u8, u64, u256 } from './number';
import { tuple } from './tuple';

export interface EncodingV1 {
  u8: typeof u8;
  u16: typeof u16;
  u32: typeof u32;
  u64: typeof u64;
  u256: typeof u256;
  bool: typeof bool;

  tuple: typeof tuple;
}

export const encoding: EncodingV1 = {
  u8,
  u16,
  u32,
  u64,
  // raw untyped ptr
  u256,
  // raw untyped slice,
  // str,
  // (),
  // b512,
  // b256,

  bool,

  tuple,

  // Notes on matching
  //
  // These are simple matches ("type": coder)
  // u64, // (BigNumberCoder)
  // raw untyped ptr (same as u64)
  // u256, (BigNumberCoder)
  // raw untyped slice, (RawSliceCoder)
  // str, (StrSliceCoder)
  // (), (VoidCoder)
  // b512, (B512Coder)
  // b256, (B256Coder)
  //
  // Equality based ("type": coder)
  // struct std::bytes::Bytes, (ByteCoder)
  // struct std::string::String, (StdStringCoder)
  //
  // Regex based + dynamic length
  // string, (StringCoder)
  //
  // Regex based + dynamic length + components
  // array, (ArrayCoder)
  //
  // Equality based + components + (using the buf)
  // struct std::vec::Vec, (VecCoder)
  //
  // Regex based + components
  // struct, (StructCoder)
  //
  // Equality based + components
  // enum std::option::Option, (OptionCoder)
  //
  // Regex based + components
  // enum, (EnumCoder)
  //
  // Regex based + components
  // tuple,
} as const;
