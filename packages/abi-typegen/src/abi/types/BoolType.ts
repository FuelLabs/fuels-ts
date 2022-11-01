import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';

import { AType } from './AType';

export class BoolType extends AType implements IType {
  public name: string = 'bool';

  static MATCH_REGEX: RegExp = /^bool$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return BoolType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: 'boolean',
      outputLabel: 'boolean',
    };
    return this.attributes;
  }
}
