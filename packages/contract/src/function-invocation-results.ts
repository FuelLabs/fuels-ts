/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { CallResult, TransactionResponse, TransactionResult } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './function-invocation-scope';
import { contractCallScript } from './scripts';

class FunctionInvocationBaseResult<T> {
  readonly functionScopes: Array<FunctionInvocationScope>;
  readonly isMultiCall: boolean;
  readonly value: T;

  constructor(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    callResult: CallResult
  ) {
    this.isMultiCall = Array.isArray(funcScopes);
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
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
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any>
  ) {
    super(funcScopes, transactionResult);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
  }

  static async build<T = any>(
    funcScope: FunctionInvocationScope | Array<FunctionInvocationScope>,
    transactionResponse: TransactionResponse
  ) {
    const txResult = await transactionResponse.waitForResult();
    const fnResult = new FunctionInvocationResult<T>(funcScope, transactionResponse, txResult);
    return fnResult;
  }
}

export class FunctionCallResult<T = any> extends FunctionInvocationBaseResult<T> {
  readonly callResult: CallResult;

  constructor(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    callResult: CallResult
  ) {
    super(funcScopes, callResult);
    this.callResult = callResult;
  }

  static async build<T = any>(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    callResult: CallResult
  ) {
    const fnResult = new FunctionCallResult<T>(funcScopes, callResult);
    return fnResult;
  }
}
