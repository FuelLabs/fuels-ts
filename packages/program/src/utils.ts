import { getDecodedLogs } from '@fuel-ts/account';
import type { TransactionResultReceipt, JsonAbisFromAllCalls } from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract } from '@fuel-ts/interfaces';

import type { CallConfig, InvocationScopeLike } from './types';

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
export function getAbisFromAllCalls(
  functionScopes: Array<InvocationScopeLike>
): JsonAbisFromAllCalls {
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

/**
 * @hidden
 *
 */
export const getResultLogs = (
  receipts: TransactionResultReceipt[],
  mainCallConfig: CallConfig | undefined,
  functionScopes: Array<InvocationScopeLike>
) => {
  if (!mainCallConfig) {
    return [];
  }
  const { main, otherContractsAbis } = getAbisFromAllCalls(functionScopes);
  return getDecodedLogs(receipts, main, otherContractsAbis);
};
