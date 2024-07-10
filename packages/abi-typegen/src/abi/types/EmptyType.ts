import type { JsonAbiType } from '../..';
import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class EmptyType extends AType implements IType {
  public static swayType = '()';

  public name = 'empty';

  static MATCH_REGEX: RegExp = /^\(\)$/m;

  constructor(params: { rawAbiType: JsonAbiType }) {
    super(params);
    this.attributes = {
      /**
       * The empty type is always ignored in function inputs. If it makes
       * its way into a function's inputs list, it's a bug in the typegen.
       */
      inputLabel: `never`,
      outputLabel: `void`,
    };
  }

  static isSuitableFor(params: { type: string }) {
    return EmptyType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    return this.attributes;
  }
}
