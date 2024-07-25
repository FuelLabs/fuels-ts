import type { IType, ITypeAttributes } from '../../types/interfaces/IType';

import { AType } from './AType';

export class EmptyType extends AType implements IType {
  public static swayType = '()';
  public attributes: ITypeAttributes = {
    /**
     * The empty type is always ignored in function inputs. If it makes
     * its way into a function's inputs list, it's a bug in the typegen.
     */
    inputLabel: 'never',
    outputLabel: 'void',
  };

  public name = 'empty';

  static MATCH_REGEX: RegExp = /^\(\)$/m;

  static isSuitableFor(params: { type: string }) {
    return EmptyType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    return this.attributes;
  }
}
