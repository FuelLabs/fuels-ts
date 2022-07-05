/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { CallResult, TransactionResponse, TransactionResult } from '@fuel-ts/providers';

import { contractCallScript } from './scripts';
import type { FunctionInvocationLike } from './types';

class FunctionInvocationBaseResult<T = any> {
  readonly functionScopes: Array<FunctionInvocationLike>;
  readonly isMultiCall: boolean;
  readonly value: T;

  constructor(
    funcScopes: FunctionInvocationLike | Array<FunctionInvocationLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
    this.isMultiCall = isMultiCall;
    this.value = this.getDecodedValue(callResult);
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

export class FunctionInvocationResult<T = any> extends FunctionInvocationBaseResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any>;

  constructor(
    funcScopes: FunctionInvocationLike | Array<FunctionInvocationLike>,
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
    funcScope: FunctionInvocationLike | Array<FunctionInvocationLike>,
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

export class FunctionCallResult<T = any> extends FunctionInvocationBaseResult<T> {
  readonly callResult: CallResult;

  constructor(
    funcScopes: FunctionInvocationLike | Array<FunctionInvocationLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    super(funcScopes, callResult, isMultiCall);
    this.callResult = callResult;
  }

  static async build<T>(
    funcScopes: FunctionInvocationLike | Array<FunctionInvocationLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    const fnResult = new FunctionCallResult<T>(funcScopes, callResult, isMultiCall);
    return fnResult;
  }
}
