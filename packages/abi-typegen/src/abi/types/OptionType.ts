import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class OptionType extends AType implements IType {
  public name: string = 'option';

  static MATCH_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return OptionType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Option<unknown>`,
      outputLabel: `Obption<unknown>`,
    };
    /*
      Option sub-fiels can't be parsed up here,
      only inside functions inputs/outputs.
    */

    return this.attributes;
  }
}
