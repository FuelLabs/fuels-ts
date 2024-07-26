import type { ResolvableType } from './ResolvableType';
import { ResolvedType } from './ResolvedType';
import type { ConcreteType, JsonAbi } from './types/JsonAbi';

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
