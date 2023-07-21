import type { JsonAbi, JsonAbiArgument, JsonAbiFunction, JsonAbiType } from '../json-abi';

import type { Filter, Flatten, IndexOf, ReplaceValues, TupleToUnion } from './type-utilities';

export type InferAbiFunctions<
  TAbi extends JsonAbi,
  Fns extends JsonAbi['functions'] = TAbi['functions'],
  Types extends readonly JsonAbiType[] = TAbi['types'],
  Fn extends JsonAbiFunction = TupleToUnion<Fns>
> = {
  readonly [Name in Fn['name']]: Fn extends { readonly name: Name }
    ? InferAbiFunction<Fn, Types>
    : never;
};

type InferAbiFunction<
  Fn extends JsonAbiFunction,
  Types extends JsonAbi['types'],
  FnInputs extends JsonAbiArgument = TupleToUnion<Fn['inputs']>,
  TInput = Fn['inputs']['length'] extends 0
    ? never
    : {
        [InputName in FnInputs['name']]: FnInputs extends { readonly name: InputName }
          ? InferAbiType<Types, FnInputs>
          : never;
      },
  TOutput = Types[Fn['output']['type']]['type'] extends '()'
    ? void
    : InferAbiType<Types, Fn['output']>
> = {
  input: TInput;
  output: TOutput;
};

type InferAbiType<
  Types extends JsonAbi['types'],
  Arg extends JsonAbiArgument,
  // @ts-expect-error this is because of some null incompatibility I couldn't get to the root of; everything works nonetheless
  Components extends JsonAbiType['components'] = MapComponents<Types, Arg>,
  T extends JsonAbiType = Types[Arg['type']],
  TType extends string = T['type'],
  C extends JsonAbiArgument = TupleToUnion<Components>
> = TType extends AbiBuiltInType
  ? MapAbiBuiltInType<TType>
  : TType extends 'struct Vec'
  ? InferAbiType<Types, NonNullable<Components>[0]>[]
  : TType extends 'struct RawVec'
  ? InferAbiType<Types, NonNullable<Arg['typeArguments']>[0]>
  : TType extends 'enum Option'
  ? InferAbiType<Types, C extends { readonly name: 'Some' } ? C : never> | undefined
  : TType extends `enum ${string}`
  ? MapAbiEnum<Types, Components>
  : TType extends `(_,${string}_)`
  ? MapAbiTuple<Types, Components>
  : TType extends `struct ${string}`
  ? {
      // Do not abstract away into a MapAbiStruct<...> type
      // Because it makes the inferred type look ugly on mouse hover over argument
      [Name in C['name']]: C extends { readonly name: Name } ? InferAbiType<Types, C> : never;
    }
  : TType extends `[_; ${infer Length extends number}]`
  ? MapAbiArray<Types, Length, Components>
  : T | 'If you see this, please report it to the fuels-ts team and attach your ABI';

type MapComponents<
  Types extends JsonAbi['types'],
  Arg extends JsonAbiArgument,
  T extends JsonAbiType = Types[Arg['type']],
  Components extends NonNullable<JsonAbiType['components']> = NonNullable<T['components']>,
  TypeParameters extends readonly number[] | null = GetTypeParameters<Types, T>,
  TypeParameterArgsMap extends Record<number, JsonAbiArgument> = {
    [GenericId in TupleToUnion<TypeParameters>]: NonNullable<Arg['typeArguments']>[IndexOf<
      TypeParameters,
      GenericId
    >];
  }
> = T['components'] extends null
  ? null
  : TypeParameters extends null
  ? Components
  : {
      [K in keyof Components]: Components[K]['type'] extends keyof TypeParameterArgsMap
        ? ReplaceValues<Components[K], Omit<TypeParameterArgsMap[Components[K]['type']], 'name'>>
        : Components[K]['typeArguments'] extends readonly JsonAbiArgument[]
        ? ReplaceValues<
            Components[K],
            {
              readonly typeArguments: MapTypeArguments<
                NonNullable<Components[K]['typeArguments']>,
                TypeParameterArgsMap
              >;
            }
          >
        : GetTypeParameters<Types, Types[Components[K]['type']]> extends readonly number[]
        ? ReplaceValues<
            Components[K],
            {
              readonly typeArguments: MapImplicitTypeArguments<
                GetTypeParameters<Types, Types[Components[K]['type']]>,
                TypeParameterArgsMap
              >;
            }
          >
        : Components[K];
    };

