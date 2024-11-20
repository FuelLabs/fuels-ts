import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class RawUntypedSlice extends ArrayType {
  public static override swayType = 'raw untyped slice';

  public override name = 'rawUntypedSlice';

  public static override MATCH_REGEX: RegExp = /^raw untyped slice$/m;

  static override isSuitableFor(params: { type: string }) {
    return RawUntypedSlice.MATCH_REGEX.test(params.type);
  }

  public override parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'RawSlice';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
