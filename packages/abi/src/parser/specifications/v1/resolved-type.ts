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
  public metadataType: AbiMetadataTypeV1 | undefined;

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
}
