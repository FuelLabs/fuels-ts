import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class BytesType extends ArrayType {
  public static swayType = 'struct Bytes';

  public name = 'bytes';

  static MATCH_REGEX: RegExp = /^struct Bytes/m;

  static isSuitableFor(params: { type: string }) {
    return BytesType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Bytes`,
      outputLabel: `Bytes`,
    };
    return this.attributes;
  }
}
