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

import type { complexAbi } from './fuel-factory/abis/complexAbi';
import type { counterContractAbi } from './fuel-factory/abis/counterContractAbi';
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
  Types extends JsonFlatAbi['types'],
  Ts extends JsonFlatAbi['types'] = FlattenVectorDepth<Types>
> = {
  [Name in Fn['name']]: Fn extends { readonly name: Name } ? InvokeFunction<Fn, Ts> : never;
};

export type InvokeFunction<
  Fn extends JsonFlatAbiFragmentFunction,
  Types extends JsonFlatAbi['types'],
  TArgs extends Array<unknown> = Array<unknown>,
  TReturn = GetMappedAbiType<Types, Fn['output']>,
  FnInput extends JsonFlatAbiFragmentArgumentType = TupleToUnion<Fn['inputs']>
> = Fn['inputs']['length'] extends 0
  ? () => FunctionInvocationScope<never, TReturn>
  : (
      input: {
        // do not abstract into some FunctionInputs<...> because it makes the
        // displayed inferred on-hover type ugly
        [InputName in FnInput['name']]: FnInput extends { readonly name: InputName }
          ? GetMappedAbiType<Types, FnInput>
          : never;
      },
      ...args: TArgs
    ) => FunctionInvocationScope<TArgs, TReturn>;

export type FlattenVectorDepth<T extends JsonFlatAbi['types']> = {
  [K in keyof T]: T[K]['type'] extends 'struct Vec'
    ? ReplaceValues<
        T[K],
        {
          readonly components: NonNullable<T[K]['components']>[0]['typeArguments'];
        }
      >
    : T[K];
};

export type GetMappedAbiType<
  Types extends JsonFlatAbi['types'],
  Arg extends JsonFlatAbiFragmentArgumentType,
  Components extends JsonFlatAbiFragmentType['components'] = MapComponentTree<Types, Arg>,
  T extends JsonFlatAbiFragmentType = Types[Arg['type']],
  TType extends string = T['type'],
  C extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<Components>>
> = TType extends BuiltInType
  ? TType
  : TType extends 'struct Vec'
  ? GetMappedAbiType<Types, NonNullable<Components>[0]>[]
  : TType extends `enum ${string}`
  ? MapAbiEnum<Types, Components>
  : TType extends `(_,${string}_)`
  ? MapAbiTuple<Types, Components>
  : TType extends `struct ${string}`
  ? {
      // Do not abstract away into a MapAbiStruct<...> type
      // Because it makes the inferred type look ugly on mouse hover over argument
      [Name in C['name']]: C extends { readonly name: Name } ? GetMappedAbiType<Types, C> : never;
    }
  : TType extends `[_; ${infer Length extends number}]`
  ? MapAbiArray<Types, Length, Components>
  : T | 'My man, you should know this type!';

export type MapIntoArray<L extends number, T, R extends T[] = []> = R['length'] extends L
  ? R
  : MapIntoArray<L, T, [...R, T]>;

type MapComponentTree<
  Types extends JsonFlatAbi['types'],
  Arg extends JsonFlatAbiFragmentArgumentType,
  Args extends JsonFlatAbiFragmentArgumentType['typeArguments'] = Arg['typeArguments'],
  T extends JsonFlatAbiFragmentType = Types[Arg['type']],
  Components extends NonNullable<JsonFlatAbiFragmentType['components']> = NonNullable<
    T['components']
  >,
  TypeParametersArray extends readonly number[] = NonNullable<T['typeParameters']>,
  ArgsArray extends readonly JsonFlatAbiFragmentArgumentType[] = NonNullable<Args>,
  TypeParameterArgsMap extends Record<number, JsonFlatAbiFragmentArgumentType> = {
    [GenericId in TupleToUnion<TypeParametersArray>]: ArgsArray[IndexOf<
      TypeParametersArray,
      GenericId
    >];
  }
