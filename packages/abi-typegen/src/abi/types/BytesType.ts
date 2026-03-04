import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class BytesType extends ArrayType {
  public static override swayType = 'struct Bytes';

  public override name = 'bytes';

  static override MATCH_REGEX: RegExp = /^struct (std::bytes::)?Bytes/m;

  static override isSuitableFor(params: { type: string }) {
    return BytesType.MATCH_REGEX.test(params.type);
  }

  public override parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'Bytes';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
