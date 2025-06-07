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

/** @hidden */
export const extractInvocationResult = <T>(
  functionScopes: Array<InvocationScopeLike>,
  receipts: TransactionResultReceipt[],
  isMultiCall: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: DecodedLogs<any>['logs'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupedLogs: DecodedLogs<any>['groupedLogs'] = {},
  abis?: JsonAbisFromAllCalls
) => {
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  if (functionScopes.length === 1 && mainCallConfig && 'bytes' in mainCallConfig.program) {
    return callResultToInvocationResult<T>({ receipts }, mainCallConfig, logs, groupedLogs, abis);
  }
  const encodedResults = decodeContractCallScriptResult(
    { receipts },
    (mainCallConfig?.program as AbstractContract).id,
    logs,
    groupedLogs,
    abis
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
