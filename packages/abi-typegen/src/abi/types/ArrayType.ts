import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';
import { parseTypeArguments } from '../../utils/parseTypeArguments';

import { AType } from './AType';

export class ArrayType extends AType implements IType {
  // Note: the array length expressed in '; 2]' could be any length
  public static swayType = '[_; 2]';

  public name = 'array';

  static MATCH_REGEX: RegExp = /^\[_; ([0-9]+)\]$/m;

  static isSuitableFor(params: { type: string }) {
    return ArrayType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(params: { types: IType[] }) {
    const { types } = params;
    const { type } = this.rawAbiType;

    // array length will be used to generated a fixed-length array type
    const arrayLen = Number(type.match(ArrayType.MATCH_REGEX)?.[1]);

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

    // fixed-length array, based on `arrayLen`
    const inputTypes = Array(arrayLen).fill(inputs[0]).join(', ');
    const outputTypes = Array(arrayLen).fill(outputs[0]).join(', ');

    this.attributes = {
      inputLabel: `[${inputTypes}]`,
      outputLabel: `[${outputTypes}]`,
    };

    return this.attributes;
  }
}
