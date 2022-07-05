/* eslint-disable @typescript-eslint/no-explicit-any */
import type Contract from './contract-new';
import { BaseInvocationScope } from './function-base-scope';
import type { FunctionInvocationScope } from './function-invocation-scope';

export class MultiCallInvocationScope<TReturn = any> extends BaseInvocationScope<TReturn> {
  constructor(contract: Contract, funcScopes: Array<FunctionInvocationScope>) {
    super(contract, true);
    this.addCalls(funcScopes);
  }

  addCall(funcScope: FunctionInvocationScope) {
    return super.addCalls([funcScope]);
  }

  addCalls(funcScopes: Array<FunctionInvocationScope>) {
    return super.addCalls(funcScopes);
  }
}
