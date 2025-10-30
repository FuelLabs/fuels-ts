import type { JsonAbi, JsonAbiErrorCode } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';
import {
  FAILED_REQUIRE_SIGNAL,
  FAILED_ASSERT_EQ_SIGNAL,
  FAILED_ASSERT_NE_SIGNAL,
  FAILED_ASSERT_SIGNAL,
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  PANIC_REASONS,
  PANIC_DOC_URL,
  SwaySignalErrors,
} from '@fuel-ts/transactions/configs';

import type { JsonAbisFromAllCalls } from '../transaction-request';
import type { DecodedLogs, TransactionResultReceipt } from '../transaction-response';

/**
 * Assembles an error message for a panic status.
 * @param status - The transaction failure status.
 * @returns The error message.
 */
export const assemblePanicError = (
  statusReason: string,
  metadata: Record<string, unknown>
): FuelError => {
  let errorMessage = `The transaction reverted with reason: "${statusReason}".`;

  if (PANIC_REASONS.includes(statusReason)) {
    errorMessage = `${errorMessage}\n\nYou can read more about this error at:\n\n${PANIC_DOC_URL}#variant.${statusReason}`;
  }

  return new FuelError(ErrorCode.SCRIPT_REVERTED, errorMessage, {
    ...metadata,
    reason: statusReason,
  });
};

/** @hidden */
const stringify = (obj: unknown) => JSON.stringify(obj, null, 2);

/**
 * Assembles an error message for Sway signal errors.
 * @param receipts - The transaction result processed receipts.
 * @param logs - The transaction decoded logs.
 * @returns The error message.
 */
export const assembleSignalErrorMessage = (
  reasonHex: string,
  logs: Array<unknown>,
  metadata: Record<string, unknown>
) => {
  let errorMessage = 'The transaction reverted with an unknown reason.';
  let reason = '';
  const lastLog = logs[logs.length - 1];
  const lastButOneLog = logs[logs.length - 2];

  switch (reasonHex) {
    case FAILED_REQUIRE_SIGNAL: {
      reason = 'require';
      errorMessage = `The transaction reverted because a "require" statement has thrown ${
        logs.length ? stringify(lastLog) : 'an error.'
      }.`;
      break;
    }

    case FAILED_ASSERT_EQ_SIGNAL: {
      const suffix =
        logs.length >= 2
          ? ` comparing ${stringify(lastLog)} and ${stringify(lastButOneLog)}.`
          : '.';

      reason = 'assert_eq';
      errorMessage = `The transaction reverted because of an "assert_eq" statement${suffix}`;
      break;
    }

    case FAILED_ASSERT_NE_SIGNAL: {
      const suffix =
        logs.length >= 2
          ? ` comparing ${stringify(lastButOneLog)} and ${stringify(lastLog)}.`
          : '.';

      reason = 'assert_ne';
      errorMessage = `The transaction reverted because of an "assert_ne" statement${suffix}`;
      break;
    }

    case FAILED_ASSERT_SIGNAL:
      reason = 'assert';
      errorMessage = `The transaction reverted because an "assert" statement failed to evaluate to true.`;
      break;

    case FAILED_TRANSFER_TO_ADDRESS_SIGNAL:
      reason = 'MissingOutputVariable';
      errorMessage = `The transaction reverted because it's missing an "OutputVariable".`;
      break;

    default:
      reason = `revert_with_log`;
      errorMessage = `The transaction reverted because a "revert_with_log" statement has thrown ${
        logs.length ? stringify(lastLog) : 'an error.'
      }.`;
      break;
  }

  return new FuelError(ErrorCode.SCRIPT_REVERTED, errorMessage, {
    ...metadata,
    reason,
  });
};

function buildAbiErrorMessage(
  abiError: JsonAbiErrorCode,
  logs: Array<unknown>,
  metadata: Record<string, unknown>,
  reason: string
): FuelError {
  const { pos, msg } = abiError;

  let errorMessage = '';

  // The property `pos` is always present within the error ABI entry.
  const positionMessage = pos ? `\n\nThis error originated at ${JSON.stringify(pos, null, 2)}` : '';

  if (msg) {
    errorMessage = `A sway "panic" expression was invoked with the message: "${msg}".${positionMessage}`;
  } else {
    /**
     * If the "msg" property is undefined, it means that a log was produced with the corresponding
     * "logId" value. Also, at this point we can also be sure that the log was decoded since the
     * error ABI, which was extracted from the JSON ABI, is present.
     */
    const value = logs[logs.length - 1];
    errorMessage = `A sway "panic" expression was invoked with the value: ${JSON.stringify(value)}.${positionMessage}`;
  }

  return new FuelError(ErrorCode.SCRIPT_REVERTED, errorMessage, {
    ...metadata,
    abiError,
    reason,
  });
}

function findErrorInAbis(statusReason: string, abis: JsonAbi[] = []): JsonAbiErrorCode | undefined {
  for (const abi of abis) {
    if (abi.errorCodes?.[statusReason]) {
      return abi.errorCodes[statusReason];
    }
  }
  return undefined;
}

/**
 * Assembles an error message for a revert status.
 * @param receipts - The transaction result processed receipts.
 * @param logs - The transaction decoded logs.
 * @returns The error message.
 */
export const assembleRevertError = (
  _receipts: Array<TransactionResultReceipt>,
  logs: Array<unknown>,
  metadata: Record<string, unknown>,
  statusReason: string,
  abis?: JsonAbisFromAllCalls
): FuelError => {
  const match = statusReason.match(/Revert\((\d+)\)/);
  const reason = match?.[1] ?? statusReason;
  const reasonHex = bn(reason).toHex();

  if (Object.values(SwaySignalErrors).includes(reasonHex)) {
    return assembleSignalErrorMessage(reasonHex, logs, metadata);
  }

  let abiError: JsonAbiErrorCode | undefined;

  if (abis) {
    const abisArr = [abis.main, ...Object.values(abis.otherContractsAbis)];
    abiError = findErrorInAbis(reason, abisArr);
  }

  if (abiError) {
    return buildAbiErrorMessage(abiError, logs, metadata, reason);
  }

  const errorMessage = `The transaction reverted with reason: ${reason}.`;

  return new FuelError(ErrorCode.SCRIPT_REVERTED, errorMessage, {
    ...metadata,
    reason,
  });
};

interface IExtractTxError<T = unknown> extends DecodedLogs<T> {
  receipts: Array<TransactionResultReceipt>;
  statusReason: string;
  logs: T[];
  groupedLogs: Record<string, T[]>;
  abis?: JsonAbisFromAllCalls;
}

/**
 * Extracts the transaction error and returns a FuelError object.
 * @param IExtractTxError - The parameters for extracting the error.
 * @returns The FuelError object.
 */
export const extractTxError = (params: IExtractTxError): FuelError => {
  const { receipts, statusReason, logs, groupedLogs, abis } = params;

  const isPanic = receipts.some(({ type }) => type === ReceiptType.Panic);
  const isRevert = receipts.some(({ type }) => type === ReceiptType.Revert);
  const metadata = {
    logs,
    groupedLogs,
    receipts,
    panic: isPanic,
    revert: isRevert,
    reason: '',
  };

  if (isPanic) {
    return assemblePanicError(statusReason, metadata);
  }
  const decodedLogs = logs.filter((l: unknown) => {
    const log = l as unknown;
    return !(
      log !== null &&
      typeof log === 'object' &&
      '__decoded' in log &&
      (log as { __decoded: boolean }).__decoded === false
    );
  });
  return assembleRevertError(receipts, decodedLogs, metadata, statusReason, abis);
};
