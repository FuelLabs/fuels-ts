/**
 * Represents the different error codes thrown by the SDK
 */
export enum ErrorCode {
  // address
  INVALID_BECH32_ADDRESS = 'invalid-bech32-address',

  // provider
  INVALID_URL = 'invalid-url',

  // wallet
  /**
   * The wallet doesn't have enough assets to cover the requirements of the transaction
   */
  INSUFFICIENT_BALANCE = 'insufficient-balance',
  WALLET_MANAGER_ERROR = 'wallet-manager-error',

  // errors
  PARSE_FAILED = 'parse-failed',
  INVALID_CREDENTIALS = 'invalid-credentials',
  ENV_DEPENDENCY_MISSING = 'env-dependency-missing',
  INVALID_TTL = 'invalid-ttl',
  INVALID_INPUT_PARAMETERS = 'invalid-input-parameters',
  NOT_IMPLEMENTED = 'not-implemented',

  // transaction
  GAS_PRICE_TOO_LOW = 'gas-price-too-low',
  TRANSACTION_NOT_FOUND = 'transaction-not-found',
  TRANSACTION_FAILED = 'transaction-failed',
  INVALID_CONFIGURABLE_CONSTANTS = 'invalid-configurable-constants',
  INVALID_TRANSACTION_INPUT = 'invalid-transaction-input',
  INVALID_TRANSACTION_OUTPUT = 'invalid-transaction-output',
  INVALID_TRANSACTION_STATUS = 'invalid-transaction-status',
  INVALID_TRANSACTION_TYPE = 'invalid-transaction-type',

  INVALID_RECEIPT_TYPE = 'invalid-receipt-type',

  // mnemonic
  INVALID_WORD_LIST = 'invalid-word-list',
  INVALID_MNEMONIC = 'invalid-mnemonic',
  INVALID_ENTROPY = 'invalid-entropy',
  INVALID_SEED = 'invalid-seed',
  INVALID_CHECKSUM = 'invalid-checksum',

  // chain
  LATEST_BLOCK_UNAVAILABLE = 'latest-block-unavailable',
  ERROR_BUILDING_BLOCK_EXPLORER_URL = 'error-building-block-explorer-url',

  // coder
  // ...
}
