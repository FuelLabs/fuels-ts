import type { IRawAbiTypeRoot } from '../interfaces/IAbiType';
import type { IType } from '../interfaces/IType';

import { U8Type } from './U8Type';

export class U16Type extends U8Type implements IType {
  public name: string = 'u8';

  public static MATCH_REGEX: RegExp = /^u16$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return U16Type.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
