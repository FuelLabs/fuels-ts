/**
 * Represents the different error codes thrown by the SDK
 */
export enum ErrorCode {
  // abi
  NO_ABIS_FOUND = 'no-abis-found',
  ABI_TYPES_AND_VALUES_MISMATCH = 'abi-types-and-values-mismatch',
  ABI_MAIN_METHOD_MISSING = 'abi-main-method-missing',
  INVALID_COMPONENT = 'invalid-component',
  CONFIGURABLE_NOT_FOUND = 'configurable-not-found',
  TYPE_NOT_FOUND = 'type-not-found',
  LOG_TYPE_NOT_FOUND = 'log-type-not-found',
  TYPE_NOT_SUPPORTED = 'type-not-supported',
  INVALID_DECODE_VALUE = 'invalid-decode-value',
  JSON_ABI_ERROR = 'json-abi-error',
  TYPE_ID_NOT_FOUND = 'type-id-not-found',
  BIN_FILE_NOT_FOUND = 'bin-file-not-found',
  CODER_NOT_FOUND = 'coder-not-found',
  INVALID_DATA = 'invalid-data',
  FUNCTION_NOT_FOUND = 'function-not-found',
  UNSUPPORTED_ENCODING_VERSION = 'unsupported-encoding-version',
  TIMEOUT_EXCEEDED = 'timeout-exceeded',
  CONFIG_FILE_NOT_FOUND = 'config-file-not-found',
  CONFIG_FILE_ALREADY_EXISTS = 'config-file-already-exists',
  WORKSPACE_NOT_DETECTED = 'workspace-not-detected',
  MATCHER_NOT_FOUND = 'matcher-not-found',

  // address
  /**
   * @deprecated
   * Type `Bech32Address` is now deprecated, as is this constant. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
   */
  INVALID_BECH32_ADDRESS = 'invalid-bech32-address',

  INVALID_EVM_ADDRESS = 'invalid-evm-address',
  INVALID_B256_ADDRESS = 'invalid-b256-address',

  // provider
  CHAIN_INFO_CACHE_EMPTY = 'chain-info-cache-empty',
  NODE_INFO_CACHE_EMPTY = 'node-info-cache-empty',
  MISSING_PROVIDER = 'missing-provider',
  INVALID_PROVIDER = 'invalid-provider',
  CONNECTION_REFUSED = 'connection-refused',
  INVALID_URL = 'invalid-url',

  // wallet
  INVALID_PUBLIC_KEY = 'invalid-public-key',
  WALLET_MANAGER_ERROR = 'wallet-manager-error',
  HD_WALLET_ERROR = 'hd-wallet-error',
  MISSING_CONNECTOR = 'missing-connector',

  // errors
  PARSE_FAILED = 'parse-failed',
  ENCODE_ERROR = 'encode-error',
  DECODE_ERROR = 'decode-error',
  ENV_DEPENDENCY_MISSING = 'env-dependency-missing',
  INVALID_TTL = 'invalid-ttl',
  INVALID_INPUT_PARAMETERS = 'invalid-input-parameters',
  NOT_IMPLEMENTED = 'not-implemented',
  NOT_SUPPORTED = 'not-supported',
  CONVERTING_FAILED = 'converting-error',
  ELEMENT_NOT_FOUND = 'element-not-found',
  MISSING_REQUIRED_PARAMETER = 'missing-required-parameter',
  INVALID_REQUEST = 'invalid-request',
  INVALID_TRANSFER_AMOUNT = 'invalid-transfer-amount',
  NOT_ENOUGH_FUNDS = 'not-enough-funds',

  // crypto
  INVALID_CREDENTIALS = 'invalid-credentials',

  /** @deprecated This error code is no longer used */
  HASHER_LOCKED = 'hasher-locked',

  // transaction
  GAS_PRICE_TOO_LOW = 'gas-price-too-low',
  GAS_LIMIT_TOO_LOW = 'gas-limit-too-low',
  MAX_FEE_TOO_LOW = 'max-fee-too-low',
  TRANSACTION_NOT_FOUND = 'transaction-not-found',
  TRANSACTION_FAILED = 'transaction-failed',
  INVALID_CONFIGURABLE_CONSTANTS = 'invalid-configurable-constants',
  INVALID_TRANSACTION_INPUT = 'invalid-transaction-input',
  INVALID_TRANSACTION_OUTPUT = 'invalid-transaction-output',
  INVALID_TRANSACTION_STATUS = 'invalid-transaction-status',
  UNSUPPORTED_TRANSACTION_TYPE = 'unsupported-transaction-type',
  TRANSACTION_ERROR = 'transaction-error',
  INVALID_POLICY_TYPE = 'invalid-policy-type',
  DUPLICATED_POLICY = 'duplicated-policy',
  TRANSACTION_SQUEEZED_OUT = 'transaction-squeezed-out',
  CONTRACT_SIZE_EXCEEDS_LIMIT = 'contract-size-exceeds-limit',
  INVALID_CHUNK_SIZE_MULTIPLIER = 'invalid-chunk-size-multiplier',
  MAX_INPUTS_EXCEEDED = 'max-inputs-exceeded',
  FUNDS_TOO_LOW = 'funds-too-low',
  MAX_OUTPUTS_EXCEEDED = 'max-outputs-exceeded',
  MAX_COINS_REACHED = 'max-coins-reached',
  // receipt
  INVALID_RECEIPT_TYPE = 'invalid-receipt-type',

  // mnemonic
  INVALID_WORD_LIST = 'invalid-word-list',
  INVALID_MNEMONIC = 'invalid-mnemonic',
  INVALID_ENTROPY = 'invalid-entropy',
  INVALID_SEED = 'invalid-seed',
  INVALID_CHECKSUM = 'invalid-checksum',

  // wallet / account
  INVALID_PASSWORD = 'invalid-password',
  ACCOUNT_REQUIRED = 'account-required',
  UNLOCKED_WALLET_REQUIRED = 'unlocked-wallet-required',

  // chain
  ERROR_BUILDING_BLOCK_EXPLORER_URL = 'error-building-block-explorer-url',

  // docs
  VITEPRESS_PLUGIN_ERROR = 'vitepress-plugin-error',

  // script
  SCRIPT_REVERTED = 'script-reverted',
  SCRIPT_RETURN_INVALID_TYPE = 'script-return-invalid-type',

  // graphql
  STREAM_PARSING_ERROR = 'stream-parsing-error',

  // launchNode
  NODE_LAUNCH_FAILED = 'node-launch-failed',

  // Unknown
  UNKNOWN = 'unknown',
}
