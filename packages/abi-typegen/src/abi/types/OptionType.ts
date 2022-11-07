import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class OptionType extends AType implements IType {
  public static swayTypeExample = 'enum Option';

  public name = 'option';

  static MATCH_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { type: string }) {
    return OptionType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Option`,
      outputLabel: `Option`,
    };
    return this.attributes;
  }
}
