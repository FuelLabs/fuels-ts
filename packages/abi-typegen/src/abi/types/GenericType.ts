import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class GenericType extends AType implements IType {
  public static swayTypeExample = 'generic T';

  public name = 'generic';

  static MATCH_REGEX: RegExp = /^generic ([^\s]+)$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return GenericType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const matched = this.rawAbiType.type.match(GenericType.MATCH_REGEX);
    const label = matched![1];

    this.attributes = {
      inputLabel: label,
      outputLabel: label,
    };

    return this.attributes;
  }
}
