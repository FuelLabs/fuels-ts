/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { AbstractContract } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionResult,
  CallResult,
  TransactionResponse,
  TransactionResultReceipt,
} from '@fuel-ts/providers';
import { getDecodedLogs } from '@fuel-ts/providers';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { contractCallScript } from '../scripts';
import type { InvocationScopeLike } from '../types';

function getGasUsage(callResult: CallResult) {
  const scriptResult = callResult.receipts.find((r) => r.type === ReceiptType.ScriptResult) as
    | ReceiptScriptResult
    | undefined;
  return scriptResult?.gasUsed || bn(0);
}

export class InvocationResult<T = any> {
  readonly functionScopes: Array<InvocationScopeLike>;
  readonly isMultiCall: boolean;
  readonly gasUsed: BN;
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
    const logs = this.getDecodedLogs(callResult.receipts);
    const encodedResults = contractCallScript.decodeCallResult(callResult, logs);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { contract, func } = this.functionScopes[i].getCallConfig();
      return contract.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }

  protected getDecodedLogs(receipts: Array<TransactionResultReceipt>) {
    if (!this.functionScopes[0]) {
      return [];
    }

    const { contract } = this.functionScopes[0].getCallConfig();

    return getDecodedLogs(receipts, contract.interface);
  }
}

export class FunctionInvocationResult<
  T = any,
  TTransactionType = void
> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any, TTransactionType>;
  readonly contract: AbstractContract;
  readonly logs!: Array<any>;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any, TTransactionType>,
    contract: AbstractContract,
    isMultiCall: boolean
  ) {
    super(funcScopes, transactionResult, isMultiCall);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
    this.contract = contract;
    this.logs = this.getDecodedLogs(transactionResult.receipts);
  }

  static async build<T, TTransactionType = void>(
    funcScope: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    isMultiCall: boolean,
    contract: AbstractContract
  ) {
    const txResult = await transactionResponse.waitForResult<TTransactionType>();
    const fnResult = new FunctionInvocationResult<T, TTransactionType>(
      funcScope,
      transactionResponse,
      txResult,
      contract,
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
