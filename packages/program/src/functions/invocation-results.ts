/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import type {
  CallResult,
  TransactionResponse,
  TransactionResult,
  TransactionResultReceipt,
} from '@fuel-ts/account';
import { getDecodedLogs } from '@fuel-ts/account';
import type { AbstractContract, AbstractProgram } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from '../contract-call-script';
import { callResultToInvocationResult } from '../script-request';
import type { CallConfig, InvocationScopeLike, JsonAbisFromAllCalls } from '../types';

/**
 * Calculates the gas usage from a CallResult.
 *
 * @param callResult - The CallResult containing receipt data.
 * @returns The gas usage.
 */
function getGasUsage(callResult: CallResult) {
  const scriptResult = callResult.receipts.find((r) => r.type === ReceiptType.ScriptResult) as
    | ReceiptScriptResult
    | undefined;
  return scriptResult?.gasUsed || bn(0);
}

/**
 * Represents the result of a function invocation, with decoded logs and gas usage.
 *
 * @template T - The type of the returned value.
 */
export class InvocationResult<T = any> {
  readonly functionScopes: Array<InvocationScopeLike>;
  readonly isMultiCall: boolean;
  readonly gasUsed: BN;
  readonly value: T;

  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
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

  /**
   * Gets the first call config.
   *
   * @returns The first call config.
   */
  private getFirstCallConfig(): CallConfig | undefined {
    if (!this.functionScopes[0]) {
      return undefined;
    }

    return this.functionScopes[0].getCallConfig();
  }

  /**
   * Gets the ABI from all calls.
   *
   * @returns The ABIs from all calls.
   */
  getAbiFromAllCalls = () =>
    this.functionScopes.reduce((acc, funcScope, i) => {
      const { program, externalAbis } = funcScope.getCallConfig();

      if (i === 0) {
        acc.main = program.interface.jsonAbi;
        acc.otherContractsAbis = {};
      } else {
        acc.otherContractsAbis[(<AbstractContract>program).id.toB256()] = program.interface.jsonAbi;
      }

      acc.otherContractsAbis = { ...acc.otherContractsAbis, ...externalAbis };

      return acc;
    }, {} as JsonAbisFromAllCalls);

  /**
   * Decodes the value from the call result.
   *
   * @param callResult - The call result.
   * @returns The decoded value.
   */
  protected getDecodedValue(callResult: CallResult) {
    const logs = this.getDecodedLogs(callResult.receipts);
    const callConfig = this.getFirstCallConfig();
    if (this.functionScopes.length === 1 && callConfig && 'bytes' in callConfig.program) {
      return callResultToInvocationResult<T>(callResult, callConfig, logs);
    }

    const encodedResults = decodeContractCallScriptResult(
      callResult,
      (callConfig?.program as AbstractContract).id,
      callConfig?.func.outputMetadata.isHeapType || false,
      logs
    );
    const returnValues = encodedResults.map((encodedResult, i) => {
      const { func } = this.functionScopes[i].getCallConfig();
      return func.decodeOutput(encodedResult)?.[0];
    });
    return (this.isMultiCall ? returnValues : returnValues?.[0]) as T;
  }

  /**
   * Decodes the logs from the receipts.
   *
   * @param receipts - The transaction result receipts.
   * @returns The decoded logs.
   */
  protected getDecodedLogs(receipts: Array<TransactionResultReceipt>) {
    const mainCallConfig = this.getFirstCallConfig();
    if (!mainCallConfig) {
      return [];
    }

    const { main, otherContractsAbis } = this.getAbiFromAllCalls();

    return getDecodedLogs(receipts, main, otherContractsAbis);
  }
}

/**
 * Represents the result of a function invocation with transaction details.
 *
 * @template T - The type of the returned value.
 * @template TTransactionType - The type of the transaction.
 */
export class FunctionInvocationResult<
  T = any,
  TTransactionType = void,
> extends InvocationResult<T> {
  readonly transactionId: string;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<TTransactionType>;
  readonly program: AbstractProgram;
  readonly logs!: Array<any>;

  /**
   * Constructs an instance of FunctionInvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param transactionResponse - The transaction response.
   * @param transactionResult - The transaction result.
   * @param program - The program.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    transactionResponse: TransactionResponse,
    transactionResult: TransactionResult<TTransactionType>,
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

  /**
   * Builds an instance of FunctionInvocationResult.
   *
   * @param funcScope - The function scope.
   * @param transactionResponse - The transaction response.
   * @param isMultiCall - Whether it's a multi-call.
   * @param program - The program.
   * @returns The function invocation result.
   */
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

/**
 * Represents the result of an invocation call.
 *
 * @template T - The type of the returned value.
 */
export class InvocationCallResult<T = any> extends InvocationResult<T> {
  readonly callResult: CallResult;

  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    super(funcScopes, callResult, isMultiCall);
    this.callResult = callResult;
  }

  /**
   * Builds an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   * @returns The invocation call result.
   */
  static async build<T>(
    funcScopes: InvocationScopeLike | Array<InvocationScopeLike>,
    callResult: CallResult,
    isMultiCall: boolean
  ) {
    const fnResult = await new InvocationCallResult<T>(funcScopes, callResult, isMultiCall);
    return fnResult;
  }
}
