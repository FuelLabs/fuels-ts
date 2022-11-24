import type { IRawAbiTypeComponent } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';
import type { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
import { parseTypeArguments } from '../utils/parseTypeArguments';

import { AType } from './AType';

export class StructType extends AType implements IType {
  public static swayType = 'struct MyStruct';

  public name = 'struct';

  static MATCH_REGEX: RegExp = /^struct (.+)$/m;
  static IGNORE_REGEX: RegExp = /^struct (Vec|RawVec)$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = StructType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = StructType.IGNORE_REGEX.test(params.type);
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
    const match = this.rawAbiType.type.match(StructType.MATCH_REGEX)?.[1];
    return match as string; // guaranteed to always exist for structs (and enums)
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

  public getStructDeclaration(params: { types: IType[] }) {
    const { types } = params;
    const { typeParameters } = this.rawAbiType;

    if (typeParameters) {
      const structs = typeParameters.map((typeId) => findType({ types, typeId }));

      const labels = structs.map(({ attributes: { inputLabel } }) => inputLabel);

      return `<${labels.join(', ')}>`;
    }

    return '';
  }
}
