import type { IType, ITypeAttributes } from '../../types/interfaces/IType';
import { getStructContents } from '../../utils/getStructContents';
import type { SupportedTypeClass } from '../../utils/supportedTypes';

import { AType } from './AType';

export class ArrayType extends AType implements IType {
  // Note: the array length expressed in '; 2]' could be any length
  public static swayType = '[_; 2]';
  requiredFuelsMembersImports: string[] = [];

  public name = 'array';

  static MATCH_REGEX: RegExp = /^\[_; ([0-9]+)\]$/m;

  static isSuitableFor(params: { type: string }) {
    return ArrayType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(supportedTypes: Array<SupportedTypeClass>): ITypeAttributes {
    const length = Number(this.type.type.match(ArrayType.MATCH_REGEX)?.[1]);

    const { input: inputLabel, output: outputLabel } = getStructContents(
      supportedTypes,
      this.type,
      false
    );

    this.attributes = {
      inputLabel: `[${new Array(length).fill(inputLabel).join(', ')}]`,
      outputLabel: `[${new Array(length).fill(outputLabel).join(', ')}]`,
    };

    return this.attributes;
  }
}
