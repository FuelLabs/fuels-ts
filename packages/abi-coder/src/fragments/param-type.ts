import { defineReadOnly } from '@ethersproject/properties';

import { arrayRegEx, enumRegEx, structRegEx, stringRegEx } from '../constants';

export interface JsonFragmentType {
  readonly name?: string;
  readonly type: string;
  readonly components?: ReadonlyArray<JsonFragmentType>;
  readonly typeArguments?: ReadonlyArray<JsonFragmentType>;
}

function populate(object: ParamType, params: { type?: string } & ParamTypeProps) {
  Object.keys(params).forEach((key) => {
    const paramTypeKey = key as keyof ParamTypeProps;
    const value = params[paramTypeKey];

    defineReadOnly(object, paramTypeKey, value);
  });
}

export interface ParamTypeProps {
  // The local name of the parameter (of null if unbound)
  readonly name?: string;

  // The type of this ParamType: https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#types
  readonly type: string;

  // Internal components for complex types (Tuples, Structs, Arrays, Enums)
  readonly components?: Array<ParamType>;

  // Internal typeArguments for complex types (Tuples, Structs, Arrays, Enums)
  // Only used when dynamic types are declared
  readonly typeArguments?: Array<ParamType>;

  // Typeguard prop
  readonly isParamType?: boolean;
}

export class ParamType implements ParamTypeProps {
  readonly name?: string;
  readonly type!: string;
  readonly indexed?: boolean;
  readonly components?: Array<ParamType>;
  readonly typeArguments?: Array<ParamType>;
  readonly isParamType?: boolean;

  constructor(params: ParamTypeProps) {
    populate(this, params);

    this.isParamType = true;

    Object.freeze(this);
  }

  getSignaturePrefix(): string {
    if (this.type) {
      const structMatch = structRegEx.test(this.type);
      if (structMatch) return 's';

      const arrayMatch = arrayRegEx.test(this.type);
      if (arrayMatch) return 'a';

      const enumMatch = enumRegEx.test(this.type);
      if (enumMatch) return 'e';
    }

    return '';
  }

  getSignatureContent(): string {
    const type = this.type || '';

    const arrayMatch = arrayRegEx.exec(type)?.groups;
    if (arrayMatch) {
      return `[${this.components ? this.components[0].getSighash() : arrayMatch.item};${
        arrayMatch.length
      }]`;
    }

    const strMatch = stringRegEx.exec(type)?.groups;
    if (strMatch) {
      return `str[${strMatch.length}]`;
    }

    if (Array.isArray(this.components)) {
      const typeArgumentsSignature = Array.isArray(this.typeArguments)
        ? `<${this.typeArguments.map((typeArg) => typeArg.getSighash()).join(',')}>`
        : '';
      const componentsSignature = `(${this.components.map((comp) => comp.getSighash()).join(',')})`;

      return `${typeArgumentsSignature}${componentsSignature}`;
    }

    return type;
  }

  getSighash(): string {
    const prefix = this.getSignaturePrefix();
    const content = this.getSignatureContent();

    return `${prefix}${content}`;
  }

  static fromObject(value: JsonFragmentType | ParamTypeProps): ParamType {
    if (ParamType.isParamType(value)) {
      return value;
    }

    return new ParamType({
      name: value.name,
      type: value.type,
      components: value.components ? value.components.map(ParamType.fromObject) : undefined,
      typeArguments: value.typeArguments
        ? value.typeArguments.map(ParamType.fromObject)
        : undefined,
    });
  }

  static isParamType(value?: JsonFragmentType | ParamType): value is ParamType {
    return Boolean((value as ParamTypeProps)?.isParamType);
  }
}
