import type { ConcreteType, JsonAbi } from '../types/interfaces/JsonAbi';

import type { ResolvableMetadataType } from './ResolvableMetadataType';
import { ResolvedType } from './ResolvedType';

/**
 * This file is a copy of the one in abi-coder and will be deleted once the packages merge.
 */
export function makeResolvedType(
  abi: JsonAbi,
  resolvableMetadataTypes: ResolvableMetadataType[],
  concreteTypeId: string
) {
  const concreteType = abi.concreteTypes.find(
    (ct) => ct.concreteTypeId === concreteTypeId
  ) as ConcreteType;

  const resolvableMetadataType = resolvableMetadataTypes.find(
    (rmt) => rmt.metadataTypeId === concreteType.metadataTypeId
  );

  return resolvableMetadataType
    ? resolvableMetadataType.resolve(abi, concreteType)
    : new ResolvedType(concreteType.type, undefined, undefined, undefined);
}
