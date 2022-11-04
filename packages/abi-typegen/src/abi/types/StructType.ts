import type { IRawAbiTypeComponent, IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';

import { AType } from './AType';

export class StructType extends AType implements IType {
  public static swayTypeExample = 'struct MyStruct';

  public name = 'struct';

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
    return match as string; // guaranteed to always exist for structs (and enums)
  }

  public getStructContents(params: { types: IType[] }) {
    const { types } = params;
    const { components } = this.rawAbiType;

    // `components` array guaranteed to always exist for structs/enums
    const structComponents = components as IRawAbiTypeComponent[];

    const contents = structComponents.map((component) => {
      const { name, type: typeId } = component;
      const type = findType({ types, typeId });
      const typeDecl = `${name}: ${type.attributes.inputLabel}`;
      return typeDecl;
    });

    return contents.join(', ');
  }
}
