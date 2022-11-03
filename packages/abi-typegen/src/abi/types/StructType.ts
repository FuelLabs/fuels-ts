import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';

import { AType } from './AType';

export class StructType extends AType implements IType {
  public name: string = 'struct';

  static MATCH_REGEX: RegExp = /^struct (.+)$/m;
  static IGNORE_REGEX: RegExp = /^struct (Vec|RawVec)$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    const isAMatch = StructType.MATCH_REGEX.test(params.rawAbiType.type);
    const shouldBeIgnored = StructType.IGNORE_REGEX.test(params.rawAbiType.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    const structName = this.getStructName();
    this.attributes = {
      structName,
      inputLabel: structName,
      outputLabel: structName,
    };
    return this.attributes;
  }

  public getStructName() {
    const match = this.rawAbiType.type.match(StructType.MATCH_REGEX)?.[1];
    if (!match) {
      throw Error('All structs need to have a definition');
    }
    return match;
  }

  public getStructContents(params: { types: IType[] }) {
    const { types } = params;
    const { components } = this.rawAbiType;

    const contents = (components || []).map((component) => {
      const { name, type: typeId } = component;
      const type = findType({ types, typeId });

      let typeDecl: string;

      // If componenet is simple, use it
      if (!component.typeArguments) {
        typeDecl = `${name}: ${type.attributes.inputLabel}`;
      } else {
        // Otherwise, get type from its member
        const subType = findType({ typeId: component.typeArguments[0].type, types });
        const typeLabel = type.attributes.inputLabel;
        const subtypeLabel = subType.attributes.inputLabel;

        typeDecl = `${name}: ${typeLabel.replace('unknown', subtypeLabel)}`;
      }

      return typeDecl;
    });

    return contents.join(', ');
  }
}
