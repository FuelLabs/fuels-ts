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
  WORD_SIZE + // Maturity
  WORD_SIZE + // Script size1
  WORD_SIZE + // Script size2
  WORD_SIZE + // Script data size
  WORD_SIZE + // Inputs size
  WORD_SIZE + // Outputs size
  WORD_SIZE + // Witnesses size
  BYTES_32; // Receipts root

// TRANSACTION_PREDICATE_COIN_FIXED_SIZE = 168
export const TRANSACTION_PREDICATE_COIN_FIXED_SIZE =
  WORD_SIZE + // Identifier
  40 + // Utxo Id Length
  ASSET_ID_LEN + // Owner
  WORD_SIZE + // Amount
  ASSET_ID_LEN + // Asset id
  WORD_SIZE * 2 + // Transaction pointer
  WORD_SIZE + // Witnesses index
  WORD_SIZE + // Maturity
  WORD_SIZE + // Predicate size
  WORD_SIZE; // Predicate data size

// TRANSACTION_PREDICATE_MESSAGE_FIXED_SIZE = 160
export const TRANSACTION_PREDICATE_MESSAGE_FIXED_SIZE =
  WORD_SIZE + // Input type
  WORD_SIZE + // Identifier
  ASSET_ID_LEN + // message_id
  ASSET_ID_LEN + // Sender
  ASSET_ID_LEN + // recipient
  WORD_SIZE + // Amount
  WORD_SIZE + // Nonce
  WORD_SIZE + // Witnesses index
  WORD_SIZE + // Data size
  WORD_SIZE + // Predicate size
  WORD_SIZE; // Predicate data size
