import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class BoolType extends AType implements IType {
  public static swayType = 'bool';

  public name = 'bool';

  static MATCH_REGEX: RegExp = /^bool$/m;

  static isSuitableFor(params: { type: string }) {
    return BoolType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: 'boolean',
      outputLabel: 'boolean',
    };
    return this.attributes;
  }
}
