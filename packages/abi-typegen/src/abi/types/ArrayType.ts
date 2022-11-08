import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';
import { parseTypeArguments } from '../helpers/parseTypeArguments';

import { AType } from './AType';

export class ArrayType extends AType implements IType {
  public static swayTypeExample = '[_; 2]';

  public name = 'array';

  static MATCH_REGEX: RegExp = /^\[_; ([0-9]+)\]$/m;

  static isSuitableFor(params: { type: string }) {
    return ArrayType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    const { types } = params;

    const inputs: string[] = [];
    const outputs: string[] = [];

    // Array length will be used to generated a fixed length array type
    const { type } = this.rawAbiType;
    const arrayLen = Number(type.match(ArrayType.MATCH_REGEX)?.[1]);

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
      inputLabel: `[${Array(arrayLen).fill(inputs[0]).join(', ')}]`,
      outputLabel: `[${Array(arrayLen).fill(outputs[0]).join(', ')}]`,
    };

    return this.attributes;
  }
}
