/**
 * Property space and config constants
 */
export const WORD_SIZE = 8;
export const BYTES_32 = 32;
export const UTXO_ID_LEN = BYTES_32 + 2;
export const ASSET_ID_LEN = BYTES_32;
export const CONTRACT_ID_LEN = BYTES_32;
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

// @deprecated unused constant
const MAX_INPUTS = 255;
// @deprecated unused constant
const ADDRESS_LEN = BYTES_32;
// @deprecated unused constant
const NONCE_LEN = BYTES_32;
// @deprecated unused constant
const TX_LEN = WORD_SIZE * 4;
// @deprecated unused constant
const TX_POINTER_LEN = WORD_SIZE * 2;

// INPUT_COIN_FIXED_SIZE = 176
// @deprecated unused constant
const INPUT_COIN_FIXED_SIZE =
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
// @deprecated unused constant
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