> = T['components'] extends null
  ? null
  : T['typeParameters'] extends null
  ? Components
  : {
      readonly [K in keyof Components]: Components[K]['type'] extends keyof TypeParameterArgsMap
        ? ReplaceValues<Components[K], Omit<TypeParameterArgsMap[Components[K]['type']], 'name'>>
        : Components[K]['typeArguments'] extends null
        ? Components[K]
        : ReplaceValues<
            Components[K],
            {
              readonly typeArguments: MapTypeArguments<
                NonNullable<Components[K]['typeArguments']>,
                TypeParameterArgsMap
              >;
            }
          >;
    };

type MapTypeArguments<
  TypeArguments extends readonly JsonFlatAbiFragmentArgumentType[],
  TypeParameterArgsMap extends Record<number, JsonFlatAbiFragmentArgumentType>
> = {
  [K in keyof TypeArguments]: ReplaceValues<
    TypeArguments[K],
    TypeArguments[K]['type'] extends keyof TypeParameterArgsMap
      ? {
          readonly type: TypeParameterArgsMap[TypeArguments[K]['type']]['type'];
          readonly typeArguments: TypeParameterArgsMap[TypeArguments[K]['type']]['typeArguments'];
        }
      : {
          readonly typeArguments: TypeArguments[K]['typeArguments'] extends null
            ? TypeArguments[K]
            : MapTypeArguments<
                NonNullable<TypeArguments[K]['typeArguments']>,
                TypeParameterArgsMap
              >;
        }
  >;
};
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

type HasGenericValueDeep<
  TypeParameters extends number,
  TypeArgumentsArr extends JsonFlatAbiFragmentArgumentType['typeArguments'],
  TypeArgument extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<TypeArgumentsArr>>
> = TypeArgumentsArr extends readonly JsonFlatAbiFragmentArgumentType[]
  ? TypeArgument['type'] extends TypeParameters
    ? true
    : HasGenericValueDeep<TypeParameters, TypeArgument['typeArguments']>
  : false;

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

type BuiltInType = '()' | 'u8' | 'u16' | 'u32' | 'u64' | 'b256' | 'bool' | `str[${number}]`;

type MapBuiltInType<T extends BuiltInType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
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

type MapAbiArray<
  Types extends JsonFlatAbi['types'],
  Length extends number,
  Components extends JsonFlatAbiFragmentType['components'],
  ElementArg extends JsonFlatAbiFragmentArgumentType = NonNullable<Components>[0]
> = MapIntoArray<Length, GetMappedAbiType<Types, ElementArg>>;

type MapAbiTuple<
  Types extends JsonFlatAbi['types'],
  Components extends JsonFlatAbiFragmentType['components'],
  ComponentsArr extends readonly JsonFlatAbiFragmentArgumentType[] = NonNullable<Components>
> = {
  -readonly [K in keyof ComponentsArr]: GetMappedAbiType<Types, ComponentsArr[K]>;
};

type MapAbiEnum<
  Types extends JsonFlatAbi['types'],
  Components extends JsonFlatAbiFragmentType['components'],
  Component extends JsonFlatAbiFragmentArgumentType = TupleToUnion<NonNullable<Components>>
> = Types[Component['type']]['type'] extends '()'
  ? Component['name']
  : GetMappedAbiType<Types, Component>;

type ComplexAbi = typeof complexAbi;

type CmpTree = GetMappedAbiType<
  ComplexAbi['types'],
  {
    name: 'z';
    type: 9;
    typeArguments: null;
  }
>;

type CounterContractAbi = typeof counterContractAbi;

type TestNestedStruct = GetMappedAbiType<
  CounterContractAbi['types'],
  {
    name: 'myStruct';
    type: 31;
    typeArguments: [
      {
        name: '';
        type: 38;
        typeArguments: null;
      }
    ];
  }
>;

type NETET = TestNestedStruct['theStruct'];
