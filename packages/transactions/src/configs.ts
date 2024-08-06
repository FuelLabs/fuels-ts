/** Maximum contract size, in bytes. */
export const CONTRACT_MAX_SIZE = 16 * 1024;

/** Maximum number of witnesses. */
export const MAX_WITNESSES = 16;

/**
 * Gas Price factor this is used to calculate
 * This is used to calculate the gas fee in Native Coins.
 * Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);
 */

/** Maximum length of script, in instructions. */
export const MAX_SCRIPT_LENGTH = 1024 * 1024 * 1024;

/** Maximum length of script data, in bytes. */
export const MAX_SCRIPT_DATA_LENGTH = 1024 * 1024 * 1024;

/** Maximum number of static contracts. */
export const MAX_STATIC_CONTRACTS = 255;

/** Maximum length of predicate, in instructions. */
export const MAX_PREDICATE_LENGTH = 1024 * 1024;

/** Maximum length of predicate data, in bytes. */
export const MAX_PREDICATE_DATA_LENGTH = 1024 * 1024;

// Revert with this value for a failing call to `std::revert::require`.
export const FAILED_REQUIRE_SIGNAL = '0xffffffffffff0000';

// Revert with this value for a failing call to `std::asset::transfer_to_address`.
export const FAILED_TRANSFER_TO_ADDRESS_SIGNAL = '0xffffffffffff0001';

// Revert with this value for a failing call to `std::assert::assert_eq`.
export const FAILED_ASSERT_EQ_SIGNAL = '0xffffffffffff0003';

// Revert with this value for a failing call to `std::assert::assert`.
export const FAILED_ASSERT_SIGNAL = '0xffffffffffff0004';

// Revert with this value for a failing call to `std::assert::assert_ne`.
export const FAILED_ASSERT_NE_SIGNAL = '0xffffffffffff0005';

export const FAILED_UNKNOWN_SIGNAL = '0x0';

export const PANIC_REASONS = [
  'UnknownPanicReason',
  'Revert',
  'OutOfGas',
  'TransactionValidity',
  'MemoryOverflow',
  'ArithmeticOverflow',
  'ContractNotFound',
  'MemoryOwnership',
  'NotEnoughBalance',
  'ExpectedInternalContext',
  'AssetIdNotFound',
  'InputNotFound',
  'OutputNotFound',
  'WitnessNotFound',
  'TransactionMaturity',
  'InvalidMetadataIdentifier',
  'MalformedCallStructure',
  'ReservedRegisterNotWritable',
  'InvalidFlags',
  'InvalidImmediateValue',
  'ExpectedCoinInput',
  'EcalError',
  'MemoryWriteOverlap',
  'ContractNotInInputs',
  'InternalBalanceOverflow',
  'ContractMaxSize',
  'ExpectedUnallocatedStack',
  'MaxStaticContractsReached',
  'TransferAmountCannotBeZero',
  'ExpectedOutputVariable',
  'ExpectedParentInternalContext',
  'PredicateReturnedNonOne',
  'ContractIdAlreadyDeployed',
  'ContractMismatch',
  'MessageDataTooLong',
  'ArithmeticError',
  'ContractInstructionNotAllowed',
  'TransferZeroCoins',
  'InvalidInstruction',
  'MemoryNotExecutable',
  'PolicyIsNotSet',
  'PolicyNotFound',
  'TooManyReceipts',
  'BalanceOverflow',
  'InvalidBlockHeight',
  'TooManySlots',
  'ExpectedNestedCaller',
  'MemoryGrowthOverlap',
  'UninitalizedMemoryAccess',
  'OverridingConsensusParameters',
  'UnknownStateTransactionBytecodeRoot',
  'OverridingStateTransactionBytecode',
  'BytecodeAlreadyUploaded',
  'ThePartIsNotSequentiallyConnected',
  'BlobNotFound',
  'BlobIdAlreadyUploaded',
  'GasCostNotDefined',
];

export const PANIC_DOC_URL = 'https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html';
