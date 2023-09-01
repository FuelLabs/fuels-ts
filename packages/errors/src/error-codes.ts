/**
 * Represents the different error codes thrown by the SDK
 */
export enum ErrorCode {
  // address
  INVALID_BECH32_ADDRESS = 'invalid-bech32-address',

  // provider
  INVALID_URL = 'invalid-url',

  // wallet
  INSUFFICIENT_BALANCE = 'insufficient-balance',
  WALLET_MANAGER_ERROR = 'wallet-manager-error',
  HD_WALLET_ERROR = 'hd-wallet-error',

  // errors
  PARSE_FAILED = 'parse-failed',
  INVALID_CREDENTIALS = 'invalid-credentials',
  ENV_DEPENDENCY_MISSING = 'env-dependency-missing',
  INVALID_TTL = 'invalid-ttl',
  INVALID_INPUT_PARAMETERS = 'invalid-input-parameters',
  NOT_IMPLEMENTED = 'not-implemented',
  NOT_SUPPORTED = 'not-supported',
  CONVERTING_FAILED = 'converting-error',

  // transaction
  GAS_PRICE_TOO_LOW = 'gas-price-too-low',
  TRANSACTION_NOT_FOUND = 'transaction-not-found',
  TRANSACTION_FAILED = 'transaction-failed',
  INVALID_CONFIGURABLE_CONSTANTS = 'invalid-configurable-constants',
  INVALID_TRANSACTION_INPUT = 'invalid-transaction-input',
  INVALID_TRANSACTION_OUTPUT = 'invalid-transaction-output',
  INVALID_TRANSACTION_STATUS = 'invalid-transaction-status',
  INVALID_TRANSACTION_TYPE = 'invalid-transaction-type',
  TRANSACTION_ERROR = 'transaction-error',

  // receipt
  INVALID_RECEIPT_TYPE = 'invalid-receipt-type',

  // mnemonic
  INVALID_WORD_LIST = 'invalid-word-list',
  INVALID_MNEMONIC = 'invalid-mnemonic',
  INVALID_ENTROPY = 'invalid-entropy',
  INVALID_SEED = 'invalid-seed',
  INVALID_CHECKSUM = 'invalid-checksum',

  // wallet
  INVALID_PASSWORD = 'invalid-password',

  // chain
  LATEST_BLOCK_UNAVAILABLE = 'latest-block-unavailable',
  ERROR_BUILDING_BLOCK_EXPLORER_URL = 'error-building-block-explorer-url',

  // coder

  // environment
  UNSUPPORTED_PLATFORM = 'unsupported-platform',
  UNSUPPORTED_ARCHITECTURE = 'unsupported-architecture',
}
