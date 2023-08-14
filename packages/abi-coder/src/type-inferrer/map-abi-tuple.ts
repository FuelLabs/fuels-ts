import type { JsonAbi, JsonAbiType, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';

/**
 * Tuples are fixed collections.
 * We are iterating over each element of the tuple and inferring its type.
 */
export type MapAbiTuple<
  Types extends JsonAbi['types'],
  Components extends JsonAbiType['components'],
  ComponentsArr extends readonly JsonAbiArgument[] = NonNullable<Components>
> = {
  /**
   * -readonly is for removing the readonly prefix that is added on TS arrays when asserting the whole abi `as const`
   * We're iterating over the TS array loaded into the type system and replacing the element on each index with our inferred type
   */
  -readonly [Idx in keyof ComponentsArr]: InferAbiType<Types, ComponentsArr[Idx]>;
};
