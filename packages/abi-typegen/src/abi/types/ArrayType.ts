import type { IAbiTypeRoot } from '../interfaces/IAbiType';

import { TupleType } from './TupleType';

export class ArrayType extends TupleType {
  public name: string = 'array';

  static MATCH_REGEX: RegExp = /^\[_; ([0-9]+)\]$/m;

  static isSuitableFor(params: { rawAbiType: IAbiTypeRoot }) {
    return ArrayType.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
