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
  Types extends AbiTypes,
  TypeArguments extends readonly JsonFlatAbiFragmentArgumentType[] = NonNullable<
    Input['typeArguments']
  >
> = {
  [K in keyof GenericPart]: GenericPart[K] extends `tpi-${infer TPI extends number}`
    ? Types[TypeArguments[TPI]['type']]
    : GenericPart[K] extends object
    ? GenericPart[K]
    : // ? {
      //     [Key in keyof GenericPart[K]]: GenericPart[K][Key];
      //   }
      never;
};

type InferInput<
  Input extends JsonFlatAbiFragmentArgumentType,
  Types extends AbiTypes,
  Type = Types[Input['type']],
  KeysWithDeepGeneric extends string | number | symbol = KeysWithGenericValue<Type>
> = Omit<Type, KeysWithDeepGeneric> &
  ReplaceGenericWithInputValue<
    Pick<Type, KeysWithDeepGeneric extends keyof Type ? KeysWithDeepGeneric : never>,
    Input,
    Types
  >;

type FunctionInputs<Input extends JsonFlatAbiFragmentArgumentType, Types extends AbiTypes> = {
  [InputName in Input['name']]: Input extends { readonly name: InputName }
    ? InferInput<Input, Types>
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
  TypeParameterIndex extends number = -1,
  TypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'] = null,
  ParentTypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'] = null
> = {
  readonly [typeId in T['typeId']]: T extends { readonly typeId: typeId }
    ? InferAbiType<T, TAll, TypeParameterIndex, TypeArguments, ParentTypeArguments>
    : never;
};

type BasicAbiType = '()' | 'u8' | 'u16' | 'u32' | 'u64' | 'b256' | 'bool' | `str[${number}]`;

type InferBasicAbiType<T extends BasicAbiType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
  ? number
  : T extends `str[${string}]`
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
  InferredFragment extends JsonFlatAbiFragmentType,
  TAllFragments extends JsonFlatAbiFragmentType,
  TypeParameterIndex extends number,
  TypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'] = null,
  ParentTypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'] = null,
  Type = InferredFragment['type']
> = Type extends BasicAbiType
  ? InferBasicAbiType<Type>
  : Type extends `struct${string}Vec`
  ? number[]
  : Type extends `struct ${string}`
  ? MapStruct<InferredFragment, Exclude<TAllFragments, InferredFragment>, TypeArguments>
  : Type extends `generic${string}`
  ? TypeParameterIndex extends -1
    ? InferredFragment['typeId']
    : ParentTypeArguments extends null
    ? `tpi-${TypeParameterIndex}`
    :
        | AbiTypes<
            TAllFragments,
            TAllFragments,
            TypeParameterIndex,
            NonNullable<ParentTypeArguments>[TypeParameterIndex]['typeArguments'],
            ParentTypeArguments
          >[NonNullable<ParentTypeArguments>[TypeParameterIndex]['type']]
  : 'InferAbiType failing...';

type MapStruct<
  TStruct extends JsonFlatAbiFragmentType,
  TAllExceptStruct extends JsonFlatAbiFragmentType,
  TypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'],
  Component extends JsonFlatAbiFragmentArgumentType = TupleToUnion<
    NonNullable<TStruct['components']>
  >
> = {
  [Name in Component['name']]: Component extends { readonly name: Name }
    ? InferStructComponent<
        Component,
        AbiTypes<
          TAllExceptStruct,
          TAllExceptStruct,
          IndexOf<TStruct['typeParameters'], Component['type']>,
          Component['typeArguments'],
          TypeArguments
        >,
        TypeArguments,
        TStruct
      >
    : never;
};

type InferStructComponent<
  Component extends JsonFlatAbiFragmentArgumentType,
  Types extends AbiTypes,
  TypeArguments extends JsonFlatAbiFragmentArgumentType['typeArguments'],
  TStruct extends JsonFlatAbiFragmentType,
  Type = Types[Component['type']]
> = TypeArguments extends null
  ? Type
  : Type extends `tpi-${infer TPI extends number}`
  ? Types[NonNullable<TypeArguments>[TPI]['type']]
  : // NonNullable<TypeArguments>[TPI]['typeArguments'] extends null
    // ? Types[NonNullable<TypeArguments>[TPI]['type']]
    // : InferStructComponent<
    //     Component,
    //     Types,
    //     NonNullable<TypeArguments>[TPI]['typeArguments'],
    //     TStruct,
    //     Component
    //   >
    Type; // : TStruct
// | NonNullable<TypeArguments>[TPI]["typeArguments"] | TPI | Component['type']
// Component | Types[NonNullable<TypeArguments>[0]['type']] | 123456789 | 'this is good maan';
