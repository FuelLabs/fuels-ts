/* eslint-disable @typescript-eslint/no-use-before-define */
import type {
  AbiConcreteType,
  AbiMetadataType,
  AbiTypeArgument,
  AbiTypeComponent,
} from '../../abi';

import type { ResolvableComponent, ResolvableType } from './resolvable-type';
import type { ResolvedType } from './resolved-type';

function mapMetadata(type: ResolvableType | ResolvedType) {
  const result: AbiTypeComponent['type']['metadata'] = {
    metadataTypeId: type.metadataType?.metadataTypeId as number,
  };

  if (type.typeParamsArgsMap && type.metadataType?.typeParameters?.length) {
    result.typeArguments = [...type.typeParamsArgsMap.values()].map((rt) => toTypeArgument(rt));
  }

  return result;
}

function isResolvedType(type: ResolvableType | ResolvedType): type is ResolvedType {
  return 'typeId' in type;
}

function isResolvedConcreteType(
  type: ResolvableType | ResolvedType
): type is ResolvedType & { typeId: string } {
  return isResolvedType(type) && typeof type.typeId === 'string';
}

function mapComponentType(component: ResolvableComponent): AbiTypeComponent {
  const { name, type } = component;

  let result: AbiTypeComponent['type'];

  if (isResolvedConcreteType(type)) {
    result = {
      swayType: type.swayType,
      concreteTypeId: type.typeId,
    };
    if (type.metadataType) {
      result.metadata = mapMetadata(type) as AbiConcreteType['metadata'];
    }
  } else {
    result = {
      swayType: type.swayType,
      metadata: mapMetadata(type),
    };
  }

  if (type.components) {
    result.components = type.components.map(mapComponentType);
  }

  return { name, type: result };
}

function toTypeArgument(type: ResolvableType | ResolvedType): AbiTypeArgument {
  // type args and components follow the same mapping logic
  return mapComponentType({ name: '', type }).type;
}

export function toAbiType(t: ResolvableType | ResolvedType): AbiConcreteType | AbiMetadataType {
  let result: AbiConcreteType | AbiMetadataType;

  if (isResolvedConcreteType(t)) {
    result = {
      concreteTypeId: t.typeId,
      swayType: t.swayType,
    };

    if (t.metadataType) {
      result.metadata = mapMetadata(t) as AbiConcreteType['metadata'];
    }
  } else {
    result = {
      swayType: t.swayType,
      metadataTypeId: t.metadataType?.metadataTypeId as number,
    };

    if (t.typeParamsArgsMap && t.metadataType?.typeParameters?.length) {
      result.typeParameters = [...t.typeParamsArgsMap.values()].map(
        (rt) => toAbiType(rt) as AbiMetadataType
      );
    }
  }

  if (t.components) {
    result.components = t.components.map(mapComponentType);
  }

  return result;
}
