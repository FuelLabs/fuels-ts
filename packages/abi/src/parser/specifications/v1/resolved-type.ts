import type { AbiType, AbiTypeComponent } from '../../abi';

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

  public toAbiTypeComponentType(): AbiTypeComponent['type'] {
    let res: AbiTypeComponent['type'];

    if (typeof this.typeId === 'string') {
      res = {
        swayType: this.swayType,
        concreteTypeId: this.typeId,
      };
    } else {
      res = {
        swayType: this.swayType,
        metadata: {
          metadataTypeId: this.typeId,
        },
      };
    }

    if (this.metadataType) {
      res.metadata = {
        metadataTypeId: this.metadataType.metadataTypeId,
      };
      if (this.typeParamsArgsMap && this.metadataType?.typeParameters?.length) {
        res.metadata.typeArguments = this.typeParamsArgsMap.map((t) => t[1].toAbiType() as AbiType);
      }
    }

    if (this.components) {
      res.components = this.components.map((c) => ({
        name: c.name,
        type: c.type.toAbiTypeComponentType(),
      }));
    }

    return res;
  }

  public toAbiType(): AbiType {
    const res: AbiType = {
      concreteTypeId: this.typeId as string,
      swayType: this.swayType,
    };

    if (this.metadataType) {
      res.metadata = {
        metadataTypeId: this.metadataType.metadataTypeId,
      };
      if (this.typeParamsArgsMap) {
        res.metadata.typeArguments = this.typeParamsArgsMap.map((t) => t[1].toAbiType() as AbiType);
      }
    }

    if (this.components) {
      res.components = this.components.map((c) => ({
        name: c.name,
        type: c.type.toAbiTypeComponentType(),
      }));
    }

    return res;
  }
}
