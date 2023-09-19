export const OPTION_CODER_TYPE = 'enum Option';
export const VEC_CODER_TYPE = 'struct Vec';
export const BYTES_CODER_TYPE = 'struct Bytes';
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
export const ADDRESS_LEN = BYTES_32;
export const NONCE_LEN = BYTES_32;
export const UTXO_LEN = WORD_SIZE * 5;
export const TX_POINTER_LEN = WORD_SIZE * 2;

export const calculateVmTxMemory = ({ maxInputs }: { maxInputs: number }) =>
  BYTES_32 + // Tx ID
  WORD_SIZE + // Tx size
  // Asset ID/Balance coin input pairs
  maxInputs * (ASSET_ID_LEN + WORD_SIZE);

// VM_TX_MEMORY = 10240
export const VM_TX_MEMORY =
  BYTES_32 + // Tx ID
  WORD_SIZE + // Tx size
  // Asset ID/Balance coin input pairs
  MAX_INPUTS * (ASSET_ID_LEN + WORD_SIZE);

// SCRIPT_FIXED_SIZE = 104
export const SCRIPT_FIXED_SIZE =
  WORD_SIZE + // Identifier
  WORD_SIZE + // Gas price
  WORD_SIZE + // Gas limit
  WORD_SIZE + // Maturity
  WORD_SIZE + // Script size
  WORD_SIZE + // Script data size
  WORD_SIZE + // Inputs size
  WORD_SIZE + // Outputs size
  WORD_SIZE + // Witnesses size
  BYTES_32; // Receipts root

// INPUT_COIN_FIXED_SIZE = 176
export const INPUT_COIN_FIXED_SIZE =
  WORD_SIZE + // Identifier
  UTXO_LEN + // Utxo Length
  ADDRESS_LEN + // Owner
  WORD_SIZE + // Amount
  ASSET_ID_LEN + // Asset id
  TX_POINTER_LEN + // TxPointer
  WORD_SIZE + // Witnesses index
  WORD_SIZE + // Maturity
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
