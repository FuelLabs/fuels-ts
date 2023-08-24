import type { JsonAbi, JsonAbiArgument, JsonAbiType } from '../json-abi';

import type { GetTypeParameters, MapTypeParametersToTypeArguments } from './get-type-parameters';
import type { MapAbiArray } from './map-abi-array';
import type { MapAbiEnum } from './map-abi-enum';
import type { MapAbiStruct } from './map-abi-struct';
import type { MapAbiTuple } from './map-abi-tuple';
import type { AbiBuiltInType, MapAbiBuiltInType } from './map-builtin-type';
import type { ReplaceValues, TupleToUnion } from './type-utilities';

/**
 * Infers the type of a specific arg
 *
 * In order to infer a specific type, you need the list of all types (`Types`) and an argument (`Arg`) which specifies which type you're inferring.
 *
 * If the underlying type of the argument is generic, then the argument's `typeArguments` array must be populated
 * with the exact number of arguments that would replace the underlying generic type parameters
 *
 * e.g. converting `MyStruct<T, U>` into `MyStruct<u8, bool>` :
 *
 * `MyStruct` is the initial argument, and it has two `typeArguments` of type `u8` and `bool` which replace the type parameters `T` and `U`
 * that are on the actual *type* `MyStruct` located in the `types` array of the abi object.
 * @param Types - ABI types from which type information will be taken
 * @param Arg - Argument who's full type we're inferring
 * @returns the fully inferred type of `Arg`
 */

export type InferAbiType<
  Types extends JsonAbi['types'],
  Arg extends JsonAbiArgument,
  // @ts-expect-error this is because of some null incompatibility I couldn't get to the root of; everything works nonetheless
  Components extends JsonAbiType['components'] = ResolveGenericComponents<Types, Arg>,
  ArgType extends string = Types[Arg['type']]['type'],
  C extends JsonAbiArgument = TupleToUnion<Components>
> = ArgType extends AbiBuiltInType
  ? MapAbiBuiltInType<ArgType>
  : ArgType extends 'struct Vec'
  ? InferAbiType<Types, NonNullable<Components>[0]>[]
  : ArgType extends 'struct RawVec'
  ? InferAbiType<Types, NonNullable<Arg['typeArguments']>[0]>
  : ArgType extends 'enum Option'
  ? /*
      C extends { readonly name 'Some' } ? C : never is to filter out the 'None' case of an optional type; the undefined in the union represents 'None' in this case.
     */
    InferAbiType<Types, C extends { readonly name: 'Some' } ? C : never> | undefined
  : ArgType extends `enum ${string}` // e.g. enum MyEnum
  ? MapAbiEnum<Types, Components>
  : ArgType extends `(_,${string}_)` // e.g. (_, _,...elements..., _)
  ? MapAbiTuple<Types, Components>
  : ArgType extends `struct ${string}` // e.g. struct MyStruct
  ? MapAbiStruct<Types, NonNullable<Components>>
  : ArgType extends `[_; ${infer Length extends number}]` // e.g.[_; 3]
  ? MapAbiArray<Length, Types, NonNullable<Components>>
  :
      | ArgType
      | 'If you see this, please file an issue on GitHub to the fuels-ts team and attach your ABI';

/**
 * Replaces generic components' generic types with specific types provided via `Arg['typeArguments']`
 *
 * @param Types - ABI types
 * @param Arg - Argument who's underlying type's components are being resolved
 * @returns components with all generic types replaced with specific ones
 */
type ResolveGenericComponents<
  Types extends JsonAbi['types'],
  Arg extends JsonAbiArgument,
  T extends JsonAbiType = Types[Arg['type']],
  Components extends readonly JsonAbiArgument[] = NonNullable<T['components']>,
  TypeParameters extends readonly number[] | null = GetTypeParameters<Types, T>,
  TypeParameterArgsMap extends Record<number, JsonAbiArgument> = MapTypeParametersToTypeArguments<
    TypeParameters,
    Arg['typeArguments']
  >
