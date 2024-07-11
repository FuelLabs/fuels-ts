import type { JsonAbiType } from '../../index';
import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class U8Type extends AType implements IType {
  public static swayType = 'u8';

  public name = 'u8';

  public static MATCH_REGEX: RegExp = /^u8$/m;

  constructor(params: { rawAbiType: JsonAbiType }) {
    super(params);
    this.attributes = {
      inputLabel: `BigNumberish`,
      outputLabel: `number`,
    };
    this.requiredFuelsMembersImports = [this.attributes.inputLabel];
  }

  static isSuitableFor(params: { type: string }) {
    return U8Type.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    return this.attributes;
  }
}
