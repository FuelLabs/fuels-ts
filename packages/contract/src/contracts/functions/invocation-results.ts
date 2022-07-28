/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { CallResult, TransactionResponse, TransactionResult } from '@fuel-ts/providers';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { contractCallScript } from '../../scripts';
import type { InvocationScopeLike } from '../../types';

function getGasUsage(callResult: CallResult) {
  const scriptResult = callResult.receipts.find((r) => r.type === ReceiptType.ScriptResult) as
    | ReceiptScriptResult
    | undefined;
  return scriptResult?.gasUsed || 0n;
}

class InvocationResult<T = any> {
  readonly functionScopes: Array<InvocationScopeLike>;
  readonly isMultiCall: boolean;
  readonly gasUsed: bigint;
  readonly value: T;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
    this.isMultiCall = isMultiCall;
    this.value = this.getDecodedValue(callResult);
    this.gasUsed = getGasUsage(callResult);
  }

  protected getDecodedValue(callResult: CallResult) {
    const encodedResults = contractCallScript.decodeCallResult(callResult);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { contract, func } = this.functionScopes[i].getCallConfig();
      return contract.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }
}

export class FunctionInvocationResult<T = any> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any>;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any>,
    isMultiCall: boolean
  ) {
    super(funcScopes, transactionResult, isMultiCall);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
  }

  static async build<T>(
    funcScope: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    isMultiCall: boolean
  ) {
    const txResult = await transactionResponse.waitForResult();
    const fnResult = new FunctionInvocationResult<T>(
      funcScope,
      transactionResponse,
      txResult,
      isMultiCall
    );
    return fnResult;
  }
}

export class InvocationCallResult<T = any> extends InvocationResult<T> {
  readonly callResult: CallResult;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    super(funcScopes, callResult, isMultiCall);
    this.callResult = callResult;
  }

  static async build<T>(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    const fnResult = new InvocationCallResult<T>(funcScopes, callResult, isMultiCall);
    return fnResult;
  }
}
