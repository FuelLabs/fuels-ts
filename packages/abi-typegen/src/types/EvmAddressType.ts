import type { IRawAbiTypeComponent } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';
import type { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';

import { AType } from './AType';
import { B256Type } from './B256Type';

export class EvmAddressType extends AType implements IType {
  public static swayType = 'struct EvmAddress';

  public name = 'evmAddress';

  static MATCH_REGEX: RegExp = /^struct EvmAddress$/m;
  static IGNORE_REGEX: RegExp = /^struct (Vec|RawVec)$/m;

  static isSuitableFor(params: { type: string }) {
    const isAMatch = EvmAddressType.MATCH_REGEX.test(params.type);
    const shouldBeIgnored = EvmAddressType.IGNORE_REGEX.test(params.type);
    return isAMatch && !shouldBeIgnored;
  }

  public parseComponentsAttributes(_params: { types: IType[] }) {
    this.attributes = {
      structName: 'EvmAddress',
      inputLabel: 'EvmAddressInput',
      outputLabel: 'EvmAddressOutput',
    };
    return this.attributes;
  }

  public getStructContents(params: { types: IType[]; target: TargetEnum }): string {
    const { types, target } = params;
    const { components } = this.rawAbiType;
    const requiredComponent = 'value';

    // EVM Address will always contain a components array
    const evmComponents = components as IRawAbiTypeComponent[];

    // Check Evm Address for invalid components
    if (evmComponents.length > 1) {
      const invalidComponentNames = evmComponents
        .filter((component) => component.name !== requiredComponent)
        .map((component) => component.name)
        .join(', ');

      let message = `Invalid number of components for Evm Address.\n\n`;
      message += `Should only contain a ${requiredComponent} component.\n\n`;
      message += `Parsed struct also contains the following components:\n\n`;
      message += `${invalidComponentNames}`;

      throw new Error(message);
    }

    const evmComponent: IRawAbiTypeComponent = evmComponents[0];
    const { type: typeId, name } = evmComponent;
    const type = findType({ types, typeId });

    if (type instanceof B256Type && name === requiredComponent) {
      const attributeKey: 'inputLabel' | 'outputLabel' = `${target}Label`;
      return `${requiredComponent}: ${type.attributes[attributeKey]}`;
    }

    let message = `Invalid Evm Address structure.\n\n`;
    message += `Should only contain a ${requiredComponent} component of b256 type.\n\n`;

    throw new Error(message);
  }

  public getStructDeclaration(params: { types: IType[] }) {
    const { typeParameters } = this.rawAbiType;

    if (typeParameters) {
      const { types } = params;
      const structs = typeParameters.map((typeId) => findType({ types, typeId }));
      const labels = structs.map(({ attributes: { inputLabel } }) => inputLabel);
      const structDeclaration = `<${labels.join(', ')}>`;

      let message = `Invalid Evm Address declaration.\n\n`;
      message += `Should not contain the following input:\n\n`;
      message += `${structDeclaration}`;

      throw new Error(message);
    }

    return '';
  }
}
