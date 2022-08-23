/**
 * Types for Fuel JSON ABI Format as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#json-abi-format
 */

import { genericRegEx } from './abi-coder';

export interface JsonAbiFragmentType {
  readonly type: string;
  readonly name?: string;
  // TODO: Remove `null` when forc doesn't output nulls (https://github.com/FuelLabs/sway/issues/926)
  readonly components?: ReadonlyArray<JsonAbiFragmentType> | null;
  readonly typeArguments?: ReadonlyArray<JsonAbiFragmentType> | null;
}

export interface JsonAbiFragment {
  readonly type:
    | 'function'
    // We actually shouldn't accept string here, but when importing a JSON file
    // TS types string literals as strings so we have to.
    // TODO: Remove when TS issue is resolved: https://github.com/microsoft/TypeScript/issues/32063
    | string;
  readonly name: string;
  readonly inputs?: ReadonlyArray<JsonAbiFragmentType>;
  readonly outputs?: ReadonlyArray<JsonAbiFragmentType>;
}

export interface JsonFlatAbiFragmentType {
  readonly typeId: number;
  readonly type: string;
  readonly name?: string;
  readonly components?: ReadonlyArray<JsonFlatAbiFragmentArgumentType> | null;
  readonly typeParameters?: ReadonlyArray<number> | null;
}

export interface JsonFlatAbiFragmentArgumentType {
  readonly type: number;
  readonly name?: string;
  readonly typeArguments?: ReadonlyArray<JsonFlatAbiFragmentArgumentType> | null;
}

export interface JsonFlatAbiFragmentFunction {
  readonly name: string;
  readonly inputs?: ReadonlyArray<JsonFlatAbiFragmentArgumentType>;
  readonly output?: Readonly<JsonFlatAbiFragmentArgumentType>;
}

export interface JsonFlatAbi {
  readonly types: ReadonlyArray<JsonFlatAbiFragmentType>;
  readonly functions: ReadonlyArray<JsonFlatAbiFragmentFunction>;
}

/**
 * A JSON ABI object
 */
export type JsonAbi = ReadonlyArray<JsonAbiFragment> | JsonFlatAbi;

export class ABI {
  readonly types: ReadonlyArray<JsonFlatAbiFragmentType>;
  readonly functions: ReadonlyArray<JsonFlatAbiFragmentFunction>;

  constructor(jsonAbi: JsonFlatAbi) {
    this.types = jsonAbi.types;
    this.functions = jsonAbi.functions;
  }

  parseInput(
    input: JsonFlatAbiFragmentArgumentType,
    typeArgumentsList: Map<number, JsonAbiFragmentType> = new Map()
  ): JsonAbiFragmentType {
    const type = this.types[input.type];
    let components;
    let typeArguments: Array<JsonAbiFragmentType> | undefined;

    if (!type) {
      throw new Error(`${input.type} not found`);
    }

    if (Array.isArray(input.typeArguments)) {
      typeArguments = input.typeArguments.map((ta) => this.parseInput(ta, typeArgumentsList));
    }

    if (Array.isArray(type.typeParameters) && Array.isArray(typeArguments)) {
      type.typeParameters.forEach((tp, index) => {
        if (typeArguments?.[index]) {
          typeArgumentsList.set(tp, typeArguments[index]);
        }
      });
    }

    if (Array.isArray(type.components)) {
      components = type.components.map((c) => this.parseInput(c, typeArgumentsList));
    }

    if (genericRegEx.test(type.type)) {
      const typeInput = typeArgumentsList.get(type.typeId);
      if (typeInput) {
        return {
          ...typeInput,
          name: input.name,
        };
      }
    }

    return {
      type: type.type,
      name: input.name,
      typeArguments,
      components,
    };
  }

  static unflatten(jsonAbi: JsonAbi) {
    if (Array.isArray(jsonAbi)) {
      return jsonAbi as ReadonlyArray<JsonAbiFragment>;
    }
    const abi = new ABI(jsonAbi as JsonFlatAbi);
    return abi.unflatten();
  }

  unflatten(): ReadonlyArray<JsonAbiFragment> {
    return this.functions.map((functionType) => ({
      type: 'function',
      name: functionType.name,
      inputs: (functionType.inputs || []).map((i) => this.parseInput(i)),
      outputs: functionType.output ? [this.parseInput(functionType.output)] : [],
    }));
  }
}

/**
 * Checks if a given type is a reference type
 * See: https://github.com/FuelLabs/sway/issues/1368
 */
export const isReferenceType = (type: string) => {
  switch (type) {
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
    case 'bool': {
      return false;
    }
    default: {
      return true;
    }
  }
};
