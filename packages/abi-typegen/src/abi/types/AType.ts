import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { ITypeAttributes } from '../../interfaces/IType';

export class AType {
  public rawAbiType: IRawAbiTypeRoot;
  public attributes: ITypeAttributes;

  constructor(params: { rawAbiType: IRawAbiTypeRoot }) {
    this.rawAbiType = params.rawAbiType;
    this.attributes = {
      inputLabel: 'unknbown',
      outputLabel: 'unknbown',
    };
  }
}
