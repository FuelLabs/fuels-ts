import type { TransactionResult } from '@fuel-ts/providers';

import { getEnv } from './env';

const { PANIC_REASONS, PANIC_DOC_URL } = getEnv();

const getFailureReason = (reason: string): string =>
  PANIC_REASONS.includes(reason) ? reason : 'unknown';

export const getDocs = (
  status: TransactionResult<'failure'>['status']
): { doc: string; reason: string } => {
  if (status?.type === 'failure') {
    const reason = getFailureReason(status.reason);
    return {
      doc: reason !== 'unknown' ? `${PANIC_DOC_URL}#variant.${reason}` : PANIC_DOC_URL,
      reason,
    };
  }
  return { doc: PANIC_DOC_URL, reason: 'unknown' };
};

/**
 * Generic assert function to avoid undesirable errors
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
