import type { IType } from '../../types/interfaces/IType';

import { U64Type } from './U64Type';

export class RawUntypedPtr extends U64Type implements IType {
  public static override swayType = 'raw untyped ptr';

  public override name = 'rawUntypedPtr';

  public static override MATCH_REGEX: RegExp = /^raw untyped ptr$/m;

  static override isSuitableFor(params: { type: string }) {
    return RawUntypedPtr.MATCH_REGEX.test(params.type);
  }
}
