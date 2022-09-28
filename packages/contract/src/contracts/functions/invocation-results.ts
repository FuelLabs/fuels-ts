/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { U64Coder } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionResult,
  CallResult,
  TransactionResponse,
  TransactionResultReceipt,
} from '@fuel-ts/providers';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { contractCallScript } from '../../scripts';
import type { InvocationScopeLike } from '../../types';
import type Contract from '../contract';

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
  readonly logs!: Array<any>;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean,
    logs?: Array<any>
  ) {
    this.functionScopes = Array.isArray(funcScopes) ? funcScopes : [funcScopes];
    this.isMultiCall = isMultiCall;
    this.logs = logs || [];
    this.value = this.getDecodedValue(callResult);
    this.gasUsed = getGasUsage(callResult);
  }

  protected getDecodedValue(callResult: CallResult) {
    const encodedResults = contractCallScript.decodeCallResult(callResult);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { contract, func } = this.functionScopes[i].getCallConfig();
      return contract.interface.decodeFunctionResult(func, encodedResult, this.logs)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }
}

export class FunctionInvocationResult<T = any> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any>;
  readonly contract: Contract;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any>,
    contract: Contract,
    isMultiCall: boolean
  ) {
    const decodedLogs = FunctionInvocationResult.getDecodedLogs(
      transactionResult.receipts,
      contract
    );
    super(funcScopes, transactionResult, isMultiCall, decodedLogs);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
    this.contract = contract;
  }

  static async build<T>(
    funcScope: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    isMultiCall: boolean,
    contract: Contract
  ) {
    const txResult = await transactionResponse.waitForResult();
    const fnResult = new FunctionInvocationResult<T>(
      funcScope,
      transactionResponse,
      txResult,
      contract,
      isMultiCall
    );
    return fnResult;
  }

  static getDecodedLogs(receipts: Array<TransactionResultReceipt>, contract: Contract) {
    return receipts.reduce((logs, r) => {
      if (r.type === ReceiptType.LogData) {
        return logs.concat(...contract.interface.decodeLog(r.data, r.val1.toNumber()));
      }

      if (r.type === ReceiptType.Log) {
        return logs.concat(
          ...contract.interface.decodeLog(new U64Coder().encode(r.val0), r.val1.toNumber())
        );
      }

      return logs;
    }, []);
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
