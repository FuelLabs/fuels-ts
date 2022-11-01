import type { IRawAbiTypeRoot } from '../interfaces/IAbiType';

import { StrType } from './StrType';

export class B256Type extends StrType {
  public name = 'b256';

  static MATCH_REGEX = /^b256$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return B256Type.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
