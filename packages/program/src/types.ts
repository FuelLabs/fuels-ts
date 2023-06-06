import type { BytesLike } from '@ethersproject/bytes';
import type {
  FunctionFragment,
  JsonFlatAbi,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentFunction,
  InferAbiType,
  TupleToUnion,
} from '@fuel-ts/abi-coder';
import type { AbstractAddress, AbstractProgram } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike, CoinQuantity } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './functions/invocation-scope';

export type InvocationScopeLike<T = unknown> = {
  getCallConfig(): CallConfig<T>;
};

export type TransactionCostOptions = Partial<{
  fundTransaction: boolean;
  gasPrice: BigNumberish;
  tolerance: number;
}>;

export type ContractCall = {
  contractId: AbstractAddress;
  data: BytesLike;
  fnSelector: string;
  isDataPointer: boolean;
  amount?: BigNumberish;
  assetId?: BytesLike;
  gas?: BigNumberish;
};

export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

// #region transaction-params
export type TxParams = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;
// #endregion transaction-params

export type CallOptions = Partial<{
  fundTransaction: boolean;
}>;

export type CallConfig<T = unknown> = {
  func: FunctionFragment;
  program: AbstractProgram;
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

export type NewInvokeFunctions<
  Fn extends JsonFlatAbiFragmentFunction,
  Types extends JsonFlatAbi['types']
> = {
  [Name in Fn['name']]: Fn extends { readonly name: Name } ? NewInvokeFunction<Fn, Types> : never;
};

export type NewInvokeFunction<
  Fn extends JsonFlatAbiFragmentFunction,
  Types extends JsonFlatAbi['types'],
  FnInput extends JsonFlatAbiFragmentArgumentType = TupleToUnion<Fn['inputs']>,
  TInput = {
    // do not abstract into some FunctionInputs<...> type because it makes the
    // displayed inferred on-hover type ugly
    [InputName in FnInput['name']]: FnInput extends { readonly name: InputName }
      ? InferAbiType<Types, FnInput>
      : never;
  },
  TReturn = InferAbiType<Types, Fn['output']>
> = Fn['inputs']['length'] extends 0
  ? () => FunctionInvocationScope<never, TReturn>
  : (input: TInput) => FunctionInvocationScope<TInput, TReturn>;
