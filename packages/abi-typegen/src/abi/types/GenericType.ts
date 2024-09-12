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

  public getStructName() {
    const name = extractStructName({
      rawAbiType: this.rawAbiType,
      regex: GenericType.MATCH_REGEX,
    });
    return name;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const label = this.getStructName();

    this.attributes = {
      inputLabel: label,
      outputLabel: label,
    };

    return this.attributes;
  }
}

interface TypeBuilder {
  addTypeInfo: (params: {}) => TypeBuilder;
  build: () => void;
}

interface Typer {
  generate: (params: { builder: TypeBuilder }) => void;
}
