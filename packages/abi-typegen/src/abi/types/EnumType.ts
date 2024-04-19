import type { IRawAbiTypeComponent } from '../../index';
import type { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { extractStructName } from '../../utils/extractStructName';
import { findType } from '../../utils/findType';

import { AType } from './AType';
import { EmptyType } from './EmptyType';

export class EnumType extends AType implements IType {
  public static swayType = 'enum MyEnumName';

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
    const name = extractStructName({
      rawAbiType: this.rawAbiType,
      regex: EnumType.MATCH_REGEX,
    });
    return name;
  }

  public getNativeEnum(params: { types: IType[] }) {
    const { types } = params;

    const typeHash: { [key: number]: IType['rawAbiType']['type'] } = types.reduce(
      (hash, row) => ({
        ...hash,
        [row.rawAbiType.typeId]: row.rawAbiType.type,
      }),
      {}
    );

    const { components } = this.rawAbiType;

    // `components` array guaranteed to always exist for structs/enums
    const enumComponents = components as IRawAbiTypeComponent[];

    if (!enumComponents.every(({ type }) => typeHash[type] === EmptyType.swayType)) {
      return undefined;
    }

    return enumComponents.map(({ name }) => `${name} = '${name}'`).join(', ');
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
