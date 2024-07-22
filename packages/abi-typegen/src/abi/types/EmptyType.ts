import type { JsonAbiType } from '../..';
import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class EmptyType extends AType implements IType {
  public static swayType = '()';

  public name = 'empty';

  static MATCH_REGEX: RegExp = /^\(\)$/m;

  static TYPE_LABEL: string = 'undefined';

  constructor(params: { rawAbiType: JsonAbiType }) {
    super(params);
    this.attributes = {
      inputLabel: EmptyType.TYPE_LABEL,
      outputLabel: EmptyType.TYPE_LABEL,
    };
  }

  static isSuitableFor(params: { type: string }) {
    return EmptyType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    return this.attributes;
  }
}
