import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './functions/invocation-scope';
import type { Script } from './script';
import type { ScriptRequest } from './script-request';

export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

export type TxParams = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;

export type CallOptions = Partial<{
  fundTransaction: boolean;
}>;

export type CallConfig<TInput extends Array<any> = Array<any>> = {
  func: FunctionFragment;
  script: Script<TInput, unknown>;
  scriptRequest: ScriptRequest<TInput, unknown>;
  callParameters?: CallParams;
  txParameters?: TxParams;
  forward?: CoinQuantity;
  args: TInput;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InvokeFunction<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => FunctionInvocationScope<TArgs, TReturn>;

export interface InvokeFunctions {
  [key: string]: InvokeFunction;
}

export type InvocationScopeLike = {
  getCallConfig(): CallConfig<Array<any>>;
};

export type TransactionCostOptions = Partial<{
  fundTransaction: boolean;
  gasPrice: BigNumberish;
  tolerance: number;
}>;