> =
  /*
    Does the type even have components?
    If not, then return null, because a type cannot possibly be generic if it doesn't have components.
   */
  Components extends never
    ? null
    : /*
      Okay, the type has components, but is the type actually generic?
      We are using TypeParameters as an indicator of genericness. For more info, check out the helper GetTypeParameters.
     
      If TypeParameters are null, then return the components, as there's nothing generic to resolve in them.
     */
    TypeParameters extends null
    ? Components
    : {
        /*
          Okay, so the argument's underlying type has components and in them exists a generic (or more of them).
          Now we must iterate over every component of that type and check if the component is generic or if its typeArguments are generic,
          so that we replace that generic with a specific values passed via Arg['typeArguments'].
          First we are checking if the component itself is generic.
          If it is generic, then replace that component with the corresponding specific type from the TypeParameterArgsMap.
         */
        [K in keyof Components]: Components[K]['type'] extends keyof TypeParameterArgsMap
          ? ReplaceValues<Components[K], Omit<TypeParameterArgsMap[Components[K]['type']], 'name'>>
          : /*
            Okay, the component itself is not generic, but does it have typeArguments? They might be generic!
            if it has typeArguments, then go through each one of them and replace it with a specific type if it is a generic.
            This will also go through the typeArguments of those typeArguments, because it might be a deeply nested generic.
           */ Components[K]['typeArguments'] extends readonly JsonAbiArgument[]
          ? ReplaceValues<
              Components[K],
              {
                readonly typeArguments: MapTypeArguments<
                  NonNullable<Components[K]['typeArguments']>,
                  TypeParameterArgsMap
                >;
              }
            >
          : /*
            Okay, so the component itself is not generic nor does it have explicitly generic typeArguments.
            However, there is a quirk in the abi format where a type can be implicitly generic. For more info on that, check out the helper GetTypeParameters.
           
            The TypeParameters type has accounted for implicit generics via GetTypeParameters, but it has done that on the level of the parent type of ALL components that we're iterating over (the type T).
            Now we need to check if the specific component we're analyzing here falls into that category of implicit generics.
            We're using the same GetTypeParameters helper, but on the level of the component's type.
            If it is indeed implicitly generic, it means that this component's `typeArguments` are null.
            If we let it be as it is, the underlying type's implicit generic would not be resolvable, as no type argument would be passed to it, because `typeArguments` is null.
            This code specifies the necessary `typeArguments` so that the generic can be resolved.
            These added `typeArguments` will then replace all the implicitly generic components of the underlying type in the subsequent iteration.
           */
          GetTypeParameters<Types, Types[Components[K]['type']]> extends readonly number[]
          ? ReplaceValues<
              Components[K],
              {
                readonly typeArguments: MapImplicitTypeArguments<
                  GetTypeParameters<Types, Types[Components[K]['type']]>,
                  TypeParameterArgsMap
                >;
              }
            >
          : /*
              The component is neither explicitly nor implicitly generic, so don't do anything to it and use it as it is.
             */
            Components[K];
      };

/**
 * This helper replaces all `typeArguments` that are generic with their specified types.
 */
type MapTypeArguments<
  Args extends readonly JsonAbiArgument[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [K in keyof Args]: Args[K]['type'] extends keyof TypeParameterArgsMap
    ? /*
        Pick the original name of the typeArgument but replace everything else with the specific type that's replacing the generic.
        We are leaving the original name because it is always constant and known; the thing that we are replacing is its generic type.
       */
      Pick<Args[K], 'name'> & Omit<TypeParameterArgsMap[Args[K]['type']], 'name'>
    : /*
      Okay, so the argument itself may not be generic, but maybe its typeArguments are.
      If the argument has `typeArguments`, recursively go through them to replace any possible nested generics.
     */
    Args[K]['typeArguments'] extends readonly JsonAbiArgument[]
    ? ReplaceValues<
        Args[K],
        {
          readonly typeArguments: MapTypeArguments<Args[K]['typeArguments'], TypeParameterArgsMap>;
        }
      >
    : /*
        The argument isn't generic and it doesn't have any `typeArguments`, so use it as it is and don't do anything to it.
       */
      Args[K];
};

/**
 * This is a helper which converts the TypeParameters array into a `typeArguments` array.
 * It iterates over each element of the array and maps it to its corresponding `JsonAbiArgument` from the `TypeParametersArgsMap` that was already previously resolved.
 * Its results are used to provide `typeArguments` to a component who's underlying type is implicitly generic.
 */
type MapImplicitTypeArguments<
  TypeParameters extends readonly number[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [I in keyof TypeParameters]: TypeParameterArgsMap[TypeParameters[I]];
};
