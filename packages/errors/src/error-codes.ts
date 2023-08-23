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

  // coder
  // ...
}
