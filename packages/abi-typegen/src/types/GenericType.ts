import type { IType } from '../interfaces/IType';

import { AType } from './AType';

export class GenericType extends AType implements IType {
  public static swayType = 'generic T';

  public name = 'generic';

  static MATCH_REGEX: RegExp = /^generic ([^\s]+)$/m;

  static isSuitableFor(params: { type: string }) {
    return GenericType.MATCH_REGEX.test(params.type);
  }

  public getStructName() {
    const match = this.rawAbiType.type.match(GenericType.MATCH_REGEX)?.[1];
    return match as string; // guaranteed to always exist for Structs, Enums, and Generics
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
