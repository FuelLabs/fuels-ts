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
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}

  public toAbiType(): AbiType {
    return {
      swayType: this.type,
      typeId: this.typeId as string,
      components: this.components?.map((c) => ({ name: c.name, type: c.type.toAbiType() })),
    };
  }
}
