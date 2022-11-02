import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { ArrayType } from './ArrayType';

export class VectorType extends ArrayType {
  public name: string = 'vector';

  static MATCH_REGEX: RegExp = /^struct Vec/m;
  static IGNORE_REGEX: RegExp = /^struct RawVec$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    const isAMatch = VectorType.MATCH_REGEX.test(params.rawAbiType.type);
    const shouldBeIgnored = VectorType.IGNORE_REGEX.test(params.rawAbiType.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `any[]`,
      outputLabel: `any[]`,
      /*
        Vector sub-fiels can't be parsed up here,
        only inside functions inputs/outputs.
      */
    };
    return this.attributes;
  }
}
