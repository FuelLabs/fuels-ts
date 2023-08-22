import type { JsonAbi, JsonAbiType, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { AbiBuiltInType } from './map-builtin-type';
import type { TupleToUnion } from './type-utilities';

/**
 * Enums are inferred just as structs, except when they are simple enums (all variants are of type `()`),
 * in which case they're inferred as a discriminated union of all possible variants of that simple enum.
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
          ? []
          : InferAbiType<Types, Component>
        : never;
    }>;

export type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
