/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
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

import type { InvocationScopeLike } from '../types';

function getGasUsage(callResult: CallResult) {
  const scriptResult = callResult.receipts.find((r) => r.type === ReceiptType.ScriptResult) as
    | ReceiptScriptResult
    | undefined;
  return scriptResult?.gasUsed || bn(0);
}

export class InvocationResult<T = any> {
  readonly functionScope: InvocationScopeLike;
  readonly gasUsed: BN;
  readonly value: T;

  constructor(funcScope: InvocationScopeLike, callResult: CallResult) {
    this.functionScope = funcScope;
    this.value = this.getDecodedValue(callResult);
    this.gasUsed = getGasUsage(callResult);
  }

  protected getDecodedValue(callResult: CallResult) {
    const { scriptRequest } = this.functionScope.getCallConfig();
    return scriptRequest.decodeCallResult(callResult) as T;
  }

  protected getDecodedLogs(receipts: Array<TransactionResultReceipt>) {
    const { script } = this.functionScope.getCallConfig();
    return getDecodedLogs(receipts, script.interface);
  }
}

export class FunctionInvocationResult<T, TTransactionType = void> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any, TTransactionType>;
  readonly logs!: Array<any>;

  constructor(
    funcScope: InvocationScopeLike,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any, TTransactionType>
  ) {
    super(funcScope, transactionResult);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
    this.logs = this.getDecodedLogs(transactionResult.receipts);
  }

  static async build<T, TTransactionType = void>(
    funcScope: InvocationScopeLike,
    transactionResponse: TransactionResponse
  ) {
    const txResult = await transactionResponse.waitForResult<TTransactionType>();
    const fnResult = new FunctionInvocationResult<T, TTransactionType>(
      funcScope,
      transactionResponse,
      txResult
    );
    return fnResult;
  }
}
