import { getDecodedLogs, getGasUsedFromReceipts } from '@fuel-ts/account';
import type {
  CallResult,
  JsonAbisFromAllCalls,
  TransactionResponse,
  TransactionResult,
  TransactionResultReceipt,
} from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import type { TransactionType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from './contract-call-script';
import { callResultToInvocationResult } from './script-request';
import type { DryRunResult, InvocationScopeLike, FunctionResult } from './types';

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

/** @hidden */
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

type BuiltFunctionResultParams = {
  funcScope: InvocationScopeLike | Array<InvocationScopeLike>;
  transactionResponse: TransactionResponse;
  isMultiCall: boolean;
  program: AbstractProgram;
};

/** @hidden */
export const buildFunctionResult = async <T>(
  params: BuiltFunctionResultParams
): Promise<FunctionResult<T>> => {
  const { funcScope, isMultiCall, program, transactionResponse } = params;
  const txResult = await transactionResponse.waitForResult();
  const { receipts } = txResult;

  const functionScopes = Array.isArray(funcScope) ? funcScope : [funcScope];
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  const { main, otherContractsAbis } = getAbisFromAllCalls(functionScopes);
  const logs = mainCallConfig ? getDecodedLogs(receipts, main, otherContractsAbis) : [];
  const value = extractInvocationResult<T>(functionScopes, receipts, isMultiCall, logs);
  const gasUsed = getGasUsedFromReceipts(receipts);

  const submitResult: FunctionResult<T> = {
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

type BuiltDryRunResultParams = {
  funcScopes: InvocationScopeLike | Array<InvocationScopeLike>;
  callResult: CallResult;
  isMultiCall: boolean;
};

/** @hidden * */
export const buildDryRunResult = <T>(params: BuiltDryRunResultParams): DryRunResult<T> => {
  const { funcScopes, callResult, isMultiCall } = params;
  const functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
  const { receipts } = callResult;
  const mainCallConfig = functionScopes[0]?.getCallConfig();
  const { main, otherContractsAbis } = getAbisFromAllCalls(functionScopes);
  const logs = mainCallConfig ? getDecodedLogs(receipts, main, otherContractsAbis) : [];
  const value = extractInvocationResult<T>(functionScopes, receipts, isMultiCall, logs);
  const gasUsed = getGasUsedFromReceipts(receipts);

  const submitResult: DryRunResult<T> = {
    functionScopes,
    callResult,
    isMultiCall,
    gasUsed,
    value,
  };

  return submitResult;
};
