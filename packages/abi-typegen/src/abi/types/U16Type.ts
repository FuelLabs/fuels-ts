import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { U8Type } from './U8Type';

export class U16Type extends U8Type implements IType {
  public static swayTypeExample = 'u16';

  public name = 'u16';

  public static MATCH_REGEX: RegExp = /^u16$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return U16Type.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
