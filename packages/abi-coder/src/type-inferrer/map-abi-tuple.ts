import type { JsonAbi, JsonAbiType, JsonAbiArgument } from '../json-abi';

import type { InferAbiType } from './abi-type-inferrer';

export type MapAbiTuple<
  Types extends JsonAbi['types'],
  Components extends JsonAbiType['components'],
  ComponentsArr extends readonly JsonAbiArgument[] = NonNullable<Components>
> = {
  -readonly [K in keyof ComponentsArr]: InferAbiType<Types, ComponentsArr[K]>;
};
