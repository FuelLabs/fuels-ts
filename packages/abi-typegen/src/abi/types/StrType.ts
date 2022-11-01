import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';

import { AType } from './AType';

export class StrType extends AType implements IType {
  public name: string = 'str';

  static MATCH_REGEX: RegExp = /^str\[(.+)\]$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return StrType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: 'string',
      outputLabel: 'string',
    };
    return this.attributes;
  }
}
