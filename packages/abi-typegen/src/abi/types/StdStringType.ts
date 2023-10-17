import type { IType } from '../../types/interfaces/IType';

import { ArrayType } from './ArrayType';

export class StdStringType extends ArrayType {
  public static swayType = 'struct String';

  public name = 'stdString';

  static MATCH_REGEX: RegExp = /^struct String/m;

  static isSuitableFor(params: { type: string }) {
    return StdStringType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `StdString`,
      outputLabel: `StdString`,
    };
    return this.attributes;
  }
}
