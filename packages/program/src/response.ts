import type {
  TransactionResultReceipt,
  TransactionResponse,
  TransactionResult,
  CallResult,
  DecodedLogs,
} from '@fuel-ts/account';
import { getGasUsedFromReceipts } from '@fuel-ts/account';
import type { TransactionType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from './contract-call-script';
import { callResultToInvocationResult } from './script-request';
import type {
  AbstractContract,
  AbstractProgram,
  InvocationScopeLike,
  FunctionResult,
  DryRunResult,
} from './types';
import { getAllResultLogs } from './utils';

/** @hidden */
export const extractInvocationResult = <T>(
  functionScopes: Array<InvocationScopeLike>,
  receipts: TransactionResultReceipt[],
  isMultiCall: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: DecodedLogs<any>['logs'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupedLogs: DecodedLogs<any>['groupedLogs'] = {}
) => {
  const mainCallConfig = functionScopes[0]?.getCallConfig();

  if (functionScopes.length === 1 && mainCallConfig && 'bytes' in mainCallConfig.program) {
    return callResultToInvocationResult<T>({ receipts }, mainCallConfig, logs, groupedLogs);
  }
  const encodedResults = decodeContractCallScriptResult(
    { receipts },
    (mainCallConfig?.program as AbstractContract).id,
    logs,
    groupedLogs
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

  const { logs, groupedLogs } = getAllResultLogs({ receipts, mainCallConfig, functionScopes });
  const value = extractInvocationResult<T>(
    functionScopes,
    receipts,
    isMultiCall,
    logs,
    groupedLogs
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
