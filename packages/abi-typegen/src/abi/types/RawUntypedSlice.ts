import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class RawUntypedSlice extends ArrayType {
  public static swayType = 'raw untyped slice';

  public name = 'rawUntypedSlice';

  public static MATCH_REGEX: RegExp = /^raw untyped slice$/m;

  static isSuitableFor(params: { type: string }) {
    return RawUntypedSlice.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `RawUntypedSlice`,
      outputLabel: `RawUntypedSlice`,
    };
    return this.attributes;
  }
}
