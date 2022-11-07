import { TupleType } from './TupleType';

export class ArrayType extends TupleType {
  public static swayTypeExample = '[_; 2]';

  public name = 'array';

  static MATCH_REGEX: RegExp = /^\[_; ([0-9]+)\]$/m;

  static isSuitableFor(params: { type: string }) {
    return ArrayType.MATCH_REGEX.test(params.type);
  }
}
