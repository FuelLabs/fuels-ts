/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractContract } from '@fuel-ts/interfaces';

import { BaseInvocationScope } from './base-invocation-scope';
import type { FunctionInvocationScope } from './invocation-scope';

/**
 * Represents a scope for invoking multiple calls.
 *
 * @template TReturn - The type of the return value.
 */
export class MultiCallInvocationScope<TReturn = any> extends BaseInvocationScope<TReturn> {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(contract: AbstractContract, funcScopes: Array<FunctionInvocationScope>) {
    super(contract, true);
    this.addCalls(funcScopes);
    this.validateHeapTypeReturnCalls();
  }

  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(funcScope: FunctionInvocationScope) {
    return super.addCalls([funcScope]);
  }

  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(funcScopes: Array<FunctionInvocationScope>) {
    return super.addCalls(funcScopes);
  }

  private validateHeapTypeReturnCalls() {
    let heapOutputIndex = -1;
    let numberOfHeaps = 0;

    this.calls.forEach((call, callIndex) => {
      const { isOutputDataHeap } = call;

      if (isOutputDataHeap) {
        heapOutputIndex = callIndex;

        if (++numberOfHeaps > 1) {
          throw new FuelError(
            ErrorCode.INVALID_MULTICALL,
            'Only one call that returns a heap type is allowed on a multicall'
          );
        }
      }
    });

    const hasHeapTypeReturn = heapOutputIndex !== -1;
    const isOnLastCall = heapOutputIndex === this.calls.length - 1;

    if (hasHeapTypeReturn && !isOnLastCall) {
      throw new FuelError(
        ErrorCode.INVALID_MULTICALL,
        'The contract call with the heap type return must be at the last position on the multicall'
      );
    }
  }
}
