import { bn } from '@fuel-ts/math';

export const getTransactionsEnv = () => ({
  /** Maximum contract size, in bytes. */
  CONTRACT_MAX_SIZE: 16 * 1024,

  /** Maximum number of witnesses. */
  MAX_WITNESSES: 16,

  /** Maximum gas per transaction. */
  MAX_GAS_PER_TX: bn(100000000),

  /**
   * Gas Price factor this is used to calculate
   * This is used to calculate the gas fee in Native Coins.
   * Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);
   */
  GAS_PRICE_FACTOR: bn(1000000),

  /** Gas charged per byte of the transaction. */
  GAS_PER_BYTE: bn(4),

  // TODO: set max script length const
  /** Maximum length of script, in instructions. */
  MAX_SCRIPT_LENGTH: 1024 * 1024 * 1024,

  // TODO: set max script length const
  /** Maximum length of script data, in bytes. */
  MAX_SCRIPT_DATA_LENGTH: 1024 * 1024 * 1024,

  /** Maximum number of static contracts. */
  MAX_STATIC_CONTRACTS: 255,

  // TODO: set max predicate length value
  /** Maximum length of predicate, in instructions. */
  MAX_PREDICATE_LENGTH: 1024 * 1024,

  // TODO: set max predicate data length value
  /** Maximum length of predicate data, in bytes. */
  MAX_PREDICATE_DATA_LENGTH: 1024 * 1024,

  FAILED_TRANSFER_TO_ADDRESS_SIGNAL: '0xffffffffffff0001',
});
