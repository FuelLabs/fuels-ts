import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { CoinQuantity } from '@fuel-ts/providers';
import { coinQuantityfy } from '@fuel-ts/providers';

import type { Script } from '../script';
import type { CallConfig, CallParams } from '../types';

import { BaseInvocationScope } from './base-invocation-scope';

export class FunctionInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any
> extends BaseInvocationScope<TReturn> {
  private func: FunctionFragment;
  private callParameters?: CallParams;
  private forward?: CoinQuantity;
  private args: TArgs;

  constructor(script: Script<TArgs, TReturn>, func: FunctionFragment, args: TArgs) {
    super(script);
    this.func = func;
    this.args = args || [];
    this.setArguments(...args);
  }

  getCallConfig(): CallConfig<TArgs> {
    return {
      func: this.func,
      script: this.script,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
    };
  }

  setArguments(...args: TArgs) {
    this.args = args || [];
    this.updateScriptRequest();
    return this;
  }

  callParams(callParams: CallParams) {
    this.callParameters = callParams;

    if (callParams?.forward) {
      this.forward = coinQuantityfy(callParams.forward);
    }

    // Update transaction script with new forward params
    this.setArguments(...this.args);

    // Update required coins
    this.updateRequiredCoins();

    return this;
  }
}
