import type { JsonAbisFromAllCalls, TransactionResult } from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract } from '@fuel-ts/interfaces';

import { PANIC_REASONS, PANIC_DOC_URL } from './configs';
import type { InvocationScopeLike } from './types';

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

/**
 * @hidden
 *
 * Gets the ABI from an array of InvocationScopeLike.
 */
export function getAbisFromAllCalls(functionScopes: Array<InvocationScopeLike>) {
  return functionScopes.reduce((acc, funcScope, i) => {
    const { program, externalAbis } = funcScope.getCallConfig();

    if (i === 0) {
      acc.main = program.interface.jsonAbi;
      acc.otherContractsAbis = {};
    } else {
      acc.otherContractsAbis[(<AbstractContract>program).id.toB256()] = program.interface.jsonAbi;
    }

    acc.otherContractsAbis = { ...acc.otherContractsAbis, ...externalAbis };

    return acc;
  }, {} as JsonAbisFromAllCalls);
}