type GetTypeParameters<
  Types extends JsonAbi['types'],
  T extends JsonAbiType,
  Result extends readonly number[] | null = T['typeParameters'] extends readonly number[]
    ? T['typeParameters']
    : T['components'] extends readonly JsonAbiArgument[]
    ? MapImplicitTypeParameters<Types, T['components']>
    : null
> = Result extends readonly number[] ? (Result['length'] extends 0 ? null : Result) : null;

type MapImplicitTypeParameters<
  Types extends readonly JsonAbiType[],
  Components extends readonly JsonAbiArgument[],
  Result extends readonly unknown[] = {
    [I in keyof Components]: Types[Components[I]['type']]['type'] extends `generic ${string}`
      ? Components[I]['type']
      : Components[I]['typeArguments'] extends readonly JsonAbiArgument[]
      ? MapImplicitTypeParameters<Types, Components[I]['typeArguments']>
      : null;
  }
> = Filter<Flatten<Result>, number>;

type MapTypeArguments<
  Args extends readonly JsonAbiArgument[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [K in keyof Args]: Args[K]['type'] extends keyof TypeParameterArgsMap
    ? Pick<Args[K], 'name'> & Omit<TypeParameterArgsMap[Args[K]['type']], 'name'>
    : Args[K]['typeArguments'] extends readonly JsonAbiArgument[]
    ? ReplaceValues<
        Args[K],
        {
          readonly typeArguments: MapTypeArguments<Args[K]['typeArguments'], TypeParameterArgsMap>;
        }
      >
    : Args[K];
};

type MapImplicitTypeArguments<
  TypeParameters extends readonly number[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [I in keyof TypeParameters]: TypeParameterArgsMap[TypeParameters[I]];
};

type AbiBuiltInType =
  | '()'
  | 'u8'
  | 'u16'
  | 'u32'
  | 'u64'
  | 'b256'
  | 'bool'
  | `str[${number}]`
  | 'struct B512';

type MapAbiBuiltInType<T extends AbiBuiltInType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
  ? number
  : T extends `str[${string}]`
  ? // ? StringOfLength<Input extends string ? Input : never, R>
    string
  : T extends 'b256'
  ? string
  : T extends 'struct B512'
  ? string
  : T extends 'bool'
  ? boolean
  : T extends '()'
  ? undefined
  : never;

type MapAbiArray<
  Types extends JsonAbi['types'],
  Length extends number,
  Components extends JsonAbiType['components'],
  ElementArg extends JsonAbiArgument = NonNullable<Components>[0]
> = CreateTsTuple<Length, InferAbiType<Types, ElementArg>>;

type CreateTsTuple<L extends number, T, R extends T[] = []> = R['length'] extends L
  ? R
  : CreateTsTuple<L, T, [...R, T]>;

type MapAbiTuple<
  Types extends JsonAbi['types'],
  Components extends JsonAbiType['components'],
  ComponentsArr extends readonly JsonAbiArgument[] = NonNullable<Components>
> = {
  -readonly [K in keyof ComponentsArr]: InferAbiType<Types, ComponentsArr[K]>;
};

type MapAbiEnum<
  Types extends JsonAbi['types'],
  Components extends JsonAbiType['components'],
  Component extends JsonAbiArgument = TupleToUnion<NonNullable<Components>>
> = Types[Component['type']]['type'] extends '()'
  ? Component['name']
  : // : Types[Component['type']]['type'] extends AbiBuiltInType
    // ? InferAbiType<Types, Component>
    Enum<{
      [Name in Component['name']]: Component extends { readonly name: Name }
        ? Types[Component['type']]['type'] extends AbiBuiltInType
          ? []
          : InferAbiType<Types, Component>
        : never;
    }>;

export type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
