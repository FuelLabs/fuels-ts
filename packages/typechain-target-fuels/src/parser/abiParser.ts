/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Dictionary } from 'ts-essentials';
import { normalizeName } from 'typechain';

import type { SvmOutputType, SvmType, TupleType } from './parseSvmTypes';
import { parseSvmType } from './parseSvmTypes';

export interface AbiParameter {
  name: string;
  type: SvmType;
}
export interface AbiOutputParameter {
  name: string;
  type: SvmOutputType;
}
export declare type Named<T> = {
  name: string;
  values: T;
};
export interface FunctionDocumentation {
  author?: string;
  details?: string;
  notice?: string;
  params?: { [paramName: string]: string };
  return?: string;
}
export interface FunctionDeclaration {
  name: string;
  inputs: AbiParameter[];
  outputs: AbiOutputParameter[];
  documentation?: FunctionDocumentation;
}
export interface FunctionWithoutOutputDeclaration extends FunctionDeclaration {
  outputs: [];
}
export interface FunctionWithoutInputDeclaration extends FunctionDeclaration {
  inputs: [];
}
export interface Contract {
  name: string;
  rawName: string;
  functions: Dictionary<FunctionDeclaration[]>;
  structs: Dictionary<TupleType[]>;
  documentation?: {
    author?: string;
    details?: string;
    notice?: string;
  };
}

export interface RawAbiParameter {
  name: string;
  type: string;
  components?: RawAbiParameter[];
}

export interface RawAbiDefinition {
  name: string;
  inputs: RawAbiParameter[];
  outputs: RawAbiParameter[];
  type: string;
}
export interface DocumentationResult {
  author?: string;
  details?: string;
  notice?: string;
  title?: string;
  methods?: { [methodName: string]: FunctionDocumentation };
}

/**
 * Parses the ABI function declaration
 */
function parseFunctionDeclaration(
  abiPiece: RawAbiDefinition,
  registerStruct: (struct: TupleType) => void,
  documentation?: DocumentationResult
): FunctionDeclaration {
  return {
    name: abiPiece.name,
    inputs: abiPiece.inputs.map((e) => parseRawAbiParameter(e, registerStruct)),
    outputs: parseOutputs(registerStruct, abiPiece.outputs),
    documentation: getFunctionDocumentation(abiPiece, documentation),
  };
}

/**
 * Parses the ABI parameters
 */
function parseRawAbiParameter(
  rawAbiParameter: RawAbiParameter,
  registerStruct: (struct: TupleType) => void
): AbiParameter {
  return {
    name: rawAbiParameter.name,
    type: parseRawAbiParameterType(rawAbiParameter, registerStruct),
  };
}

/**
 * Parses the ABI parameter types
 */
function parseRawAbiParameterType(
  rawAbiParameter: RawAbiParameter,
  registerStruct: (struct: TupleType) => void
): SvmType {
  const components =
    rawAbiParameter.components &&
    rawAbiParameter.components.map((component) => ({
      name: component.name,
      type: parseRawAbiParameterType(component, registerStruct),
    }));
  const parsed = parseSvmType(rawAbiParameter.type, components, rawAbiParameter.name);
  if (['tuple'].includes(parsed.type)) {
    registerStruct(parsed as TupleType);
  }
  return parsed;
}

/**
 * Parses the ABI function outputs
 */
function parseOutputs(
  registerStruct: (struct: TupleType) => void,
  outputs?: Array<RawAbiParameter>
): AbiOutputParameter[] {
  if (!outputs || outputs.length === 0) {
    return [{ name: '', type: { type: 'void' } }];
  }
  return outputs.map((e) => parseRawAbiParameter(e, registerStruct));
}
/**
 * Parses the JSON abi
 */
export function parse(
  abi: RawAbiDefinition[],
  rawName: string,
  documentation?: DocumentationResult
): Contract {
  const functions: FunctionDeclaration[] = [];

  const structs: TupleType[] = [];
  /**
   * Registers Structs used in the abi
   */
  function registerStruct(newStruct: TupleType): void {
    if (structs.findIndex((s) => s.structName === newStruct.structName) === -1) {
      structs.push(newStruct);
    }
  }

  abi.forEach((abiPiece) => {
    if (abiPiece.type === 'function') {
      functions.push(parseFunctionDeclaration(abiPiece, registerStruct, documentation));
    }
  });

  const functionGroup = functions.reduce((memo, value) => {
    if (memo[value.name]) {
      memo[value.name].push(value);
    } else {
      memo[value.name] = [value];
    }
    return memo;
  }, {} as Dictionary<FunctionDeclaration[]>);

  const structGroup = structs.reduce((memo, value) => {
    if (memo[value.structName]) {
      memo[value.structName].push(value);
    } else {
      memo[value.structName] = [value];
    }
    return memo;
  }, {} as Dictionary<TupleType[]>);

  return {
    name: normalizeName(rawName),
    rawName,
    functions: functionGroup,
    structs: structGroup,
  };
}

/**
 * Parses the ABI function documentation
 */
export function getFunctionDocumentation(
  abiPiece: RawAbiDefinition,
  documentation?: DocumentationResult
): FunctionDocumentation | undefined {
  const docKey = `${abiPiece.name}(${abiPiece.inputs.map(({ type }) => type).join(',')})`;
  return documentation && documentation.methods && documentation.methods[docKey];
}

class MalformedAbiError extends Error {}

/**
 * Extract JSON abi from raw json strings
 */
export function extractAbi(rawJson: string): RawAbiDefinition[] {
  let json;
  try {
    json = JSON.parse(rawJson);
  } catch {
    throw new MalformedAbiError('Not a json');
  }

  if (!json) {
    throw new MalformedAbiError('Not a json');
  }

  if (Array.isArray(json)) {
    return json;
  }

  if (Array.isArray(json.abi)) {
    return json.abi;
  }
  if (json.compilerOutput && Array.isArray(json.compilerOutput.abi)) {
    return json.compilerOutput.abi;
  }

  throw new MalformedAbiError('Not a valid ABI');
}
/**
 * Parses the ABI function function documentation to user docs
 */
export function extractDocumentation(rawContents: string): DocumentationResult | undefined {
  let json;
  try {
    json = JSON.parse(rawContents);
  } catch {
    return undefined;
  }

  if (!json || (!json.devdoc && !json.userdoc)) return undefined;

  const result: DocumentationResult = json.devdoc || {};

  // Merge devdoc and userdoc objects
  if (json.userdoc) {
    result.notice = json.userdoc.notice;
    if (!json.userdoc.methods) return result;
    result.methods = result.methods || {};
    Object.entries<{ notice: string }>(json.userdoc.methods).forEach(([key, { notice }]) => {
      if (result.methods) result.methods[key] = { ...result.methods[key], notice };
    });
  }
  return result;
}
