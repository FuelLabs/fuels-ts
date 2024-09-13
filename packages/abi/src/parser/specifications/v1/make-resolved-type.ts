import type { ResolvableType } from './resolvable-type';
import { ResolvedType } from './resolved-type';
import type { AbiConcreteTypeV1, AbiSpecificationV1 } from './specification';

export function makeResolvedType(
  abi: AbiSpecificationV1,
  resolvableTypes: ResolvableType[],
  concreteTypeId: string
) {
  const concreteType = abi.concreteTypes.find(
    (ct) => ct.concreteTypeId === concreteTypeId
  ) as AbiConcreteTypeV1;

  const resolvableType = resolvableTypes.find(
    (rmt) => rmt.metadataTypeId === concreteType.metadataTypeId
  );

  return resolvableType
    ? resolvableType.resolve(abi, concreteType)
    : new ResolvedType(concreteType.type, concreteType.concreteTypeId, undefined, undefined);
}
