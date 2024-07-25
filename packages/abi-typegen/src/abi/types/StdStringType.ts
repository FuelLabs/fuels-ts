import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class StdStringType extends AType implements IType {
  public static swayType = 'struct String';

  public name = 'stdString';

  private capitalizedName = 'StdString';

  public attributes = {
    inputLabel: this.capitalizedName,
    outputLabel: this.capitalizedName,
  };

  public requiredFuelsMembersImports = [this.capitalizedName];

  static MATCH_REGEX: RegExp = /^struct (std::string::)?String/m;

  static isSuitableFor(params: { type: string }) {
    return StdStringType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    return this.attributes;
  }
}
