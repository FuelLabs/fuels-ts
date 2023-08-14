import type { JsonAbi, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';

/**
 * Abi arrays are of [_; N] format with only ONE component which is the type of the array element,
 * so we have to create a TS tuple which has N elements of the only component's inferred type.
 */
export type MapAbiArray<
  Length extends number,
  Types extends JsonAbi['types'],
  Components extends readonly JsonAbiArgument[],
  ElementArg extends JsonAbiArgument = Components[0] // an array type has only one component which represents the type of the array
> = CreateTsTuple<Length, InferAbiType<Types, ElementArg>>;

/**
 * This creates a TS tuple of L elements (L meaning length) e.g. CreateTsTuple\<3, number\> -\> [number, number, number],
 * which corresponds to a sway array of e.g. [_; 3] with __array_element of type u8
 */
type CreateTsTuple<L extends number, T, R extends T[] = []> = R['length'] extends L
  ? R
  : CreateTsTuple<L, T, [...R, T]>;
