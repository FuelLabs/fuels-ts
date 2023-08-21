import type { JsonAbi, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { TupleToUnion } from './type-utilities';

/**
 * This maps structs by going over each component of the struct and inferring its type.
 *
 * Given that struct components have names and we're mapping a struct into an object,
 * we're mapping the whole struct into a record of type \{ component_name:inferred_type_of_component \}.
 */
export type MapAbiStruct<
  Types extends JsonAbi['types'],
  Components extends readonly JsonAbiArgument[],
  C extends JsonAbiArgument = TupleToUnion<Components>
> = {
  /**
   * C extends \{ readonly name: Name \} is necessary to remove all types from the C union
   * except the one that corresponds to the specific Name who's type we're inferring.
   * If it wasn't implemented like this, every field's value would be a union of ALL the inferred component types.
   * This way we're type constraining to ONLY the component that has the specific Name that's being iterated over in [Name in C['name']]
   */
  [Name in C['name']]: C extends { readonly name: Name } ? InferAbiType<Types, C> : never;
};
