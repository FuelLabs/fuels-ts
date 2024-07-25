import type { IType, ITypeAttributes } from '../../types/interfaces/IType';

import { AType } from './AType';

export class U8Type extends AType implements IType {
  public static swayType = 'u8';
  public attributes: ITypeAttributes = {
    inputLabel: `BigNumberish`,
    outputLabel: `number`,
  };

  public requiredFuelsMembersImports: string[] = [this.attributes.inputLabel];
  public name = 'u8';

  public static MATCH_REGEX: RegExp = /^u8$/m;

  static isSuitableFor(params: { type: string }) {
    return U8Type.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    return this.attributes;
  }
}
