/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionFragment } from '@fuel-ts/abi-coder';
<<<<<<< Updated upstream:packages/program/src/functions/invocation-scope.ts
import type { AbstractProgram } from '@fuel-ts/interfaces';
=======
import type { BN } from '@fuel-ts/math';
>>>>>>> Stashed changes:packages/contract/src/contracts/functions/invocation-scope.ts
import type { CoinQuantity } from '@fuel-ts/providers';
import { coinQuantityfy } from '@fuel-ts/providers';

import type { CallConfig, CallParams } from '../types';

import { BaseInvocationScope } from './base-invocation-scope';

export class FunctionInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any
> extends BaseInvocationScope<TReturn> {
  protected func: FunctionFragment;
  private callParameters?: CallParams;
  private forward?: CoinQuantity;
  protected args: TArgs;

<<<<<<< Updated upstream:packages/program/src/functions/invocation-scope.ts
  constructor(program: AbstractProgram, func: FunctionFragment, args: TArgs) {
    super(program, false);
=======
  constructor(contract: Contract, func: FunctionFragment, args: TArgs, gasPriceFactor: BN) {
    super(contract, false, gasPriceFactor);
>>>>>>> Stashed changes:packages/contract/src/contracts/functions/invocation-scope.ts
    this.func = func;
    this.args = args || [];
    this.setArguments(...args);
    super.addCall(this);
  }

  getCallConfig(): CallConfig<TArgs> {
    return {
      func: this.func,
      program: this.program,
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
