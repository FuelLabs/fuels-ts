import { getDecodedLogs } from '@fuel-ts/account';
import type {
  JsonAbisFromAllCalls,
  TransactionResponse,
  TransactionResult,
  TransactionResultReceipt,
} from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import type { ReceiptScriptResult, TransactionType } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from './contract-call-script';
import { callResultToInvocationResult } from './script-request';
import type { InvocationScopeLike, SubmitResult } from './types';

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

export const extractInvocationResult = <T>(
  functionScopes: Array<InvocationScopeLike>,
  receipts: TransactionResultReceipt[],
  isMultiCall: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: any[]
) => {
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  if (functionScopes.length === 1 && mainCallConfig && 'bytes' in mainCallConfig.program) {
    return callResultToInvocationResult<T>({ receipts }, mainCallConfig, logs);
  }
  const encodedResults = decodeContractCallScriptResult(
    { receipts },
    (mainCallConfig?.program as AbstractContract).id,
    logs
  );

  const decodedResults = encodedResults.map((encodedResult, i) => {
    const { func } = functionScopes[i].getCallConfig();
    return func.decodeOutput(encodedResult)?.[0];
  });

  return (isMultiCall ? decodedResults : decodedResults?.[0]) as T;
};

export const buildSubmitResult = async <T>(
  funcScope: InvocationScopeLike | Array<InvocationScopeLike>,
  transactionResponse: TransactionResponse,
  isMultiCall: boolean,
  program: AbstractProgram
): Promise<SubmitResult<T>> => {
  const functionScopes = Array.isArray(funcScope) ? funcScope : [funcScope];

  const txResult = await transactionResponse.waitForResult();
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  const { main, otherContractsAbis } = getAbisFromAllCalls(functionScopes);

  const receipts = txResult.receipts;
  const logs = mainCallConfig ? getDecodedLogs(receipts, main, otherContractsAbis) : [];

  const value = extractInvocationResult<T>(functionScopes, receipts, isMultiCall, logs);

  const scriptResult = receipts.find((r) => r.type === ReceiptType.ScriptResult) as
    | ReceiptScriptResult
    | undefined;

  const gasUsed = scriptResult?.gasUsed || bn(0);

  const submitResult: SubmitResult<T> = {
    isMultiCall,
    functionScopes,
    value,
    program,
    transactionResult: txResult as TransactionResult<TransactionType.Script>,
    transactionResponse,
    transactionId: transactionResponse.id,
    logs,
    gasUsed,
  };

  return submitResult;
};
