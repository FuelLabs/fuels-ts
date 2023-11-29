import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class StrSlicesType extends AType implements IType {
  public static swayType = 'str';

  public name = 'strSlices';

  static MATCH_REGEX: RegExp = /^str$/m;

  static isSuitableFor(params: { type: string }) {
    return StrSlicesType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: 'StrSlices',
      outputLabel: 'StrSlices',
    };
    return this.attributes;
  }
}
