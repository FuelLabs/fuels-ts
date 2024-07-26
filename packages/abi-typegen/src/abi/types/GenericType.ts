import type { IType } from '../../types/interfaces/IType';
import { extractStructName } from '../../utils/extractStructName';

import { AType } from './AType';

export class GenericType extends AType implements IType {
  public static swayType = 'generic T';

  public name = 'generic';

  static MATCH_REGEX: RegExp = /^generic ([^\s]+)$/m;

  static isSuitableFor(params: { type: string }) {
    return GenericType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes() {
    const label = extractStructName({
      type: this.type,
      regex: GenericType.MATCH_REGEX,
    });

    this.attributes = {
      inputLabel: label,
      outputLabel: label,
    };

    return this.attributes;
  }
}
