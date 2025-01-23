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
