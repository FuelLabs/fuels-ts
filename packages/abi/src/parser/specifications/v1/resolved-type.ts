import type { AbiType } from '../../abi';

export interface ResolvedComponent {
  name: string;
  type: ResolvedType;
}

export class ResolvedType {
  constructor(
    public type: string,
    public typeId: string | number,
    public components: ResolvedComponent[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined,
    private metadataTypeId: number | undefined
  ) {}

  public toAbiType(): AbiType {
    return {
      swayType: this.type,
      concreteTypeId: this.typeId as string,
      components: this.components?.map((c) => ({ name: c.name, type: c.type.toAbiType() })),
      metadata: this.metadataTypeId
        ? {
            metadataTypeId: this.metadataTypeId,
            typeArguments: this.typeParamsArgsMap?.map((tpa) => tpa[1].toAbiType()),
          }
        : undefined,
    };
  }
}
