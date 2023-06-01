import type { BytesLike } from '@ethersproject/bytes';
import type {
  FunctionFragment,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentFunction,
  JsonFlatAbiFragmentType,
} from '@fuel-ts/abi-coder';
import type { AbstractProgram, AbstractAddress } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './functions/invocation-scope';
import type { IndexOf, TupleToUnion } from './utils';

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

type KeysWithGenericValue<T> = keyof {
  [K in keyof T as T[K] extends `tpi-${string}`
    ? K
    : T[K] extends object
    ? KeysWithGenericValue<T[K]> extends keyof T[K]
      ? K
      : never
    : never]: K;
};

type ReplaceGenericWithInputValue<
  GenericPart,
  Input extends JsonFlatAbiFragmentArgumentType,
  Types extends AbiTypes
> = {
  [K in keyof GenericPart]: GenericPart[K] extends `tpi-${infer TPI extends number}`
    ? Types[NonNullable<Input['typeArguments']>[TPI]['type']]
    : never;
};

type InferInput<
  Input extends JsonFlatAbiFragmentArgumentType,
  Types extends AbiTypes,
  Type = Types[Input['type']],
  GenericKeys extends string | number | symbol = KeysWithGenericValue<Type>
> = Omit<Type, GenericKeys> &
  ReplaceGenericWithInputValue<
    Pick<Type, GenericKeys extends keyof Type ? GenericKeys : never>,
    Input,
    Types
  >;

type FunctionInputs<Input extends JsonFlatAbiFragmentArgumentType, Types extends AbiTypes> = {
  [InputName in Input['name']]: Input extends { readonly name: InputName }
    ? Input['typeArguments'] extends null
      ? Types[Input['type']]
      : InferInput<Input, Types>
    : never;
};

export type InvokeFunction<
  Inputs extends readonly JsonFlatAbiFragmentArgumentType[],
  Types extends AbiTypes,
  TArgs extends Array<unknown> = Array<unknown>,
  TReturn = unknown
> = Inputs['length'] extends 0
  ? () => FunctionInvocationScope<TArgs, TReturn>
  : (
      argsObj: FunctionInputs<TupleToUnion<Inputs>, Types>,
      ...args: TArgs
    ) => FunctionInvocationScope<TArgs, TReturn>;

export type InvokeFunctions<Fn extends JsonFlatAbiFragmentFunction, Types extends AbiTypes> = {
  [Name in Fn['name']]: Fn extends { readonly name: Name }
    ? InvokeFunction<Fn['inputs'], Types>
    : never;
};

export type AbiTypes<
  T extends JsonFlatAbiFragmentType = JsonFlatAbiFragmentType,
  TAll extends JsonFlatAbiFragmentType = T,
  TypeParameterIndex extends number = -1
> = {
  readonly [typeId in T['typeId']]: T extends { readonly typeId: typeId }
    ? InferAbiType<T, TAll, TypeParameterIndex>
    : never;
};

type BasicAbiType = '()' | 'u8' | 'u16' | 'u32' | 'u64' | 'b256' | 'bool' | `str[${number}]`;

type InferBasicAbiType<T extends BasicAbiType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
  ? number
  : T extends `str[${infer L extends number}]`
  ? // ? StringOfLength<Input extends string ? Input : never, R>
    string
  : T extends 'b256'
  ? string
  : T extends 'bool'
  ? boolean
  : T extends '()'
  ? never
  : never;

export type InferAbiType<
  X extends JsonFlatAbiFragmentType,
  TAllFragments extends JsonFlatAbiFragmentType,
  TypeParameterIndex extends number,
  Type = X['type']
> = Type extends BasicAbiType
  ? InferBasicAbiType<Type>
  : Type extends `struct${string}Vec`
  ? []
  : Type extends `struct ${string}`
  ? MapStruct<X, Exclude<TAllFragments, X>>
  : Type extends `generic${string}`
  ? TypeParameterIndex extends -1
    ? X['typeId']
    : `tpi-${TypeParameterIndex}`
  : 'See this? Report bug and share your abi.';

type MapStruct<
  TStruct extends JsonFlatAbiFragmentType,
  TAllFragments extends JsonFlatAbiFragmentType,
  Component extends JsonFlatAbiFragmentArgumentType = TupleToUnion<
    NonNullable<TStruct['components']>
  >
> = {
  [Name in Component['name']]: Component extends { readonly name: Name }
    ? AbiTypes<
        TAllFragments,
        TAllFragments,
        IndexOf<TStruct['typeParameters'], Component['type']>
      >[Component['type']]
    : never;
};
