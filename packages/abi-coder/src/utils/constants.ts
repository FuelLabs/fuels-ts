/**
 * Types and Type Regex
 */
export const U8_CODER_TYPE = 'u8';
export const U16_CODER_TYPE = 'u16';
export const U32_CODER_TYPE = 'u32';
export const U64_CODER_TYPE = 'u64';
export const U256_CODER_TYPE = 'u256';
export const RAW_PTR_CODER_TYPE = 'raw untyped ptr';
export const RAW_SLICE_CODER_TYPE = 'raw untyped slice';
export const BOOL_CODER_TYPE = 'bool';
export const B256_CODER_TYPE = 'b256';
export const B512_CODER_TYPE = 'struct std::b512::B512';
export const OPTION_CODER_TYPE = 'enum std::option::Option';
export const VEC_CODER_TYPE = 'struct std::vec::Vec';
export const BYTES_CODER_TYPE = 'struct std::bytes::Bytes';
export const STD_STRING_CODER_TYPE = 'struct std::string::String';
export const STR_SLICE_CODER_TYPE = 'str';
export const VOID_TYPE = '()';

export const optionRegEx: RegExp = /^enum (std::option::)?Option$/m;
export const stringRegEx = /^str\[(?<length>[0-9]+)\]/;
export const arrayRegEx = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
export const structRegEx = /^struct.+/;
export const enumRegEx = /^enum.+$/;
export const tupleRegEx = /^\((?<items>.*)\)$/;
export const genericRegEx = /^generic.+$/;

export const fullNameRegExMatch = /([^\s]+)$/m;

/**
 * Encoding versions
 */
export const ENCODING_V1 = '1';
export type EncodingVersion = typeof ENCODING_V1;

/**
 * Property space and config constants
 */
export const WORD_SIZE = 8;
export const BYTES_32 = 32;
export const UTXO_ID_LEN = BYTES_32 + 2;
export const MAX_INPUTS = 255;
export const ASSET_ID_LEN = BYTES_32;
export const CONTRACT_ID_LEN = BYTES_32;
export const ADDRESS_LEN = BYTES_32;
export const NONCE_LEN = BYTES_32;
export const TX_LEN = WORD_SIZE * 4;
export const TX_POINTER_LEN = WORD_SIZE * 2;
export const MAX_BYTES = 2 ** 32 - 1; // Max u32

export const calculateVmTxMemory = ({ maxInputs }: { maxInputs: number }) =>
  BYTES_32 + // Tx ID
  ASSET_ID_LEN + // Base asset ID
  // Asset ID/Balance coin input pairs
  maxInputs * (ASSET_ID_LEN + WORD_SIZE) +
  WORD_SIZE; // Tx size

// SCRIPT_FIXED_SIZE = 104
export const SCRIPT_FIXED_SIZE =
  WORD_SIZE + // Identifier
  WORD_SIZE + // Gas limit
  WORD_SIZE + // Script size
  WORD_SIZE + // Script data size
  WORD_SIZE + // Policies
  WORD_SIZE + // Inputs size
  WORD_SIZE + // Outputs size
  WORD_SIZE + // Witnesses size
  BYTES_32; // Receipts root

// INPUT_COIN_FIXED_SIZE = 176
export const INPUT_COIN_FIXED_SIZE =
  WORD_SIZE + // Identifier
  TX_LEN + // Utxo Length
  WORD_SIZE + // Output Index
  ADDRESS_LEN + // Owner
  WORD_SIZE + // Amount
  ASSET_ID_LEN + // Asset id
  TX_POINTER_LEN + // TxPointer
  WORD_SIZE + // Witnesses index
  WORD_SIZE + // Predicate size
  WORD_SIZE + // Predicate data size
  WORD_SIZE; // Predicate gas used

// INPUT_MESSAGE_FIXED_SIZE = 168
export const INPUT_MESSAGE_FIXED_SIZE =
  WORD_SIZE + // Identifier
  ADDRESS_LEN + // Sender
  ADDRESS_LEN + // Recipient
  WORD_SIZE + // Amount
  NONCE_LEN + // Nonce
  WORD_SIZE + // witness_index
  WORD_SIZE + // Data size
  WORD_SIZE + // Predicate size
  WORD_SIZE + // Predicate data size
  WORD_SIZE; // Predicate gas used
