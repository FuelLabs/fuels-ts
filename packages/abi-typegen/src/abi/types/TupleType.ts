import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';

import { AType } from './AType';

export class TupleType extends AType implements IType {
  public static swayTypeExample = '(_, _, _)';

  public name = 'tupple';

  static MATCH_REGEX: RegExp = /^\([_,\s]+\)$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    return TupleType.MATCH_REGEX.test(params.rawAbiType.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    const { types } = params;

    const inputs: string[] = [];
    const outputs: string[] = [];

    this.rawAbiType.components?.forEach((component) => {
      const { type: typeId } = component;

      if (!component.typeArguments) {
        // If component has no type arguments, read its attributes and voilà
        const { attributes } = findType({ types, typeId });
        inputs.push(attributes.inputLabel);
        outputs.push(attributes.outputLabel);
      } else {
        // Otherwise, get the type from its inner [typeArguments] member
        const subType = findType({ typeId: component.typeArguments[0].type, types });
        const inputLabel = subType.attributes.inputLabel;
        const outputLabel = subType.attributes.outputLabel;
        inputs.push(inputLabel);
        outputs.push(outputLabel);
      }
    });

    this.attributes = {
      inputLabel: `[${inputs.join(', ')}]`,
      outputLabel: `[${outputs.join(', ')}]`,
    };

    return this.attributes;
  }
}
