/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CallResult, JsonAbisFromAllCalls, TransactionResultReceipt } from '@fuel-ts/account';
import { getDecodedLogs } from '@fuel-ts/account';
import type { AbstractContract } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { decodeContractCallScriptResult } from '../contract-call-script';
import { callResultToInvocationResult } from '../script-request';
import type { CallConfig, InvocationScopeLike } from '../types';
import { getAbisFromAllCalls } from '../utils';

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

  getAbiFromAllCalls(): JsonAbisFromAllCalls {
    return getAbisFromAllCalls(this.functionScopes);
  }

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
