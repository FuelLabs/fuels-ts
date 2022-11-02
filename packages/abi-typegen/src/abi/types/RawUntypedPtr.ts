import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { U64Type } from './U64Type';

export class RawUntypedPtr extends U64Type implements IType {
  public name: string = 'rawUntypedPtr';

  public static MATCH_REGEX: RegExp = /^raw untyped ptr$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return RawUntypedPtr.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
