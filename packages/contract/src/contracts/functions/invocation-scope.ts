/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { CoinQuantity } from '@fuel-ts/providers';
import { coinQuantityfy } from '@fuel-ts/providers';

import type { CallConfig, CallParams } from '../../types';
import type Contract from '../contract';

import { BaseInvocationScope } from './base-invocation-scope';

export class FunctionInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any
> extends BaseInvocationScope<TReturn> {
  private func: FunctionFragment;
  private callParameters?: CallParams;
  private forward?: CoinQuantity;
  private args: TArgs;

  constructor(contract: Contract, func: FunctionFragment, args: TArgs) {
    super(contract, false);
    this.func = func;
    this.args = args || [];
    this.setArguments(...args);
    super.addCall(this);
  }

  getCallConfig(): CallConfig<TArgs> {
    return {
      func: this.func,
      contract: this.contract,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
      bytesOffset: this.transactionRequest.bytesOffset || 0,
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
      if (!this.func.attributes.find((attr) => attr.name === 'payable')) {
        throw new Error('Function is not payable.');
      }

      this.forward = coinQuantityfy(callParams.forward);
    }

    // Update transaction script with new forward params
    this.setArguments(...this.args);

    // Update required coins
    this.updateRequiredCoins();

    return this;
  }
}
