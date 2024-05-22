import type { IType } from '../../types/interfaces/IType';

import { AType } from './AType';

export class ResultType extends AType implements IType {
  public static swayType = 'enum Result';

  public name = 'result';

  static MATCH_REGEX: RegExp = /^enum (std::result::)?Result$/m;

  static isSuitableFor(params: { type: string }) {
    return ResultType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Result`,
      outputLabel: `Result`,
    };
    return this.attributes;
  }
}
