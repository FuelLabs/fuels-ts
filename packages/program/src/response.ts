import { getGasUsedFromReceipts } from '@fuel-ts/account';
import type {
  TransactionResultReceipt,
  TransactionResponse,
  TransactionResult,
  CallResult,
  DecodedLogs,
  JsonAbisFromAllCalls,
} from '@fuel-ts/account';
import type { BN } from '@fuel-ts/math';
import type { TransactionType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from './contract-call-script';
import { callResultToInvocationResult } from './script-request';
import type {
  AbstractContract,
  AbstractProgram,
  InvocationScopeLike,
  FunctionResult,
  DryRunResult,
  PreConfirmationFunctionResult,
} from './types';
import { getAbisFromAllCalls, getAllResultLogs } from './utils';

export type ExtractInvocationResultParams = {
  functionScopes: Array<InvocationScopeLike>;
  receipts: TransactionResultReceipt[];
  isMultiCall: boolean;
  logs?: DecodedLogs<unknown>['logs'];
  groupedLogs?: DecodedLogs<unknown>['groupedLogs'];
  abis?: JsonAbisFromAllCalls;
};

/**
 * Extracts the invocation result from an invocation call.
 *
 * @template T - The type of the result to be extracted.
 * @param functionScopes - An array of invocation scopes.
 * @param receipts - The transaction result receipts.
 * @param isMultiCall - A boolean indicating if the call is a multi-call.
 * @param logs - Optional logs associated with the transaction.
 * @param groupedLogs - Optional grouped logs associated with the transaction.
 * @param abis - Optional ABIs associated with the transaction.
 * @returns The extracted invocation result of type T.
 *
 * @deprecated Use the object-based approach for parameters instead.
 */
export function extractInvocationResult<T>(
  functionScopes: Array<InvocationScopeLike>,
  receipts: TransactionResultReceipt[],
  isMultiCall: boolean,
  logs?: DecodedLogs<unknown>['logs'],
  groupedLogs?: DecodedLogs<unknown>['groupedLogs'],
  abis?: JsonAbisFromAllCalls
): T;

/**
 * Extracts the invocation result from a invocation call.
 *
 * @template T - The type of the result to be extracted.
 * @param params - Object of type `ExtractInvocationResultParams` containing extraction parameters
 */
export function extractInvocationResult<T>(params: ExtractInvocationResultParams): T;

export function extractInvocationResult<T>(
  paramsOrFunctionScopes: ExtractInvocationResultParams | Array<InvocationScopeLike>,
  _receipts?: TransactionResultReceipt[],
  _isMultiCall?: boolean,
  _logs?: DecodedLogs<unknown>['logs'],
  _groupedLogs?: DecodedLogs<unknown>['groupedLogs'],
  _abis?: JsonAbisFromAllCalls
): T {
  let functionScopes: Array<InvocationScopeLike>;
  let receipts: TransactionResultReceipt[];
  let isMultiCall: boolean;
  let logs: DecodedLogs<unknown>['logs'];
  let groupedLogs: DecodedLogs<unknown>['groupedLogs'];
  let abis: JsonAbisFromAllCalls | undefined;

  if (typeof paramsOrFunctionScopes === 'object' && !Array.isArray(paramsOrFunctionScopes)) {
    functionScopes = paramsOrFunctionScopes.functionScopes;
    receipts = paramsOrFunctionScopes.receipts;
    isMultiCall = paramsOrFunctionScopes.isMultiCall;
    logs = paramsOrFunctionScopes.logs ?? [];
    groupedLogs = paramsOrFunctionScopes.groupedLogs ?? {};
    abis = paramsOrFunctionScopes.abis;
  } else {
    functionScopes = paramsOrFunctionScopes;
    receipts = _receipts as TransactionResultReceipt[];
    isMultiCall = _isMultiCall as boolean;
    logs = _logs ?? [];
    groupedLogs = _groupedLogs ?? {};
    abis = _abis;
  }

  const mainCallConfig = functionScopes[0]?.getCallConfig();

  if (functionScopes.length === 1 && mainCallConfig && 'bytes' in mainCallConfig.program) {
    return callResultToInvocationResult<T>({
      callResult: { receipts },
      call: mainCallConfig,
      logs,
      groupedLogs,
      abis,
    });
  }
  const encodedResults = decodeContractCallScriptResult({
    callResult: { receipts },
    contractId: (mainCallConfig?.program as AbstractContract).id,
    logs,
    groupedLogs,
    abis,
  });

  const decodedResults = encodedResults.map((encodedResult, i) => {
    const { func } = functionScopes[i].getCallConfig();
    return func.decodeOutput(encodedResult)?.[0];
  });

  return (isMultiCall ? decodedResults : decodedResults?.[0]) as T;
}

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
  const abis = { main, otherContractsAbis };

  const { logs, groupedLogs } = getAllResultLogs({ receipts, mainCallConfig, functionScopes });
  const value = extractInvocationResult<T>(
    functionScopes,
    receipts,
    isMultiCall,
    logs,
    groupedLogs,
    abis
  );
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
    groupedLogs,
    gasUsed,
  };

  return submitResult;
};

/** @hidden */
export const buildPreConfirmationFunctionResult = async <T>(
  params: BuiltFunctionResultParams
): Promise<PreConfirmationFunctionResult<T>> => {
  const { funcScope, isMultiCall, program, transactionResponse } = params;

  const transactionResult = await transactionResponse.waitForPreConfirmation();

  const { receipts } = transactionResult;

  const functionScopes = Array.isArray(funcScope) ? funcScope : [funcScope];
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  let logs: DecodedLogs<unknown>['logs'] | undefined;
  let groupedLogs: DecodedLogs<unknown>['groupedLogs'] | undefined;
  let gasUsed: BN | undefined;
  let value: T | undefined;

  if (receipts) {
    ({ logs, groupedLogs } = getAllResultLogs({ receipts, mainCallConfig, functionScopes }));
    value = extractInvocationResult<T>(functionScopes, receipts, isMultiCall, logs, groupedLogs);
    gasUsed = getGasUsedFromReceipts(receipts);
  }

  const submitResult: PreConfirmationFunctionResult<T> = {
    isMultiCall,
    functionScopes,
    program,
    transactionResult,
    transactionResponse,
    transactionId: transactionResponse.id,
    logs,
    groupedLogs,
    gasUsed,
    value,
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
  const { receipts } = callResult;
  const functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  const { logs, groupedLogs } = getAllResultLogs({ receipts, mainCallConfig, functionScopes });
  const value = extractInvocationResult<T>(
    functionScopes,
    receipts,
    isMultiCall,
    logs,
    groupedLogs
  );
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
