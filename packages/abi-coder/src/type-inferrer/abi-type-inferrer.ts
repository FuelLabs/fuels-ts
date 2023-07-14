import type { JsonAbi, JsonAbiArgument, JsonAbiFunction, JsonAbiType } from '../json-abi';

import type { IndexOf, ReplaceValues, TupleToUnion } from './type-utilities';

export type InferAbiFunctions<
  TAbi extends JsonAbi,
  Fns extends JsonAbi['functions'] = TAbi['functions'],
  Types extends JsonAbi['types'] = TAbi['types'],
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
  // The @ts-ignore below is because of some null incompatibility
  // I couldn't get down to the root of it, but everything works nonetheless
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Components extends JsonAbiType['components'] = MapComponents<Types, Arg>,
  T extends JsonAbiType = Types[Arg['type']],
  TType extends string = T['type'],
  C extends JsonAbiArgument = NonNullable<Components>[number]
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  TypeParameters extends readonly number[] | null = MapImplicitTypeParameters<Types, T>,
  Components extends NonNullable<JsonAbiType['components']> = NonNullable<T['components']>,
  TypeParameterArgsMap extends Record<number, JsonAbiArgument> = {
    [GenericId in TupleToUnion<TypeParameters>]: NonNullable<Arg['typeArguments']>[IndexOf<
      T['typeParameters'],
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
        ? Types[Components[K]['type']]['components']
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

export type MapImplicitTypeParameters<
  Types extends JsonAbi['types'],
  T extends JsonAbiType,
  C extends readonly JsonAbiArgument[],
  ImplicitTypeParameters extends number[] = []
> = T['typeParameters'] extends readonly number[]
  ? T['typeParameters']
  : T['components'] extends null
  ? null
  : C['length'] extends 0
  ? ImplicitTypeParameters
  : Types[C[0]['type']]['type'] extends `generic ${string}`
  ? MapImplicitTypeParameters<
      Types,
      T,
      C['length'] extends 1 ? [] : C extends [C[0], ...infer Rest] ? [...Rest] : [],
      [...ImplicitTypeParameters, C[0]['type']]
    >
  : MapImplicitTypeParameters<
      Types,
      T,
      C['length'] extends 1 ? [] : C extends [C[0], ...infer Rest] ? [...Rest] : [],
      ImplicitTypeParameters
    >;

type MapTypeArguments<
  Args extends readonly JsonAbiArgument[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [K in keyof Args]: ReplaceValues<
    Args[K],
    Args[K]['type'] extends keyof TypeParameterArgsMap
      ? Pick<TypeParameterArgsMap[Args[K]['type']], 'type' | 'typeArguments'>
      : {
          readonly typeArguments: Args[K]['typeArguments'] extends null
            ? Args[K]
            : MapTypeArguments<NonNullable<Args[K]['typeArguments']>, TypeParameterArgsMap>;
        }
  >;
};

type AbiBuiltInType = '()' | 'u8' | 'u16' | 'u32' | 'u64' | 'b256' | 'bool' | `str[${number}]`;

type MapAbiBuiltInType<T extends AbiBuiltInType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
  ? number
  : T extends `str[${string}]`
  ? // ? StringOfLength<Input extends string ? Input : never, R>
    string
  : T extends 'b256'
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
