/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbstractContract } from '@fuel-ts/interfaces';

import { BaseInvocationScope } from './base-invocation-scope';
import type { FunctionInvocationScope } from './invocation-scope';

export class MultiCallInvocationScope<
  TFunctions = (...args: any[]) => any,
  TReturn = any
> extends BaseInvocationScope<TReturn> {
  constructor(contract: AbstractContract, funcScopes: TFunctions[]) {
    super(contract, true);
    this.addCalls(funcScopes);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addCall(funcScope: FunctionInvocationScope) {
    return super.addCalls([funcScope]);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addCalls(funcScopes: Array<FunctionInvocationScope>) {
    return super.addCalls(funcScopes);
  }
}
