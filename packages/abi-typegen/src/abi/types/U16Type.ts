import type { IType } from '../../types/interfaces/IType';

import { U8Type } from './U8Type';

export class U16Type extends U8Type implements IType {
  public static override swayType = 'u16';

  public override name = 'u16';

  public static override MATCH_REGEX: RegExp = /^u16$/m;

  static override isSuitableFor(params: { type: string }) {
    return U16Type.MATCH_REGEX.test(params.type);
  }
}
