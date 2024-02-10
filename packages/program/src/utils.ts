import type { TransactionResult } from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { PANIC_REASONS, PANIC_DOC_URL } from './configs';

/**
 * @hidden
 */
const getFailureReason = (reason: string): string => {
  if (PANIC_REASONS.includes(reason)) {
    return reason;
  }

  return reason === 'Revert(123)' ? 'MismatchedSelector' : 'unknown';
};

/**
 * @hidden
 */
export const getDocs = (
  status: TransactionResult['gqlTransaction']['status']
): { doc: string; reason: string } => {
  if (status?.type === 'FailureStatus') {
    const reason = getFailureReason(status.reason);
    return {
      doc: reason !== 'unknown' ? `${PANIC_DOC_URL}#variant.${reason}` : PANIC_DOC_URL,
      reason,
    };
  }
  return { doc: PANIC_DOC_URL, reason: 'unknown' };
};

/**
 * @hidden
 *
 * Generic assert function to avoid undesirable errors
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new FuelError(ErrorCode.TRANSACTION_ERROR, message);
  }
}
