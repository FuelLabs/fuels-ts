import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class OptionType extends AType implements IType {
  public static swayType = 'enum Option';

  public name = 'option';

  static MATCH_REGEX: RegExp = /^enum (std::option::)?Option$/m;

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
