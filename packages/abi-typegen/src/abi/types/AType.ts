import type { ITypeAttributes } from '../../types/interfaces/IType';
import type { JsonAbiType } from '../../types/interfaces/JsonAbi';

export class AType {
  public rawAbiType: JsonAbiType;
  public attributes: ITypeAttributes;
  public requiredFuelsMembersImports: string[];

  constructor(params: { rawAbiType: JsonAbiType }) {
    this.rawAbiType = params.rawAbiType;
    this.attributes = {
      inputLabel: 'unknown',
      outputLabel: 'unknown',
    };
    this.requiredFuelsMembersImports = [];
  }
}
