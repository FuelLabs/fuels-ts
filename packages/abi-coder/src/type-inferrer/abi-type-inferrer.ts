import type { JsonAbi, JsonAbiArgument, JsonAbiType } from '../json-abi';

import type { MapAbiArray } from './map-abi-array';
import type { MapAbiEnum } from './map-abi-enum';
import type { MapAbiStruct } from './map-abi-struct';
import type { MapAbiTuple } from './map-abi-tuple';
import type { AbiBuiltInType, MapAbiBuiltInType } from './map-builtin-type';
import type { Filter, Flatten, IndexOf, ReplaceValues, TupleToUnion } from './type-utilities';

/**
 * Infers the type of a specific arg
 *
 * In order to infer a specific type, you need the list of all types (`Types`) and an argument (`Arg`) which specifies which type you're inferring
 * If the underlying type of the argument is generic, then the argument's typeArguments array must be populated
 * with the exact number of arguments that would replace the underlying generic type parameters
 *
 * e.g. converting `MyStruct<T, U>` into `MyStruct<u8, bool>`
 *
 * `MyStruct` is the initial argument, and it has two `typeArguments` of type `u8` and `bool` which replace the type parameters `T` and `U`
 * that are on the actual TYPE `MyStruct` in the `Types` array
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
> = ArgType extends AbiBuiltInType // e.g. u8, bool
  ? MapAbiBuiltInType<ArgType>
  : ArgType extends 'struct Vec'
  ? InferAbiType<Types, NonNullable<Components>[0]>[]
  : ArgType extends 'struct RawVec'
  ? InferAbiType<Types, NonNullable<Arg['typeArguments']>[0]>
  : ArgType extends 'enum Option'
  ? InferAbiType<Types, C extends { readonly name: 'Some' } ? C : never> | undefined //
  : ArgType extends `enum ${string}` // e.g. enum MyEnum
  ? MapAbiEnum<Types, Components>
  : ArgType extends `(_,${string}_)` // e.g. (_, _, _, _)
  ? MapAbiTuple<Types, Components>
  : ArgType extends `struct ${string}` // e.g. struct MyStruct
  ? MapAbiStruct<Types, NonNullable<Components>>
  : ArgType extends `[_; ${infer Length extends number}]` // e.g. [_; 3]
  ? MapAbiArray<Length, Types, NonNullable<Components>>
  : ArgType | 'If you see this, please report it to the fuels-ts team and attach your ABI';

/**
 * Replaces generic components' generic types into specific types provided via `typeArguments` of `Arg`
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
  TypeParameterArgsMap extends Record<number, JsonAbiArgument> = {
    [GenericId in TupleToUnion<TypeParameters>]: NonNullable<Arg['typeArguments']>[IndexOf<
      TypeParameters,
      GenericId
    >];
  }
> = T['components'] extends null // Does the type even have components?
  ? null // No, so return null
  : TypeParameters extends null // Is the type generic?
  ? Components // No, so return back the components as there's nothing generic to resolve in them
  : {
      // Okay, so the argument's underlying type has components and in them is a generic one (or more)
      // Now we are iterating over every component and checking if it is generic or if its typeArguments are generic
      [K in keyof Components]: Components[K]['type'] extends keyof TypeParameterArgsMap // Is the component's underlying type generic?
        ? ReplaceValues<Components[K], Omit<TypeParameterArgsMap[Components[K]['type']], 'name'>> // If yes, replace the component with the specific type that replaces that generic type
        : Components[K]['typeArguments'] extends readonly JsonAbiArgument[] // Okay, the component itself is not generic, but does it have typeArguments? They might be generic...
        ? // Yes it does have typeArguments, so check if they are generic as well and replace those possible generics with their corresponding specific types
          ReplaceValues<
            Components[K],
            {
              readonly typeArguments: MapTypeArguments<
                NonNullable<Components[K]['typeArguments']>,
                TypeParameterArgsMap
              >;
            }
          >
        : /*
         * Okay, so the component isn't generic and it doesn't have type parameters.
         * But there is a quirk in the abi where a type can have a generic component even though its typeParameters property is null.
         * Which means that using typeParameters == null isn't a guarantee that we're not dealing with a generic.
         * Such is the case in the array_with_generic_struct and struct_with_implicitGenerics functions of the exhaustive-examples sway project
         *
         * So, we need to check if it's implicitly generic, and if it is, then we'll add in the typeArgument
         * which will be used in the next iteration to replace the actual generic parameter
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

/**
 * [1] - Result is readonly unknown[] because it may be an array of arrays ...etc depending on recursion, and it may contain number | null, so a rather complex type
 *
 *
 *
 */
type MapImplicitTypeParameters<
  Types extends readonly JsonAbiType[],
  Args extends readonly JsonAbiArgument[],
  // [1]
  Result extends readonly unknown[] = {
    [I in keyof Args]: Types[Args[I]['type']]['type'] extends `generic ${string}`
      ? Args[I]['type'] // if the arg is generic, return its type
      : Args[I]['typeArguments'] extends readonly JsonAbiArgument[]
      ? MapImplicitTypeParameters<Types, Args[I]['typeArguments']> // The arg isn't generic, but maybe its typeArguments are (recursion)
      : null; // Ignore if it's not generic and doesn't have typeArguments
  }
> = // Filter only numbers, as there may be nulls for the args that have been ignored.
  // Flatten the Result because it may bean array of arrays of arrays due to possible recursion on typeArguments
  // All of this narrows the Result's readonly unknown[] type to readonly number[]
  Filter<Flatten<Result>, number>;

type MapTypeArguments<
  Args extends readonly JsonAbiArgument[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [K in keyof Args]: Args[K]['type'] extends keyof TypeParameterArgsMap
    ? Pick<Args[K], 'name'> & Omit<TypeParameterArgsMap[Args[K]['type']], 'name'> // Pick the original name but replace everything else with the specific type that's replacing the generic
    : Args[K]['typeArguments'] extends readonly JsonAbiArgument[] // Okay, so the Args[K] may not be generic, but maybe its typeArguments are. This is a recursion.
    ? ReplaceValues<
        Args[K],
        {
          readonly typeArguments: MapTypeArguments<Args[K]['typeArguments'], TypeParameterArgsMap>; // Recursively resolve all typeArguments that are generic
        }
      >
    : Args[K]; // If it's not generic and it doesn't have any typeArguments, then don't do anything to it
};

/*
This is a 
*/
type MapImplicitTypeArguments<
  TypeParameters extends readonly number[],
  TypeParameterArgsMap extends Record<number, JsonAbiArgument>
> = {
  [I in keyof TypeParameters]: TypeParameterArgsMap[TypeParameters[I]];
};
