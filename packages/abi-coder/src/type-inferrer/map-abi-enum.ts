import type { RequireExactlyOne } from 'type-fest';

import type { JsonAbi, JsonAbiType, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { AbiBuiltInType } from './map-builtin-type';
import type { TupleToUnion } from './type-utilities';

/**
 * Enums are inferred just as structs, except when they are simple enums (all variants are of type `()`),
 * in which case they're inferred as a discriminated union of all possible variants of that simple enum.
 *
 * If the enum is complex (meaning not all of its variants are `()`), then it gets inferred like a struct.
 *
 * TODO:
 *
 * In the future, enums should be inferred as just as what they are: a discriminated union of all possible values, and not a struct.
 * However, that is a future endeavor as it requires changes to runtime behavior as well.
 */
export type MapAbiEnum<
  Types extends JsonAbi['types'],
  Components extends JsonAbiType['components'],
  Component extends JsonAbiArgument = TupleToUnion<NonNullable<Components>>
> = Types[Component['type']]['type'] extends '()'
  ? Component['name']
  : Enum<{
      [Name in Component['name']]: Component extends { readonly name: Name }
        ? Types[Component['type']]['type'] extends AbiBuiltInType
          ? /**
             * [] is the type fuels-abigen generates when it encounters a built-in type on an enum.
             */
            []
          : /**
             * If it's not a built-in type, then infer it as whatever it is (array, struct, etc.)
             */
            InferAbiType<Types, Component>
        : never;
    }>;

/**
 * This is a helper that makes it mandatory to provide one, and only one property of an enum.
 * It's a wrapper around a library utility for naming's sake.
 */
export type Enum<T> = RequireExactlyOne<T>;
