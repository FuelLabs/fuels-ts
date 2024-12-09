export const BOOL_TYPE = 'bool';
export const U8_TYPE = 'u8';
export const U16_TYPE = 'u16';
export const U32_TYPE = 'u32';
export const U64_TYPE = 'u64';
export const U256_TYPE = 'u256';
export const B256_TYPE = 'b256';
export const B512_TYPE = 'b512';
export const VOID_TYPE = 'void';
export const BYTES_TYPE = 'bytes';
export const RAW_SLICE_TYPE = 'raw slice';
export const STD_STRING_TYPE = 'std string';
export const STR_SLICE_TYPE = 'str';
export const VECTOR_TYPE = 'vector';
export const STRING_TYPE = 'string';
export const STRUCT_TYPE = 'struct';
export const ARRAY_TYPE = 'array';
export const ENUM_TYPE = 'enum';
export const OPTION_TYPE = 'option';
export const TUPLE_TYPE = 'tuple';

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
  BYTES_TYPE,
  RAW_SLICE_TYPE,
  STD_STRING_TYPE,
  STR_SLICE_TYPE,
  VECTOR_TYPE,
  STRING_TYPE,
  STRUCT_TYPE,
  ARRAY_TYPE,
  ENUM_TYPE,
  OPTION_TYPE,
  TUPLE_TYPE,
] as const;
