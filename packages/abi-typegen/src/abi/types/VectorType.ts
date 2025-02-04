import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class VectorType extends ArrayType {
  public static override swayType = 'struct Vec';

  public override name = 'vector';

  static override MATCH_REGEX: RegExp = /^struct (std::vec::)?Vec/m;
  static IGNORE_REGEX: RegExp = /^struct (std::vec::)?RawVec$/m;

  static override isSuitableFor(params: { type: string }) {
    const isAMatch = VectorType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = VectorType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public override parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Vec`,
      outputLabel: `Vec`,
    };
    return this.attributes;
  }
}
