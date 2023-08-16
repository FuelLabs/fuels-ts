import { bn } from '@fuel-ts/math';

/** Maximum contract size, in bytes. */
export const CONTRACT_MAX_SIZE = 16 * 1024;

/** Maximum number of witnesses. */
export const MAX_WITNESSES = 16;

/** Maximum gas per transaction. */
export const MAX_GAS_PER_TX = bn(500000000);

/**
 * Gas Price factor this is used to calculate
 * This is used to calculate the gas fee in Native Coins.
 * Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);
 */
export const GAS_PRICE_FACTOR = bn(1000000000);

/** Gas charged per byte of the transaction. */
export const GAS_PER_BYTE = bn(4);

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

// Revert with this value for a failing call to `std::revert::require`.
export const FAILED_REQUIRE_SIGNAL = '0xffffffffffff0000';

// Revert with this value for a failing call to `std::token::transfer_to_address`.
export const FAILED_TRANSFER_TO_ADDRESS_SIGNAL = '0xffffffffffff0001';

// Revert with this value for a failing call to `std::message::send_message`.
export const FAILED_SEND_MESSAGE_SIGNAL = '0xffffffffffff0002';

// Revert with this value for a failing call to `std::assert::assert_eq`.
export const FAILED_ASSERT_EQ_SIGNAL = '0xffffffffffff0003';

// Revert with this value for a failing call to `std::assert::assert`.
export const FAILED_ASSERT_SIGNAL = '0xffffffffffff0004';

export const FAILED_UNKNOWN_SIGNAL = '0x0';
