import type { BytesLike } from '@ethersproject/bytes';
import type {
  FunctionFragment,
  JsonFlatAbi,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentFunction,
  JsonFlatAbiFragmentType,
} from '@fuel-ts/abi-coder';
import type { AbstractAddress, AbstractProgram } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike, CoinQuantity } from '@fuel-ts/providers';

import type { FunctionInvocationScope } from './functions/invocation-scope';
import type { IndexOf, ReplaceValues, TupleToUnion } from './utils';

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

export type InvokeFunctions<
  Fn extends JsonFlatAbiFragmentFunction,
  Types extends JsonFlatAbi['types']
> = {
  [Name in Fn['name']]: Fn extends { readonly name: Name } ? InvokeFunction<Fn, Types> : never;
};

export type InvokeFunction<
  Fn extends JsonFlatAbiFragmentFunction,
  Types extends JsonFlatAbi['types'],
  TArgs extends Array<unknown> = Array<unknown>,
  TReturn = GetMappedAbiType<Types, Fn['output']>
> = Fn['inputs']['length'] extends 0
  ? () => FunctionInvocationScope<never, TReturn>
  : (
      argsObj: FunctionInputs<TupleToUnion<Fn['inputs']>, Types>,
      ...args: TArgs
    ) => FunctionInvocationScope<TArgs, TReturn>;

type FunctionInputs<
  Input extends JsonFlatAbiFragmentArgumentType,
  Types extends JsonFlatAbi['types']
> = {
  [InputName in Input['name']]: Input extends { readonly name: InputName }
    ? GetMappedAbiType<Types, Input>
    : never;
};

export type GetMappedAbiType<
  Types extends JsonFlatAbi['types'],
  Arg extends JsonFlatAbiFragmentArgumentType,
  T extends JsonFlatAbiFragmentType = Types[Arg['type']],
  // @ts-ignore
  Components extends readonly JsonFlatAbiFragmentType['components'] = MapComponents<
    Types,
    T,
    Arg['typeArguments']
  >,
  Component extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<Components>>
> = Components extends null
  ? T['typeId']
  : T['type'] extends 'struct Vec'
  ? InferValue<Types, NonNullable<NonNullable<Components>[0]['typeArguments']>[0]>[]
  : {
      [Name in Component['name']]: Component extends { readonly name: Name }
        ? InferValue<Types, Component>
        : never;
    };

type MapComponents<
  AbiTypes extends JsonFlatAbi['types'],
  T extends JsonFlatAbiFragmentType,
  Args extends JsonFlatAbiFragmentArgumentType['typeArguments'],
  Components extends NonNullable<JsonFlatAbiFragmentType['components']> = NonNullable<
    T['components']
  >
> = T['components'] extends null
  ? null
  : Args extends null
  ? Components
  : {
      readonly [K in keyof Components]: MapArgsIntoGenericTypeArgument<
        AbiTypes,
        NonNullable<T['typeParameters']>,
        Components[K],
        NonNullable<Args>
      >;
    };

type InferValue<
  AbiTypes extends JsonFlatAbi['types'],
  Component extends JsonFlatAbiFragmentArgumentType,
  T extends JsonFlatAbiFragmentType = AbiTypes[Component['type']],
  TType extends string = T['type']
> = TType extends BasicAbiType
  ? InferBasicAbiType<TType>
  : TType extends 'struct Vec'
  ? InferValue<AbiTypes, NonNullable<Component['typeArguments']>[0]>[]
  : TType extends `struct ${string}`
  ? GetMappedAbiType<AbiTypes, Component>
  : 'SHOULD NEVER COME TO HERE';

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
  ? void
  : never;

type MapArgsIntoGenericTypeArgument<
  AbiTypes extends JsonFlatAbi['types'],
  TypeParametersArray extends NonNullable<JsonFlatAbiFragmentType['typeParameters']>,
  Argument extends JsonFlatAbiFragmentArgumentType,
  GenericInputs extends readonly JsonFlatAbiFragmentArgumentType[],
  TypeParameters extends number = TupleToUnion<NonNullable<TypeParametersArray>>,
  NewType extends JsonFlatAbiFragmentType = AbiTypes[GenericInputs[IndexOf<
    TypeParametersArray,
    Argument['type']
  >]['type']]
> = Argument['type'] extends TypeParameters // is itself a generic
  ? ReplaceValues<
      Argument,
      {
        readonly type: NewType['typeId'];
        readonly typeArguments: NewType['typeParameters'] extends null
          ? null
          : MapArgsIntoGenericTypeArguments<
              AbiTypes,
              NonNullable<NewType['components']>,
              NonNullable<NewType['typeParameters']>,
              NonNullable<
                GenericInputs[IndexOf<TypeParametersArray, Argument['type']>]['typeArguments']
              >
            >;
      }
    >
  : HasGenericValueDeep<TypeParameters, Argument['typeArguments']> extends true
  ? ReplaceValues<
      Argument,
      {
        readonly typeArguments: MapArgsIntoGenericTypeArguments<
          AbiTypes,
          NonNullable<Argument['typeArguments']>,
          TypeParametersArray,
          GenericInputs
        >;
      }
    >
  : Argument; // not generic

type MapArgsIntoGenericTypeArguments<
  AbiTypes extends JsonFlatAbi['types'],
  T extends readonly JsonFlatAbiFragmentArgumentType[],
  TypeParametersArray extends NonNullable<JsonFlatAbiFragmentType['typeParameters']>,
  Args extends readonly JsonFlatAbiFragmentArgumentType[]
> = {
  readonly [K in keyof T]: MapArgsIntoGenericTypeArgument<
    AbiTypes,
    TypeParametersArray,
    T[K],
    Args
  >;
};

type HasGenericValueDeep<
  TypeParameters extends number,
  TypeArgumentsArr extends JsonFlatAbiFragmentArgumentType['typeArguments'],
  TypeArgument extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<TypeArgumentsArr>>
> = TypeArgumentsArr extends null
  ? false
  : TypeArgument['type'] extends TypeParameters
  ? true
  : HasGenericValueDeep<TypeParameters, TypeArgument['typeArguments']>;
