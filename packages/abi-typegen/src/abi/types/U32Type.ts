import type { IType } from '../../types/interfaces/IType';

import { U8Type } from './U8Type';

export class U32Type extends U8Type implements IType {
  public static override swayType = 'u32';

  public override name = 'u32';

  public static override MATCH_REGEX: RegExp = /^u32$/m;

  static override isSuitableFor(params: { type: string }) {
    return U32Type.MATCH_REGEX.test(params.type);
  }
}
