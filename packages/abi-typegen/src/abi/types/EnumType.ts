import type { IType } from '../../types/interfaces/IType';
import { extractStructName } from '../../utils/extractStructName';
import { getStructContents } from '../../utils/getStructContents';
import type { SupportedTypeClass } from '../../utils/supportedTypes';

import { AType } from './AType';
import { EmptyType } from './EmptyType';
import { ResultType } from './ResultType';

export class EnumType extends AType implements IType {
  public static swayType = 'enum MyEnumName';

  public name = 'enum';

  static MATCH_REGEX: RegExp = /^enum (.+::)?(.+)$/m;
  static IGNORE_REGEXES: RegExp[] = [/^enum (std::option::)?Option$/m, ResultType.MATCH_REGEX];

  static isSuitableFor(params: { type: string }) {
    const isAMatch = EnumType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = EnumType.IGNORE_REGEXES.some((r) => r.test(params.type));
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes() {
    const structName = extractStructName({
      type: this.type,
      regex: EnumType.MATCH_REGEX,
    });

    this.attributes = {
      inputLabel: `${structName}Input`,
      outputLabel: `${structName}Output`,
    };

    return this.attributes;
  }

  public getNativeEnum() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const components = this.type.components!;
    if (components.some((c) => c.type.type !== EmptyType.swayType)) {
      return undefined;
    }

    return components.map(({ name }) => `${name} = '${name}'`).join(', ');
  }

  public parseStructContents(supportedTypes: SupportedTypeClass[]) {
    this.structContents = getStructContents(supportedTypes, this.type, true);
  }
}
