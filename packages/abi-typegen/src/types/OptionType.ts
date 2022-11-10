import type { IRawAbiTypeComponent } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';
import type { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
import { parseTypeArguments } from '../utils/parseTypeArguments';

import { AType } from './AType';

export class OptionType extends AType implements IType {
  public static swayTypeExample = 'enum Option';

  public name = 'option';

  static MATCH_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { type: string }) {
    return OptionType.MATCH_REGEX.test(params.type);
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      inputLabel: `Option`,
      outputLabel: `Option`,
    };
    return this.attributes;
  }

  public getStructContents(params: { types: IType[]; target: TargetEnum }) {
    const { types, target } = params;
    const { components } = this.rawAbiType;

    // `components` array guaranteed to always exist for structs/enums
    const structComponents = components as IRawAbiTypeComponent[];

    // loop through all components
    const members = structComponents.map((component) => {
      const { name, type: typeId, typeArguments } = component;

      const type = findType({ types, typeId });

      let typeDecl: string;

      if (typeArguments) {
        // recursively process child `typeArguments`
        typeDecl = parseTypeArguments({
          types,
          target,
          parentTypeId: typeId,
          typeArguments,
        });
      } else {
        // or just collect type declaration
        const attributeKey: 'inputLabel' | 'outputLabel' = `${target}Label`;
        typeDecl = type.attributes[attributeKey];
      }

      // assemble it in `[key: string]: <Type>` fashion
      return `${name}: ${typeDecl}`;
    });

    return members.join(', ');
  }
}
