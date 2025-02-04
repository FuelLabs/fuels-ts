/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractContract } from '../types';

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
  }

  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  override addCall(funcScope: FunctionInvocationScope) {
    return super.addCalls([funcScope]);
  }

  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  override addCalls(funcScopes: Array<FunctionInvocationScope>) {
    return super.addCalls(funcScopes);
  }
}
