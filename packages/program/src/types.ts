import type { FunctionFragment, JsonAbi, EncodingVersion } from '@fuel-ts/abi-coder';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/account';
import type { AbstractProgram, AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';

import type { FunctionInvocationScope } from './functions/invocation-scope';

/**
 * Represents a contract call.
 */
export type ContractCall = {
  contractId: AbstractAddress;
  data: BytesLike;
  fnSelector: string;
  fnSelectorBytes: Uint8Array;
  encoding?: EncodingVersion;
  isInputDataPointer: boolean;
  isOutputDataHeap: boolean;
  outputEncodedLength: number;
  amount?: BigNumberish;
  assetId?: BytesLike;
  gas?: BigNumberish;
  externalContractsAbis?: Record<string, JsonAbi>;
};

/**
 * Represents call parameters for a contract call.
 */
export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

/**
 * Represents transaction parameters for a contract call.
 */
export type TxParams = Partial<{
  tip: BigNumberish;
  gasLimit: BigNumberish;
  maturity?: number;
  maxFee?: BigNumberish;
  witnessLimit?: BigNumberish;
  variableOutputs: number;
  optimizeGas?: boolean;
}>;

/**
 * Represents configuration for calling a contract function.
 *
 * @template T - Type of the function's arguments.
 */
export type CallConfig<T = unknown> = {
  func: FunctionFragment;
  program: AbstractProgram;
  callParameters?: CallParams;
  txParameters?: TxParams;
  forward?: CoinQuantity;
  externalAbis: Record<string, JsonAbi>;
  args: T;
};

/**
 * Represents a function that can be invoked.
 *
 * @template TArgs - Type of the function's arguments.
 * @template TReturn - Type of the function's return value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InvokeFunction<TArgs extends Array<any> = Array<any>, TReturn = any> {
  (...args: TArgs): FunctionInvocationScope<TArgs, TReturn>;
  isReadOnly: () => boolean;
}

/**
 * Represents a collection of functions that can be invoked.
 */
export interface InvokeFunctions {
  [key: string]: InvokeFunction;
}

/**
 * Represents a like object of InvocationScope with a method to get its call configuration.
 * @template T - Type of the function's arguments.
 */
export type InvocationScopeLike<T = unknown> = {
  /**
   * Get the call configuration for this invocation scope.
   * @returns \{CallConfig<T>\} The call configuration.
   */
  getCallConfig(): CallConfig<T>;
};

/**
 * Represents options for calculating the transaction cost.
 */
export type TransactionCostOptions = Partial<{
  fundTransaction: boolean;
}>;
