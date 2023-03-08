import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';
import { parseTypeArguments } from '../../utils/parseTypeArguments';

import { AType } from './AType';

export class TupleType extends AType implements IType {
  // Note: a tuple can have more/less than 3x items (like the one bellow)
  public static swayType = '(_, _, _)';

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
          target: TargetEnum.INPUT,
        });

        const outputLabel = parseTypeArguments({
          types,
          typeArguments,
          parentTypeId: typeId,
          target: TargetEnum.OUTPUT,
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
