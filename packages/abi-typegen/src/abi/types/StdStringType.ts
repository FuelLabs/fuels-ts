import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class StdStringType extends AType implements IType {
  public static swayType = 'struct String';

  public name = 'stdString';

  static MATCH_REGEX: RegExp = /^struct (std::string::)?String/m;

  static isSuitableFor(params: { type: string }) {
    return StdStringType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const capitalizedName = 'StdString';

    this.attributes = {
      inputLabel: capitalizedName,
      outputLabel: capitalizedName,
    };

    this.requiredFuelsMembersImports = [capitalizedName];

    return this.attributes;
  }
}
