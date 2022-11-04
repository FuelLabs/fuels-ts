import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class U8Type extends AType implements IType {
  public static swayTypeExample = 'u8';

  public name = 'u8';

  public static MATCH_REGEX: RegExp = /^u8$/m;

  constructor(params: { rawAbiType: IRawAbiTypeRoot }) {
    super(params);
    this.attributes = {
      inputLabel: `BigNumberish`,
      outputLabel: `number`,
    };
  }

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return U8Type.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    return this.attributes;
  }
}
