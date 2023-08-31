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

  // errors
  PARSE_FAILED = 'parse-failed',
  INVALID_CREDENTIALS = 'invalid-credentials',
  ENV_DEPENDENCY_MISSING = 'env-dependency-missing',

  // transaction
  TRANSACTION_FAILED = 'transaction-failed',
  INVALID_CONFIGURABLE_CONSTANTS = 'invalid-configurable-constants',
  INVALID_TRANSACTION_INPUT = 'invalid-transaction-input',
  INVALID_TRANSACTION_OUTPUT = 'invalid-transaction-output',
  INVALID_TRANSACTION_STATUS = 'invalid-transaction-status',
  INVALID_TRANSACTION_TYPE = 'invalid-transaction-type',

  // coder
  // ...
}
