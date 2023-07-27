import type { JsonAbi, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';

export type MapAbiArray<
  Length extends number,
  Types extends JsonAbi['types'],
  Components extends readonly JsonAbiArgument[],
  ElementArg extends JsonAbiArgument = Components[0] // an array type has only one component which represents the type of the array
> = CreateTsTuple<Length, InferAbiType<Types, ElementArg>>;

// This creates a tuple of L elements e.g. CreateTsTuple<3, number> -> [number, number, number]
// Which corresponds to a sway array of e.g. [_; 3] with __array_element of type u8
type CreateTsTuple<L extends number, T, R extends T[] = []> = R['length'] extends L
  ? R
  : CreateTsTuple<L, T, [...R, T]>;
