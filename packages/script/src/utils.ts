import type { TransactionResult } from '@fuel-ts/providers';

import { PANIC_DOC_URL, PANIC_REASONS } from './constants';

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
