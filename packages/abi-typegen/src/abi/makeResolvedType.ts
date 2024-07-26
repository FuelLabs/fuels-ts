import type { ConcreteType, JsonAbi } from '../types/interfaces/JsonAbi';

import type { ResolvableType } from './ResolvableType';
import { ResolvedType } from './ResolvedType';

/**
 * This file is a copy of the one in abi-coder and will be deleted once the packages merge.
 */
export function makeResolvedType(
  abi: JsonAbi,
  resolvableTypes: ResolvableType[],
  concreteTypeId: string
) {
  const concreteType = abi.concreteTypes.find(
    (ct) => ct.concreteTypeId === concreteTypeId
  ) as ConcreteType;

  const resolvableMetadataType = resolvableTypes.find(
    (rmt) => rmt.metadataTypeId === concreteType.metadataTypeId
  );

  return resolvableMetadataType
    ? resolvableMetadataType.resolve(abi, concreteType)
    : new ResolvedType(concreteType.type, concreteType.concreteTypeId, undefined, undefined);
}
