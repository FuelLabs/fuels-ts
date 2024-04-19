import type { IRawAbiTypeRoot } from '../..';
import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class EmptyType extends AType implements IType {
  public static swayType = '()';

  public name = 'empty';

  static MATCH_REGEX: RegExp = /^\(\)$/m;

  constructor(params: { rawAbiType: IRawAbiTypeRoot }) {
    super(params);
    this.attributes = {
      inputLabel: `undefined`,
      outputLabel: `undefined`,
    };
  }

  static isSuitableFor(params: { type: string }) {
    return EmptyType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    return this.attributes;
  }
}
