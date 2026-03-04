import type { IType } from '../../types/interfaces/IType';

import { U8Type } from './U8Type';

export class U64Type extends U8Type implements IType {
  public static override swayType = 'u64';

  public override name = 'u64';

  public static override MATCH_REGEX: RegExp = /^u64$/m;

  public override parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `BigNumberish`,
      outputLabel: `BN`,
    };
    this.requiredFuelsMembersImports = Object.values(this.attributes);
    return this.attributes;
  }

  static override isSuitableFor(params: { type: string }) {
    return U64Type.MATCH_REGEX.test(params.type);
  }
}
