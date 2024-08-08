import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class StrSliceType extends AType implements IType {
  public static swayType = 'str';

  public name = 'strSlice';

  static MATCH_REGEX: RegExp = /^str$/m;

  static isSuitableFor(params: { type: string }) {
    return StrSliceType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'StrSlice';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
