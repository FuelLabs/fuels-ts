import type { BytesLike } from '@ethersproject/bytes';
import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { AbstractContract, AbstractAddress } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './functions/invocation-scope';

export type ContractCall = {
  contractId: AbstractAddress;
  data: BytesLike;
  amount?: BigNumberish;
  assetId?: BytesLike;
  gas?: BigNumberish;
};

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

export type CallConfig<T = unknown> = {
  func: FunctionFragment;
  contract: AbstractContract;
  callParameters?: CallParams;
  txParameters?: TxParams;
  forward?: CoinQuantity;
  args: T;
  bytesOffset: number;
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
  gasPrice: BigNumberish;
  tolerance: number;
}>;
