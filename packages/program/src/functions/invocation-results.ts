/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type { Interface } from '@fuel-ts/abi-coder';
import type { AbstractProgram } from '@fuel-ts/interfaces';
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

import { contractCallScript } from '../contract-call-script';
import { callResultToInvocationResult } from '../script-request';
import type { CallConfig, InvocationScopeLike } from '../types';

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

  private getFirstCallConfig(): CallConfig | undefined {
    if (!this.functionScopes[0]) {
      return undefined;
    }

    return this.functionScopes[0].getCallConfig();
  }

  protected getDecodedValue(callResult: CallResult) {
    const logs = this.getDecodedLogs(callResult.receipts);
    const callConfig = this.getFirstCallConfig();
    if (this.functionScopes.length === 1 && callConfig && 'bytes' in callConfig.program) {
      return callResultToInvocationResult<T>(callResult, callConfig, logs);
    }

    const encodedResults = contractCallScript.decodeCallResult(callResult, logs);
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { program, func } = this.functionScopes[i].getCallConfig();
      return program.interface.decodeFunctionResult(func, encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }

  protected getDecodedLogs(receipts: Array<TransactionResultReceipt>) {
    const callConfig = this.getFirstCallConfig();
    if (!callConfig) {
      return [];
    }

    const { program } = callConfig;
    return getDecodedLogs(receipts, program.interface as Interface);
  }
}

export class FunctionInvocationResult<
  T = any,
  TTransactionType = void
> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<any, TTransactionType>;
  readonly program: AbstractProgram;
  readonly logs!: Array<any>;

  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<any, TTransactionType>,
    program: AbstractProgram,
    isMultiCall: boolean
  ) {
    super(funcScopes, transactionResult, isMultiCall);
    this.transactionResponse = transactionResponse;
    this.transactionResult = transactionResult;
    this.transactionId = this.transactionResponse.id;
    this.program = program;
    this.logs = this.getDecodedLogs(transactionResult.receipts);
  }

  static async build<T, TTransactionType = void>(
    funcScope: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    isMultiCall: boolean,
    program: AbstractProgram
  ) {
    const txResult = await transactionResponse.waitForResult<TTransactionType>();
    const fnResult = new FunctionInvocationResult<T, TTransactionType>(
      funcScope,
      transactionResponse,
      txResult,
      program,
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
    const fnResult = await new InvocationCallResult<T>(funcScopes, callResult, isMultiCall);
    return fnResult;
  }
}
