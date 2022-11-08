import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';
import { parseTypeArguments } from '../helpers/parseTypeArguments';

import { AType } from './AType';

export class TupleType extends AType implements IType {
  public static swayTypeExample = '(_, _, _)';

  public name = 'tupple';

  static MATCH_REGEX: RegExp = /^\([_,\s]+\)$/m;

  static isSuitableFor(params: { type: string }) {
    return TupleType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    const { types } = params;

    const inputs: string[] = [];
    const outputs: string[] = [];

    this.rawAbiType.components?.forEach((component) => {
      const { type: typeId, typeArguments } = component;

      if (!typeArguments) {
        // if component has no type arguments, read its attributes and voilà
        const { attributes } = findType({ types, typeId });

        inputs.push(attributes.inputLabel);
        outputs.push(attributes.outputLabel);
      } else {
        // otherwise process child `typeArguments` recursively
        const inputLabel = parseTypeArguments({
          types,
          typeArguments,
          parentTypeId: typeId,
          targetMode: 'input',
        });

        const outputLabel = parseTypeArguments({
          types,
          typeArguments,
          parentTypeId: typeId,
          targetMode: 'output',
        });

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
