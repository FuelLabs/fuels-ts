import type { AbiType } from '../../abi';

export interface ResolvedComponent {
  name: string;
  type: ResolvedType;
}

export class ResolvedType {
  public type: string;
  public typeId: string | number;
  public components: ResolvedComponent[] | undefined;
  public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined;
  private metadataTypeId: number | undefined;

  constructor(params: {
    type: string;
    typeId: string | number;
    components?: ResolvedComponent[];
    typeParamsArgsMap?: Array<[number, ResolvedType]>;
    metadataTypeId?: number;
  }) {
    this.type = params.type;
    this.typeId = params.typeId;
    this.components = params.components;
    this.typeParamsArgsMap = params.typeParamsArgsMap;
    this.metadataTypeId = params.metadataTypeId;
  }

  public toAbiType(): AbiType {
    return {
      swayType: this.type,
      concreteTypeId: this.typeId as string,
      components: this.components?.map((c) => ({ name: c.name, type: c.type.toAbiType() })),
      metadata:
        this.metadataTypeId !== undefined
          ? {
              metadataTypeId: this.metadataTypeId,
              typeArguments: this.typeParamsArgsMap?.map((tpa) => tpa[1].toAbiType()),
            }
          : undefined,
    };
  }
}
