import { Dictionary } from 'ts-essentials';
import { SvmOutputType, SvmType, parseSvmType } from './parseSvmTypes';
import { normalizeName } from 'typechain';

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
  params?: { [paramName: string]: string; };
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
  methods?: { [methodName: string]: FunctionDocumentation; };
}

function parseFunctionDeclaration(
  abiPiece: RawAbiDefinition,
  documentation?: DocumentationResult,
): FunctionDeclaration {
  return {
    name: abiPiece.name,
    inputs: abiPiece.inputs.map(parseRawAbiParameter),
    outputs: parseOutputs(abiPiece.outputs),
    documentation: getFunctionDocumentation(abiPiece, documentation)
  }
}

function parseRawAbiParameter(rawAbiParameter: RawAbiParameter): AbiParameter {
  return {
    name: rawAbiParameter.name,
    type: parseRawAbiParameterType(rawAbiParameter),
  }
}

function parseRawAbiParameterType(rawAbiParameter: RawAbiParameter): SvmType {
  const components =
    rawAbiParameter.components &&
    rawAbiParameter.components.map((component) => ({
      name: component.name,
      type: parseRawAbiParameterType(component),
    }))
  return parseSvmType(rawAbiParameter.type, components)
}

function parseOutputs(outputs?: Array<RawAbiParameter>): AbiOutputParameter[] {
  if (!outputs || outputs.length === 0) {
    return [{ name: '', type: { type: 'void' } }]
  } else {
    return outputs.map(parseRawAbiParameter)
  }
}
export function parse(abi: RawAbiDefinition[], rawName: string, documentation?: DocumentationResult): Contract {
  const functions: FunctionDeclaration[] = []

  abi.forEach((abiPiece) => {
    if (abiPiece.type === 'function') {
      functions.push(parseFunctionDeclaration(abiPiece, documentation))
      return
    }
  })

  const functionGroup = functions.reduce((memo, value)=> {
    if(memo[value.name]) {
      memo[value.name].push(value)
    } else {
      memo[value.name] = [value]
    }
    return memo
  }, {} as Dictionary<FunctionDeclaration[]>)

  return {
    name: normalizeName(rawName),
    rawName,
    functions: functionGroup
  }
}
export function getFunctionDocumentation(
  abiPiece: RawAbiDefinition,
  documentation?: DocumentationResult,
): FunctionDocumentation | undefined {
  const docKey = `${abiPiece.name}(${abiPiece.inputs.map(({ type }) => type).join(',')})`
  return documentation && documentation.methods && documentation.methods[docKey]
}

class MalformedAbiError extends Error {}

export function extractAbi(rawJson: string): RawAbiDefinition[] {
  let json
  try {
    json = JSON.parse(rawJson)
  } catch {
    throw new MalformedAbiError('Not a json')
  }

  if (!json) {
    throw new MalformedAbiError('Not a json')
  }

  if (Array.isArray(json)) {
    return json
  }

  if (Array.isArray(json.abi)) {
    return json.abi
  } else if (json.compilerOutput && Array.isArray(json.compilerOutput.abi)) {
    return json.compilerOutput.abi
  }

  throw new MalformedAbiError('Not a valid ABI')
}


export function extractDocumentation(rawContents: string): DocumentationResult | undefined {
  let json
  try {
    json = JSON.parse(rawContents)
  } catch {
    return undefined
  }

  if (!json || (!json.devdoc && !json.userdoc)) return undefined

  const result: DocumentationResult = json.devdoc || {}

  // Merge devdoc and userdoc objects
  if (json.userdoc) {
    result.notice = json.userdoc.notice
    if (!json.userdoc.methods) return result
    result.methods = result.methods || {}
    Object.entries<{ notice: string }>(json.userdoc.methods).forEach(([key, { notice }]) => {
      if (result.methods) result.methods[key] = { ...result.methods[key], notice }
    })
  }
  return result
}