import type { IRawAbiTypeComponent } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class EnumType extends AType implements IType {
  public static swayTypeExample = 'enum Option';

  public name = 'enum';

  static MATCH_REGEX: RegExp = /^enum (.+)$/m;
  static IGNORE_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = EnumType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = EnumType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const enumName = this.getEnumName();
    this.attributes = {
      enumName,
      inputLabel: enumName,
      outputLabel: enumName,
    };
    return this.attributes;
  }

  public getEnumName() {
    const match = this.rawAbiType.type.match(EnumType.MATCH_REGEX)?.[1];
    return match as string; // guaranteed to always exist for enums (and structs)
  }

  public getEnumContents(_params: { types: IType[] }) {
    const { components } = this.rawAbiType;

    // `components` array guaranteed to always exist for structs/enums
    const enumComponents = components as IRawAbiTypeComponent[];

    const contents = enumComponents.map((component) => {
      const { name } = component;
      return `${name}: []`;
    });

    return contents.join(', ');
  }
}
