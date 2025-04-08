import { getAllDecodedLogs, getDecodedLogs } from '@fuel-ts/account';
import type { TransactionResultReceipt, JsonAbisFromAllCalls, DecodedLogs } from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { AbstractContract, CallConfig, InvocationScopeLike } from './types';

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
 * @deprecated Use `getAllResultLogs` instead.
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

/** @hidden */
export const getAllResultLogs = (opts: {
  receipts: TransactionResultReceipt[];
  mainCallConfig: CallConfig | undefined;
  functionScopes: Array<InvocationScopeLike>;
}): DecodedLogs => {
  const { receipts, mainCallConfig, functionScopes } = opts;

  if (!mainCallConfig) {
    return { logs: [], groupedLogs: {} };
  }
  const { main, otherContractsAbis } = getAbisFromAllCalls(functionScopes);
  return getAllDecodedLogs({ receipts, mainAbi: main, externalAbis: otherContractsAbis });
};
