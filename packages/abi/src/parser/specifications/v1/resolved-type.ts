import type { AbiConcreteType, AbiTypeComponent } from '../../abi';

import type { AbiMetadataTypeV1 } from './specification';

export interface ResolvedComponent {
  name: string;
  type: ResolvedType;
}

export class ResolvedType {
  public swayType: string;
  public typeId: string | number;
  public components: ResolvedComponent[] | undefined;
  public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined;
  private metadataType: AbiMetadataTypeV1 | undefined;

  constructor(params: {
    swayType: string;
    typeId: string | number;
    components?: ResolvedComponent[];
    typeParamsArgsMap?: Array<[number, ResolvedType]>;
    metadataType?: AbiMetadataTypeV1;
  }) {
    this.swayType = params.swayType;
    this.typeId = params.typeId;
    this.components = params.components;
    this.typeParamsArgsMap = params.typeParamsArgsMap;
    this.metadataType = params.metadataType;
  }

  public toComponentType(): AbiTypeComponent['type'] {
    let result: AbiTypeComponent['type'];

    if (typeof this.typeId === 'string') {
      result = {
        swayType: this.swayType,
        concreteTypeId: this.typeId,
      };
    } else {
      result = {
        swayType: this.swayType,
        metadata: {
          metadataTypeId: this.typeId,
        },
      };
    }

    if (this.metadataType) {
      result.metadata = {
        metadataTypeId: this.metadataType.metadataTypeId,
      };
      if (this.typeParamsArgsMap && this.metadataType?.typeParameters?.length) {
        result.metadata.typeArguments = this.typeParamsArgsMap.map(
          (t) => t[1].toAbiType() as AbiConcreteType
        );
      }
    }

    if (this.components) {
      result.components = this.components.map((c) => ({
        name: c.name,
        type: c.type.toComponentType(),
      }));
    }

    return result;
  }

  public toAbiType(): AbiConcreteType {
    const res: AbiConcreteType = {
      concreteTypeId: this.typeId as string,
      swayType: this.swayType,
    };

    if (this.metadataType) {
      res.metadata = {
        metadataTypeId: this.metadataType.metadataTypeId,
      };
      if (this.typeParamsArgsMap) {
        res.metadata.typeArguments = this.typeParamsArgsMap.map(
          (t) => t[1].toAbiType() as AbiConcreteType
        );
      }
    }

    if (this.components) {
      res.components = this.components.map((c) => ({
        name: c.name,
        type: c.type.toComponentType(),
      }));
    }

    return res;
  }
}
