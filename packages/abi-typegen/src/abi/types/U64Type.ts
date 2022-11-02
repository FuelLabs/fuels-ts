import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { U8Type } from './U8Type';

export class U64Type extends U8Type implements IType {
  public name: string = 'u64';

  public static MATCH_REGEX: RegExp = /^u64$/m;

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `BigNumberish`,
      outputLabel: `BN`,
    };
    return this.attributes;
  }

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return U64Type.MATCH_REGEX.test(params.rawAbiType.type);
  }
}
