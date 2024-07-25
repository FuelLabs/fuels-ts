import type { ResolvableMetadataType } from './ResolvableMetadataType';
import { ResolvedType } from './ResolvedType';
import type { ConcreteType, JsonAbi } from './types/JsonAbi';

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
