import type { IType } from '../../types/interfaces/IType';
import { extractStructName } from '../../utils/extractStructName';
import { getStructContents } from '../../utils/getStructContents';
import type { SupportedTypeClass } from '../../utils/supportedTypes';

import { AType } from './AType';

export class StructType extends AType implements IType {
  public static swayType = 'struct MyStruct';

  public name = 'struct';

  static MATCH_REGEX: RegExp = /^struct (.+::)?(.+)$/m;
  static IGNORE_REGEX: RegExp = /^struct (std::.*)?(Vec|RawVec|EvmAddress|Bytes|String|RawBytes)$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = StructType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = StructType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes() {
    const structName = extractStructName({
      type: this.type,
      regex: StructType.MATCH_REGEX,
    });

    this.attributes = {
      inputLabel: `${structName}Input`,
      outputLabel: `${structName}Output`,
    };

    return this.attributes;
  }

  public parseStructContents(supportedTypes: SupportedTypeClass[]) {
    this.structContents = getStructContents(supportedTypes, this.type, true);
  }
}
