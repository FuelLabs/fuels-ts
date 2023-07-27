import type { JsonAbi, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';
import type { TupleToUnion } from './type-utilities';

export type MapAbiStruct<
  Types extends JsonAbi['types'],
  Components extends readonly JsonAbiArgument[],
  C extends JsonAbiArgument = TupleToUnion<Components>
> = {
  // Do not abstract away into a MapAbiStruct<...> type
  // Because it makes the inferred type look ugly on mouse hover over argument
  [Name in C['name']]: C extends { readonly name: Name } ? InferAbiType<Types, C> : never;
};
