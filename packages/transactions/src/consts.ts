/** Maximum contract size, in bytes. */
export const CONTRACT_MAX_SIZE = 16 * 1024;

/** Maximum number of inputs. */
export const MAX_INPUTS = 8;

/** Maximum number of outputs. */
export const MAX_OUTPUTS = 8;

/** Maximum number of witnesses. */
export const MAX_WITNESSES = 16;

/** Maximum gas per transaction. */
export const MAX_GAS_PER_TX = 1000000;

// TODO: set max script length const
/** Maximum length of script, in instructions. */
export const MAX_SCRIPT_LENGTH = 1024 * 1024 * 1024;

// TODO: set max script length const
/** Maximum length of script data, in bytes. */
export const MAX_SCRIPT_DATA_LENGTH = 1024 * 1024 * 1024;

/** Maximum number of static contracts. */
export const MAX_STATIC_CONTRACTS = 255;

// TODO: set max predicate length value
/** Maximum length of predicate, in instructions. */
export const MAX_PREDICATE_LENGTH = 1024 * 1024;

// TODO: set max predicate data length value
/** Maximum length of predicate data, in bytes. */
export const MAX_PREDICATE_DATA_LENGTH = 1024 * 1024;
