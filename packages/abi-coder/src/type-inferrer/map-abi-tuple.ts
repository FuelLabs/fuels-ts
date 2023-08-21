import type { JsonAbi, JsonAbiType, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';

/**
 * Tuples are collections of a fixed number of elements.
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
   * thereby creating a new array of inferred types in place of the original array's elements
   */
  -readonly [Idx in keyof ComponentsArr]: InferAbiType<Types, ComponentsArr[Idx]>;
};
