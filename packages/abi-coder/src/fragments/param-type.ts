import { Logger } from '@ethersproject/logger';
import { defineReadOnly } from '@ethersproject/properties';

import { arrayRegEx, enumRegEx, structRegEx } from '../abi-coder';

const version = 'abi/5.6.4';
export const abiLogger = new Logger(version);

export interface JsonFragmentType {
  readonly name?: string;
  readonly indexed?: boolean;
  readonly type: string;
  readonly components?: ReadonlyArray<JsonFragmentType>;
  readonly typeArguments?: ReadonlyArray<JsonFragmentType>;
}

const CONSTRUCTOR_GUARD = {};

function populate(object: ParamType, params: { type?: string } & ParamTypeProps) {
  Object.keys(params).forEach((key) => {
    const paramTypeKey = key as keyof ParamTypeProps;
    const value = params[paramTypeKey];

    defineReadOnly(object, paramTypeKey, value);
  });
}

const paramTypeArray = /^(.*)\[([0-9]*)\]$/;

export interface ParamTypeProps {
  // The local name of the parameter (of null if unbound)
  readonly name?: string;

  // The fully qualified type (e.g. "address", "tuple(address)", "uint256[3][]"
  readonly type: string;

  // The base type (e.g. "address", "tuple", "array")
  readonly baseType?: string;

  // Indexable Paramters ONLY (otherwise null)
  readonly indexed?: boolean;

  // Tuples ONLY: (otherwise null)
  //  - sub-components
  readonly components?: Array<ParamType>;

  // Tuples ONLY: (otherwise null)
  //  - sub-components
  readonly typeArguments?: Array<ParamType>;

  // Arrays ONLY: (otherwise null)
  //  - length of the array (-1 for dynamic length)
  //  - child type
  readonly arrayLength?: number;
  readonly arrayChildren?: ParamType;

  readonly isParamType?: boolean;
}

export class ParamType implements ParamTypeProps {
  readonly name?: string;
  readonly type!: string;
  readonly baseType?: string;
  readonly indexed?: boolean;
  readonly components?: Array<ParamType>;
  readonly typeArguments?: Array<ParamType>;
  readonly arrayLength?: number;
  readonly arrayChildren?: ParamType;
  readonly isParamType?: boolean;

  constructor(constructorGuard: typeof CONSTRUCTOR_GUARD, params: ParamTypeProps) {
    if (constructorGuard !== CONSTRUCTOR_GUARD) {
      abiLogger.throwError('use fromString', Logger.errors.UNSUPPORTED_OPERATION, {
        operation: 'new ParamType()',
      });
    }
    populate(this, params);

    const match = this.type.match(paramTypeArray);
    if (match && match[1]) {
      populate(this, {
        arrayLength: parseInt(match[2] || '-1', 10),
        arrayChildren: ParamType.fromObject({
          type: match[1],
          components: this.components,
          typeArguments: this.typeArguments,
        }),
        baseType: 'array',
        type: this.type,
      });
    } else {
      populate(this, {
        arrayLength: undefined,
        arrayChildren: undefined,
        baseType: this.components !== undefined ? 'tuple' : this.type,
        type: this.type,
      });
    }

    this.isParamType = true;

    Object.freeze(this);
  }

  getSignaturePrefix(): string {
    if (this.type) {
      const structMatch = structRegEx.exec(this.type)?.groups;
      if (structMatch) return 's';

      const arrayMatch = arrayRegEx.exec(this.type)?.groups;
      if (arrayMatch) return 'a';

      const enumMatch = enumRegEx.exec(this.type)?.groups;
      if (enumMatch) return 'e';
    }

    return '';
  }

  getSignatureContent(): string {
    const type = this.type || '';
    const arrayMatch = arrayRegEx.exec(type)?.groups;
    if (arrayMatch) {
      return `[${arrayMatch.item}; ${arrayMatch.length}]`;
    }

    if (this.baseType === 'array' && this.arrayChildren) {
      return `${this.arrayChildren.getSighashSignature()}[${
        this.arrayLength && this.arrayLength >= 0 ? String(this.arrayLength) : ''
      }]`;
    }

    if (this.baseType === 'tuple' && this.components) {
      const typeArgumentsSignature = this.typeArguments
        ? `<${this.typeArguments.map((typeArg) => typeArg.getSighashSignature()).join(',')}>`
        : '';
      const componentsSignature = `(${this.components
        .map((comp) => comp.getSighashSignature())
        .join(',')})`;

      return `${typeArgumentsSignature}${componentsSignature}`;
    }

    return type;
  }

  getSighashSignature(): string {
    const prefix = this.getSignaturePrefix();
    const content = this.getSignatureContent();

    return `${prefix}${content}`;
  }

  static fromObject(value: JsonFragmentType | ParamTypeProps): ParamType {
    if (ParamType.isParamType(value)) {
      return value;
    }

    return new ParamType(CONSTRUCTOR_GUARD, {
      name: value.name,
      type: value.type,
      indexed: value.indexed !== undefined ? Boolean(value.indexed) : undefined,
      components: value.components ? value.components.map(ParamType.fromObject) : undefined,
      typeArguments: value.typeArguments
        ? value.typeArguments.map(ParamType.fromObject)
        : undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isParamType(value?: any): value is ParamType {
    return !!(value != null && value.isParamType);
  }
}
