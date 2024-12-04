export const BOOL_TYPE = 'bool';
export const U8_TYPE = 'u8';
export const U16_TYPE = 'u16';
export const U32_TYPE = 'u32';
export const U64_TYPE = 'u64';
export const U256_TYPE = 'u256';
export const B256_TYPE = 'b256';
export const B512_TYPE = 'b512';
export const VOID_TYPE = 'void';

export const ENCODING_TYPES = [
  U8_TYPE,
  U16_TYPE,
  U32_TYPE,
  U64_TYPE,
  U256_TYPE,
  BOOL_TYPE,
  B256_TYPE,
  B512_TYPE,
  VOID_TYPE,
] as const;
