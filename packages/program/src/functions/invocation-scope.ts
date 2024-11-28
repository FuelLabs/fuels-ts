/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AbiCoderFunction } from '@fuel-ts/abi';
import type { CoinQuantity } from '@fuel-ts/account';
import { coinQuantityfy } from '@fuel-ts/account';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractProgram } from '@fuel-ts/interfaces';

import type { CallConfig, CallParams } from '../types';

import { BaseInvocationScope } from './base-invocation-scope';

/**
 * Represents a scope for invoking a function.
 *
 * @template TArgs - The type of the function arguments.
 * @template TReturn - The type of the return value.
 */
export class FunctionInvocationScope<
  TArgs extends Array<any> = Array<any>,
  TReturn = any,
> extends BaseInvocationScope<TReturn> {
  protected func: AbiCoderFunction;
  private callParameters?: CallParams;
  private forward?: CoinQuantity;
  protected args: TArgs;

  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(program: AbstractProgram, func: AbiCoderFunction, args: TArgs) {
    super(program, false);
    this.func = func;
    this.args = args || [];
    this.setArguments(...args);
    super.addCall(this);
  }

  /**
   * Gets the call configuration.
   *
   * @returns The call configuration.
   */
  getCallConfig(): CallConfig<TArgs> {
    return {
      func: this.func,
      program: this.program,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
      externalAbis: this.externalAbis,
    };
  }

  /**
   * Sets the arguments for the function invocation.
   *
   * @param args - The arguments.
   * @returns The instance of FunctionInvocationScope.
   */
  setArguments(...args: TArgs) {
    this.args = args || [];
    return this;
  }

  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(callParams: CallParams) {
    if (!this.hasCallParamsGasLimit && callParams?.gasLimit !== undefined) {
      this.hasCallParamsGasLimit = true;
    }
    this.callParameters = callParams;

    if (callParams?.forward) {
      if (!this.func.attributes?.find((attr) => attr.name === 'payable')) {
        throw new FuelError(
          ErrorCode.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
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
