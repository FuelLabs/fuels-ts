import { findType } from '../../utils/findType';
import type { IAbiTypeRoot } from '../interfaces/IAbiType';
import type { IType } from '../interfaces/IType';

import { AType } from './AType';

export class TupleType extends AType implements IType {
  public name: string = 'tupple';

  static MATCH_REGEX: RegExp = /^\([_,\s]+\)$/m;

  static isSuitableFor(params: { rawAbiType: IAbiTypeRoot }) {
    return TupleType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    const inputs: string[] = [];
    const outputs: string[] = [];

    this.rawAbiType.components?.forEach(({ type: typeId }) => {
      const { types } = params;
      const { attributes } = findType({ types, typeId });
      inputs.push(attributes.inputLabel);
      outputs.push(attributes.outputLabel);
    });

    this.attributes = {
      inputLabel: `[${inputs.join(', ')}]`,
      outputLabel: `[${outputs.join(', ')}]`,
    };

    return this.attributes;
  }
}
