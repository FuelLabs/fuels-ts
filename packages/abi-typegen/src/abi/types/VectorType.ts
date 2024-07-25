import { ArrayType } from './ArrayType';

export class VectorType extends ArrayType {
  public static swayType = 'struct Vec';

  public name = 'vector';
  public attributes = {
    inputLabel: `Vec`,
    outputLabel: `Vec`,
  };

  static MATCH_REGEX: RegExp = /^struct (std::vec::)?Vec/m;
  static IGNORE_REGEX: RegExp = /^struct (std::vec::)?RawVec$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = VectorType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = VectorType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes() {
    return this.attributes;
  }
}
