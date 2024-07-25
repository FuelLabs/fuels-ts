import type { IType } from '../../types/interfaces/IType';

import { U8Type } from './U8Type';

export class U64Type extends U8Type implements IType {
  public static swayType = 'u64';

  public attributes = {
    inputLabel: `BigNumberish`,
    outputLabel: `BN`,
  };

  public requiredFuelsMembersImports = Object.values(this.attributes);
  public name = 'u64';

  public static MATCH_REGEX: RegExp = /^u64$/m;

  public parseComponentsAttributes() {
    return this.attributes;
  }

  static isSuitableFor(params: { type: string }) {
    return U64Type.MATCH_REGEX.test(params.type);
  }
}
