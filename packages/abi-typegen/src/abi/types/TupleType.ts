import type { IType } from '../../types/interfaces/IType';
import { getStructContents } from '../../utils/getStructContents';
import type { SupportedTypeClass } from '../../utils/supportedTypes';

import { AType } from './AType';

export class TupleType extends AType implements IType {
  // Note: a tuple can have more/less than 3x items (like the one bellow)
  public static swayType = '(_, _, _)';

  public name = 'tuple';

  static MATCH_REGEX: RegExp = /^\([_,\s]+\)$/m;

  static isSuitableFor(params: { type: string }) {
    return TupleType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(supportedTypes: SupportedTypeClass[]) {
    const structContents = getStructContents(supportedTypes, this.type, false);

    this.attributes = {
      inputLabel: `[${structContents.input}]`,
      outputLabel: `[${structContents.output}]`,
    };

    return this.attributes;
  }
}
