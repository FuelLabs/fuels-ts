import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class RawUntypedSlice extends ArrayType {
  public static swayType = 'raw untyped slice';

  public name = 'rawUntypedSlice';

  public static MATCH_REGEX: RegExp = /^raw untyped slice$/m;

  static isSuitableFor(params: { type: string }) {
    return RawUntypedSlice.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'RawSlice';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
