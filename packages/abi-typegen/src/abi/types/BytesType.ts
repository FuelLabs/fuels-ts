import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class BytesType extends ArrayType {
  public static swayType = 'struct Bytes';

  public name = 'bytes';

  static MATCH_REGEX: RegExp = /^struct Bytes/m;

  static isSuitableFor(params: { type: string }) {
    return BytesType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'Bytes';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
