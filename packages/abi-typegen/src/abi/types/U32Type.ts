import type { IType } from '../../interfaces/IType';

import { U8Type } from './U8Type';

export class U32Type extends U8Type implements IType {
  public static swayTypeExample = 'u32';

  public name = 'u32';

  public static MATCH_REGEX: RegExp = /^u32$/m;

  static isSuitableFor(params: { type: string }) {
    return U32Type.MATCH_REGEX.test(params.type);
  }
}
