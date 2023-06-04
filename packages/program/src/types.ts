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
  ComponentsTpl extends JsonFlatAbiFragmentType['components'] = MapComponents<
    Types,
    T,
    Arg['typeArguments']
  >,
  ComponentsU extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<ComponentsTpl>>
> = ComponentsTpl extends null
  ? InferBasicAbiType<T['type'] extends BasicAbiType ? T['type'] : never>
  : T['type'] extends 'struct Vec'
  ? MapVector<Types, ComponentsTpl>
  : Arg['name'] extends 'buf'
  ? InferValue<Types, NonNullable<Arg['typeArguments']>[0]>
  : T['type'] extends `[_; ${infer Length extends number}]`
  ? MapArray<Length, GetMappedAbiType<Types, ComponentsU>>
  : T['type'] extends `(_,${string}_)`
  ? MapTuple<Types, NonNullable<ComponentsTpl>>
  : T['type'] extends `enum ${string}`
  ? MapEnum<Types, ComponentsU>
  : T['type'] extends `struct ${string}`
  ? {
      [Name in ComponentsU['name']]: ComponentsU extends { readonly name: Name }
        ? InferValue<Types, ComponentsU>
        : never;
    }
  : never;

type MapVector<
  Types extends JsonFlatAbi['types'],
  Components extends JsonFlatAbiFragmentType['components'],
  Buf extends JsonFlatAbiFragmentArgumentType = NonNullable<Components>[0]
> = GetMappedAbiType<Types, Buf>[];

type MapEnum<
  Types extends JsonFlatAbi['types'],
  Component extends JsonFlatAbiFragmentArgumentType
> = Types[Component['type']]['type'] extends '()'
  ? Component['name']
  : GetMappedAbiType<Types, Component>;

type MapTuple<
  Types extends JsonFlatAbi['types'],
  Components extends readonly JsonFlatAbiFragmentArgumentType[]
> = {
  -readonly [K in keyof Components]: GetMappedAbiType<Types, Components[K]>;
};

export type MapArray<L extends number, T, R extends T[] = []> = R['length'] extends L
  ? R
  : MapArray<L, T, [...R, T]>;

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
  ? GetMappedAbiType<AbiTypes, NonNullable<Component['typeArguments']>[0]>[]
  : TType extends `struct ${string}`
  ? GetMappedAbiType<AbiTypes, Component>
  : T['type'] extends `enum ${string}`
  ? MapEnum<AbiTypes, Component>
  : T | 'SHOULD NEVER COME TO HERE';

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
> = Argument['type'] extends TypeParameters // is Argument itself a generic?
  ? ReplaceValues<
      Argument,
      {
        readonly type: NewType['typeId'];
        readonly typeArguments: NewType['typeParameters'] extends null
          ? null
          : // Then replace its generic content (recursive)
            MapArgsIntoTypeArguments<
              AbiTypes,
              NonNullable<NewType['components']>,
              NonNullable<NewType['typeParameters']>,
              NonNullable<
                GenericInputs[IndexOf<TypeParametersArray, Argument['type']>]['typeArguments']
              >
            >;
      }
    >
  : // Does Argument have a generic value deep in its typeArguments?
  HasGenericValueDeep<TypeParameters, Argument['typeArguments']> extends true
  ? ReplaceValues<
      Argument,
      {
        // Then replace the typeArguments' generic content (recursive)
        readonly typeArguments: MapArgsIntoTypeArguments<
          AbiTypes,
          NonNullable<Argument['typeArguments']>,
          TypeParametersArray,
          GenericInputs
        >;
      }
    >
  : Argument; // Argument is not generic

type MapArgsIntoTypeArguments<
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
