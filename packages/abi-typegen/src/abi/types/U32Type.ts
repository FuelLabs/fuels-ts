import type { IAbiTypeRoot } from '../interfaces/IAbiType';
import type { IType } from '../interfaces/IType';

import { U8Type } from './U8Type';

export class U32Type extends U8Type implements IType {
  public name: string = 'u32';

  public static MATCH_REGEX: RegExp = /^u32$/m;

  static isSuitableFor(params: { rawAbiType: IAbiTypeRoot }) {
    return U32Type.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
