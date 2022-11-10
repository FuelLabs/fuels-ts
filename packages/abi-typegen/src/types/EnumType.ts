import type { IRawAbiTypeComponent } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';
import type { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';

import { AType } from './AType';

export class EnumType extends AType implements IType {
  public static swayTypeExample = 'enum MyEnumName';

  public name = 'enum';

  static MATCH_REGEX: RegExp = /^enum (.+)$/m;
  static IGNORE_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = EnumType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = EnumType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const structName = this.getStructName();

    this.attributes = {
      structName,
      inputLabel: `${structName}Input`,
      outputLabel: `${structName}Output`,
    };

    return this.attributes;
  }

  public getStructName() {
    const match = this.rawAbiType.type.match(EnumType.MATCH_REGEX)?.[1];
    return match as string; // guaranteed to always exist for enums (and structs)
  }

  public getStructContents(params: { types: IType[]; target: TargetEnum }) {
    const { types, target } = params;

    const { components } = this.rawAbiType;

    // `components` array guaranteed to always exist for structs/enums
    const enumComponents = components as IRawAbiTypeComponent[];

    const attributeKey: 'inputLabel' | 'outputLabel' = `${target}Label`;

    const contents = enumComponents.map((component) => {
      const { name, type: typeId } = component;

      if (typeId === 0) {
        return `${name}: []`;
      }

      const { attributes } = findType({ types, typeId });
      return `${name}: ${attributes[attributeKey]}`;
    });

    return contents.join(', ');
  }
}
