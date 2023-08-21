import type { JsonAbi, JsonAbiArgument, JsonAbiType } from '../json-abi';

import type { Filter, Flatten } from './type-utilities';

/**
 * This helper gets all the type parameters of an abi type, be they explicit or implicit.
 *
 * An abi type has *explicit* type parameters when its `typeParameters` property is an array of numbers (e.g. `typeParameters: [1, 17]`).
 *
 * These numbers are actually abi `typeId`s that are assigned to generic abi types (e.g. `generic T` has `typeId: 1` and `generic U` has `typeId: 17`).
 *
 * However, there is a quirk in the abi format where a type can be generic even though its `typeParameters` property is null. I've named this quirk "implicit generics".
 * In this case, the abi type has no `typeParameters`, but one of its components (or components' `typeArguments`) points to a type which is *generic*.
 * This lack of `typeParameters` also affects the users of the type. Wherever this implicitly generic type is used as a component, its `typeArguments` array is null.
 *
 * Examples of this include generic arrays (`SomeStruct<T> { arr: [T; 3] }`) and generic tuples (`SomeStruct<U> { {tpl: (U, u8)} }`).
 * In these cases, the components `arr` and `tpl` point to types that have `typeParameters: null`, but one of those types' components points to a *generic type*.
 */
export type GetTypeParameters<
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
> =
  /**
   * Filter only numbers, as there may be nulls for the args that have been ignored.
   * Flatten the Result because it may bean array of arrays of arrays due to possible recursion on typeArguments
   * All of this narrows the Result's readonly unknown[] type to readonly number[]
   */
  Filter<Flatten<Result>, number>;
