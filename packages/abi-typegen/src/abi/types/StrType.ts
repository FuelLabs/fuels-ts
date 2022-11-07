import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class StrType extends AType implements IType {
  public static swayTypeExample = 'str[3]';

  public name = 'str';

  static MATCH_REGEX: RegExp = /^str\[(.+)\]$/m;

  static isSuitableFor(params: { type: string }) {
    return StrType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: 'string',
      outputLabel: 'string',
    };
    return this.attributes;
  }
}
