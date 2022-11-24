import type { IType } from '../interfaces/IType';

import { U64Type } from './U64Type';

export class RawUntypedPtr extends U64Type implements IType {
  public static swayType = 'raw untyped ptr';

  public name = 'rawUntypedPtr';

  public static MATCH_REGEX: RegExp = /^raw untyped ptr$/m;

  static isSuitableFor(params: { type: string }) {
    return RawUntypedPtr.MATCH_REGEX.test(params.type);
  }
}
