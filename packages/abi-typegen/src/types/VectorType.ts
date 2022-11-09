import type { IType } from '../interfaces/IType';

import { ArrayType } from './ArrayType';

export class VectorType extends ArrayType {
  public static swayTypeExample = 'struct Vec';

  public name = 'vector';

  static MATCH_REGEX: RegExp = /^struct Vec/m;
  static IGNORE_REGEX: RegExp = /^struct RawVec$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = VectorType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = VectorType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Vec`,
      outputLabel: `Vec`,
    };
    return this.attributes;
  }
}
