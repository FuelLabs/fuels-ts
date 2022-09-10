export const OPTION_CODER_TYPE = 'enum Option';
export const VEC_CODER_TYPE = 'struct Vec';
export const stringRegEx = /str\[(?<length>[0-9]+)\]/;
export const arrayRegEx = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
export const structRegEx = /^struct (?<name>\w+)$/;
export const enumRegEx = /^enum (?<name>\w+)$/;
export const tupleRegEx = /^\((?<items>.*)\)$/;
export const genericRegEx = /^generic (?<name>\w+)$/;

export const WORD_SIZE = 8;
export const BYTES_32 = 32;
export const MAX_INPUTS = 255;
export const ASSET_ID_LEN = BYTES_32;
export const CONTRACT_ID_LEN = BYTES_32;

// VM_TX_MEMORY = 10240
export const VM_TX_MEMORY =
  BYTES_32 + // Tx ID
  WORD_SIZE + // Tx size
  // Asset ID/Balance coin input pairs
  MAX_INPUTS * (ASSET_ID_LEN + WORD_SIZE);

// TRANSACTION_SCRIPT_FIXED_SIZE = 112
export const TRANSACTION_SCRIPT_FIXED_SIZE =
  WORD_SIZE + // Identifier
  WORD_SIZE + // Gas price
  WORD_SIZE + // Gas limit
  WORD_SIZE + // Byte price
  WORD_SIZE + // Maturity
  WORD_SIZE + // Script size
  // WORD_SIZE + // Script data size
  WORD_SIZE + // Inputs size
  WORD_SIZE + // Outputs size
  WORD_SIZE + // Witnesses size
  BYTES_32; // Receipts root
