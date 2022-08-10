import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';

import type Contract from './contracts/contract';
import type { FunctionInvocationScope } from './contracts/functions/invocation-scope';

export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

export type TxParams = Partial<{
  bytePrice: BigNumberish;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;

export type CallOptions = Partial<{
  fundTransaction: boolean;
}>;

export type CallConfig<T = unknown> = {
  func: FunctionFragment;
  contract: Contract;
  callParameters?: CallParams;
  txParameters?: TxParams;
  forward?: CoinQuantity;
  args: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InvokeFunction<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => FunctionInvocationScope<TArgs, TReturn>;

export interface InvokeFunctions {
  [key: string]: InvokeFunction;
}

export type InvocationScopeLike<T = unknown> = {
  getCallConfig(): CallConfig<T>;
};

export type TransactionCostOptions = Partial<{
  fundTransaction: boolean;
  bytePrice: BigNumberish;
  gasPrice: BigNumberish;
  tolerance: number;
}>;
