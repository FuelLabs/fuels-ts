import type { IType } from '../../types/interfaces/IType';

import { U64Type } from './U64Type';

export class U256Type extends U64Type implements IType {
  public static swayType = 'u256';

  public name = 'u256';

  public static MATCH_REGEX: RegExp = /^u256$/m;

  static isSuitableFor(params: { type: string }) {
    return U256Type.MATCH_REGEX.test(params.type);
  }
}
