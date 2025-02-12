/* eslint-disable max-classes-per-file */
import type { FunctionFragment, JsonAbi, Interface } from '@fuel-ts/abi-coder';
import type {
  CallResult,
  CoinQuantity,
  CoinQuantityLike,
  TransactionResponse,
  TransactionResult,
  TransactionType,
  AbstractAccount,
  Provider,
} from '@fuel-ts/account';
import type { Address, WithContractId } from '@fuel-ts/address';
import type { BN, BigNumberish } from '@fuel-ts/math';
import type { BytesLike } from '@fuel-ts/utils';

import type { FunctionInvocationScope } from './functions/invocation-scope';

/**
 * @hidden
 */
export abstract class AbstractProgram {
  abstract account: AbstractAccount | null;
  abstract interface: Pick<Interface, 'jsonAbi'>;
  abstract provider: Pick<Provider, 'sendTransaction' | 'getTransactionCost'> | null;
}

export abstract class AbstractContract extends AbstractProgram implements WithContractId {
  abstract id: Address;
}

/**
 * Represents a contract call.
 */
export type ContractCall = {
  contractId: Address;
  data: BytesLike;
  fnSelectorBytes: Uint8Array;
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
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
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

export type FunctionResult<TReturn> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly logs: Array<any>;
  readonly value: TReturn;
  readonly gasUsed: BN;
  readonly program: AbstractProgram;
  readonly isMultiCall: boolean;
  readonly transactionId: string;
  readonly functionScopes: Array<InvocationScopeLike>;
  readonly transactionResponse: TransactionResponse;
  readonly transactionResult: TransactionResult<TransactionType.Script>;
};

export type DryRunResult<TReturn> = {
  readonly gasUsed: BN;
  readonly value: TReturn;
  readonly isMultiCall: boolean;
  readonly callResult: CallResult;
  readonly functionScopes: Array<InvocationScopeLike>;
};
