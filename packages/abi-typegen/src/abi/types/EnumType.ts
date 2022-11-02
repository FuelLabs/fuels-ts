import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { AType } from './AType';

export class EnumType extends AType implements IType {
  public name: string = 'enum';

  static MATCH_REGEX: RegExp = /^enum (.+)$/m;
  static IGNORE_REGEX: RegExp = /^enum Option$/m;

  static isSuitableFor(params: { rawAbiType: IRawAbiTypeRoot }) {
    const isAMatch = EnumType.MATCH_REGEX.test(params.rawAbiType.type);
    const shouldBeIgnored = EnumType.IGNORE_REGEX.test(params.rawAbiType.type);
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
    const match = this.rawAbiType.type.match(EnumType.MATCH_REGEX)?.[1];
    if (match) {
      return match;
    }
    throw Error('All enums need to have a definition');
  }

  public getEnumContents(_params: { types: IType[] }) {
    const { components } = this.rawAbiType;
    const contents = (components || []).map((component, _index) => {
      const { name } = component;
      return `${name}: []`;
      // return `${name} = ${_index}`;
    });

    return contents.join(', ');
  }
}
