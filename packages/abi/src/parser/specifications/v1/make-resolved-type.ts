import type { ConcreteType, JsonAbi_V1 } from './abi-specification-v1';
import type { ResolvableType } from './resolvable-type';
import { ResolvedType } from './resolved-type';

export function makeResolvedType(
  abi: JsonAbi_V1,
  resolvableTypes: ResolvableType[],
  concreteTypeId: string
) {
  const concreteType = abi.concreteTypes.find(
    (ct) => ct.concreteTypeId === concreteTypeId
  ) as ConcreteType;

  const resolvableType = resolvableTypes.find(
    (rmt) => rmt.metadataTypeId === concreteType.metadataTypeId
  );

  return resolvableType
    ? resolvableType.resolve(abi, concreteType)
    : new ResolvedType(concreteType.type, concreteType.concreteTypeId, undefined, undefined);
}
