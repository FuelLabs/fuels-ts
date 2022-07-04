/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { CallResult, TransactionResponse, TransactionResult } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './function-invocation-scope';
import { contractCallScript } from './scripts';

export class FunctionInvocationResult<T = any> {
  functionScopes: Array<FunctionInvocationScope>;
  transactionResponse: TransactionResponse;
  transactionResult: TransactionResult<any>;
  isMultiCall: boolean;

  constructor(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any>
  ) {
    this.isMultiCall = Array.isArray(funcScopes);
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
  }

  static async build<T = any>(
    funcScope: FunctionInvocationScope | Array<FunctionInvocationScope>,
    transactionResponse: TransactionResponse
  ) {
    const txResult = await transactionResponse.waitForResult();
    const fnResult = new FunctionInvocationResult<T>(funcScope, transactionResponse, txResult);
    return fnResult;
  }

  get value(): T {
    const encodedResults = contractCallScript.decodeCallResult(this.transactionResult);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { contract, func } = this.functionScopes[i].getCallConfig();
      return contract.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }
}

export class FunctionCallResult<T = any> {
  functionScopes: Array<FunctionInvocationScope>;
  callResult: CallResult;
  isMultiCall: boolean;
  readonly value: T;

  constructor(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    callResult: CallResult
  ) {
    this.isMultiCall = Array.isArray(funcScopes);
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
    this.callResult = callResult;
    this.value = this.getDecodedValue();
  }

  private getDecodedValue() {
    const encodedResults = contractCallScript.decodeCallResult(this.callResult);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { contract, func } = this.functionScopes[i].getCallConfig();
      return contract.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }

  static async build<T = any>(
    funcScopes: FunctionInvocationScope | Array<FunctionInvocationScope>,
    callResult: CallResult
  ) {
    const fnResult = new FunctionCallResult<T>(funcScopes, callResult);
    return fnResult;
  }
}
