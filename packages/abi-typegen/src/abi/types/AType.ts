import type { IAbiTypeRoot } from '../interfaces/IAbiType';
import type { ITypeAttributes } from '../interfaces/IType';

export class AType {
  public rawAbiType: IAbiTypeRoot;
  public attributes: ITypeAttributes;

  constructor(params: { rawAbiType: IAbiTypeRoot }) {
    this.rawAbiType = params.rawAbiType;
    this.attributes = {
      inputLabel: 'unknbown',
      outputLabel: 'unknbown',
    };
  }
}
