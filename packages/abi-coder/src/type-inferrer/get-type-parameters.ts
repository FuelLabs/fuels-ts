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
 * In this case, the abi type has no `typeParameters`, but one of its components (or components' `typeArguments`) points to a type which *is* generic.
 * This lack of `typeParameters` also affects the users of the type. Wherever this implicitly generic type is used as a component, that component's `typeArguments` array is null.
 *
 * Examples of this include generic arrays (`SomeStruct<T> { arr: [T; 3] }`) and generic tuples (`SomeStruct<U> { {tpl: (U, u8)} }`).
 * In these cases, the components `arr` and `tpl` point to types that have `typeParameters: null`, but one of those types' components points to a *generic type*.
 */
export type GetTypeParameters<
  Types extends JsonAbi['types'],
  T extends JsonAbiType,
  Result extends readonly number[] | null = T['typeParameters'] extends readonly number[]
    ? /**
       * If it has typeParameters, then it's explicitly generic and it just returns them.
       */
      T['typeParameters']
    : T['components'] extends readonly JsonAbiArgument[]
    ? /**
       * If it has components, we need to check if it's implicitly generic per the description above.
       * This helper will return an array of 0+ length, which is why there is a Result['length'] check below.
       * If the length is 0, it means that there aren't any implicit generics.
       */
      MapImplicitTypeParameters<Types, T['components']>
    : /**
       * If it doesn't have components, then it can't possibly be generic.
       */
      null
> = Result extends readonly number[] ? (Result['length'] extends 0 ? null : Result) : null;

type MapImplicitTypeParameters<
  Types extends readonly JsonAbiType[],
  Args extends readonly JsonAbiArgument[],
  Result extends readonly unknown[] = {
    [I in keyof Args]: Types[Args[I]['type']]['type'] extends `generic ${string}`
      ? /**
         * if the arg itself is generic, return its type
         */
        Args[I]['type']
      : Args[I]['typeArguments'] extends readonly JsonAbiArgument[]
      ? /**
         * The arg isn't generic, but maybe it has typeArguments that are.
         * This call is recursive.
         */
        MapImplicitTypeParameters<Types, Args[I]['typeArguments']>
      : /**
         * The arg isn't generic nor does it have typeArguments.
         * This is represented via null, which later on gets filtered out.
         */
        null;
  }
> =
  /**
   * Filter only numbers, as there may be nulls for the args that aren't generic.
   * Flatten the Result because it may be an array of arrays of arrays due to possible recursion on typeArguments,
   * as the generic type argument might be deeply nested in the typeArguments arrays.
   * All of this in the end narrows the Result's initial readonly unknown[] type to readonly number[].
   */
  Filter<Flatten<Result>, number>;
