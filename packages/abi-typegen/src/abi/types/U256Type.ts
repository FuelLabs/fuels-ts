import type { IType } from '../../types/interfaces/IType';

import { U64Type } from './U64Type';

export class U256Type extends U64Type implements IType {
  public static override swayType = 'u256';

  public override name = 'u256';

  public static override MATCH_REGEX: RegExp = /^u256$/m;

  static override isSuitableFor(params: { type: string }) {
    return U256Type.MATCH_REGEX.test(params.type);
  }
}
