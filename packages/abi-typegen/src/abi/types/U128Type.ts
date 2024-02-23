import type { IType } from '../../types/interfaces/IType';

import { U64Type } from './U64Type';

export class U128Type extends U64Type implements IType {
  public static swayType = 'u128';

  public name = 'u128';

  public static MATCH_REGEX: RegExp = /^u128$/m;

  static isSuitableFor(params: { type: string }) {
    return U128Type.MATCH_REGEX.test(params.type);
  }
}
