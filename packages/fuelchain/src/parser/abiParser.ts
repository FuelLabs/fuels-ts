/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { keccak_256 } from 'js-sha3';
import { groupBy, omit } from 'lodash';
import { parse as parsePath } from 'path';
import type { Dictionary } from 'ts-essentials';

import { debug } from '../utils/debug';
import { MalformedAbiError } from '../utils/errors';
import { normalizeSlashes } from '../utils/files';

import { normalizeName } from './normalizeName';
import type { EvmOutputType, EvmType, StructType } from './parseEvmType';
import { parseEvmType } from './parseEvmType';

export interface AbiParameter {
  name: string; // @todo name should be normalized to undefined if empty string
  type: EvmType;
}

export interface AbiOutputParameter {
  name: string; // @todo name should be normalized to undefined if empty string
  type: EvmOutputType;
}

export type Named<T> = {
  name: string;
  values: T;
};

export type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable';

export interface FunctionDocumentation {
  author?: string;
  details?: string;
  notice?: string;
  params?: {
    [paramName: string]: string;
  };
  return?: string;
}

export interface FunctionDeclaration {
  name: string;
  stateMutability: StateMutability;
  inputs: AbiParameter[];
  outputs: AbiOutputParameter[];
  documentation?: FunctionDocumentation | undefined;
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
  path: string[];

  fallback?: FunctionWithoutInputDeclaration | undefined;
  constructor: FunctionWithoutOutputDeclaration[];
  functions: Dictionary<FunctionDeclaration[]>;
  events: Dictionary<EventDeclaration[]>;
  structs: Dictionary<StructType[]>;
  documentation?:
    | {
        author?: string;
        details?: string;
        notice?: string;
      }
    | undefined;
}

export interface RawAbiParameter {
  name: string;
  type: string;
  internalType?: string;
  components?: RawAbiParameter[];
}

export interface RawAbiDefinition {
  name: string;
  constant: boolean;
  payable: boolean;
  stateMutability?: StateMutability; // for older ABIs this will be undefined
  inputs: RawAbiParameter[];
  outputs: RawAbiParameter[];
  type: string;
}

export interface EventDeclaration {
  name: string;
  isAnonymous: boolean;
  inputs: EventArgDeclaration[];
}

export interface EventArgDeclaration {
  isIndexed: boolean;
  name?: string | undefined; // undefined if original name was empty
  type: EvmType;
}

export interface RawEventAbiDefinition {
  type: 'event';
  anonymous?: boolean;
  name: string;
  inputs: RawEventArgAbiDefinition[];
}

export interface RawEventArgAbiDefinition {
  indexed: boolean;
  name: string;
  type: string;
}

export interface BytecodeLinkReference {
  reference: string;
  name?: string;
}

export interface BytecodeWithLinkReferences {
  bytecode: string;
  linkReferences?: BytecodeLinkReference[];
}

// This is the combined interface for devdocs and userdocs
// See https://solidity.readthedocs.io/en/v0.5.12/natspec-format.html#documentation-output
export interface DocumentationResult {
  author?: string;
  details?: string;
  notice?: string;
  title?: string;
  methods?: {
    [methodName: string]: FunctionDocumentation;
  };
}

export function parseContractPath(path: string) {
  const parsedPath = parsePath(normalizeSlashes(path));

  return {
    name: normalizeName(parsedPath.name),
    rawName: parsedPath.name,
    path: parsedPath.dir.split('/').filter((x) => x),
  };
}

export function parse(
  abi: RawAbiDefinition[],
  path: string,
  documentation?: DocumentationResult
): Contract {
  const constructors: FunctionWithoutOutputDeclaration[] = [];
  let fallback: FunctionWithoutInputDeclaration | undefined;
  const functions: FunctionDeclaration[] = [];
  const events: EventDeclaration[] = [];

  const structs: StructType[] = [];
  function registerStruct(newStruct: StructType) {
    // ignore registration if structName not present
    if (newStruct.structName === undefined) return;
    // if struct array (recursive) then keep going deep until we reach the struct tuple
    while (newStruct.type === 'array') {
      newStruct = newStruct.itemType as StructType;
    }
    // only register if not already registered
    const newStructName = newStruct.structName?.toString();
    if (!structs.find((s) => s.structName?.toString() === newStructName)) {
      structs.push(newStruct);
    }
  }

  abi.forEach((abiPiece) => {
    if (abiPiece.type === 'fallback') {
      if (fallback) {
        throw new Error(
          `Fallback function can't be defined more than once! ${JSON.stringify(
            abiPiece
          )} Previously defined: ${JSON.stringify(fallback)}`
        );
      }
      fallback = parseFallback(abiPiece, registerStruct);
      return;
    }

    if (abiPiece.type === 'constructor') {
      constructors.push(parseConstructor(abiPiece, registerStruct));
      return;
    }

    if (abiPiece.type === 'function') {
      functions.push(parseFunctionDeclaration(abiPiece, registerStruct, documentation));
      return;
    }

    if (abiPiece.type === 'event') {
      const eventAbi = abiPiece as any as RawEventAbiDefinition;

      events.push(parseEvent(eventAbi, registerStruct));
      return;
    }

    debug(`Unrecognized abi element: ${abiPiece.type}`);
  });

  return {
    ...parseContractPath(path),
    fallback,
    constructor: constructors,
    functions: groupBy(functions, (f) => f.name),
    events: groupBy(events, (e) => e.name),
    structs: groupBy(structs, (e) => e.structName && e.structName.toString()),
    documentation: documentation ? omit(documentation, ['methods']) : undefined,
  };
}

function parseOutputs(
  registerStruct: (struct: StructType) => void,
  outputs?: Array<RawAbiParameter>
): AbiOutputParameter[] {
  if (!outputs || outputs.length === 0) {
    return [{ name: '', type: { type: 'void' } }];
  }
  return outputs.map(parseRawAbiParameter.bind(null, registerStruct));
}

export function parseEvent(
  abiPiece: RawEventAbiDefinition,
  registerStruct: (struct: StructType) => void
): EventDeclaration {
  debug(`Parsing event "${abiPiece.name}"`);

  return {
    name: abiPiece.name,
    isAnonymous: abiPiece.anonymous ?? false,
    inputs: abiPiece.inputs.map(parseRawEventArg.bind(null, registerStruct)),
  };
}

function parseRawEventArg(
  registerStruct: (struct: StructType) => void,
  eventArg: RawEventArgAbiDefinition
): EventArgDeclaration {
  return {
    name: parseEmptyAsUndefined(eventArg.name),
    isIndexed: eventArg.indexed,
    type: parseRawAbiParameterType(eventArg, registerStruct),
  };
}

function parseEmptyAsUndefined(smt: string | undefined) {
  if (smt === '') {
    return undefined;
  }
  return smt;
}

// if stateMutability is not available we will use old spec containing constant and payable
function findStateMutability(abiPiece: RawAbiDefinition): StateMutability {
  if (abiPiece.stateMutability) {
    return abiPiece.stateMutability;
  }

  if (abiPiece.constant) {
    return 'view';
  }
  return abiPiece.payable ? 'payable' : 'nonpayable';
}

export function getFunctionDocumentation(
  abiPiece: RawAbiDefinition,
  documentation?: DocumentationResult
): FunctionDocumentation | undefined {
  const docKey = `${abiPiece.name}(${abiPiece.inputs.map(({ type }) => type).join(',')})`;
  return documentation && documentation.methods && documentation.methods[docKey];
}

function parseConstructor(
  abiPiece: RawAbiDefinition,
  registerStruct: (struct: StructType) => void
): FunctionWithoutOutputDeclaration {
  debug(`Parsing constructor declaration`);
  return {
    name: 'constructor',
    inputs: abiPiece.inputs.map(parseRawAbiParameter.bind(null, registerStruct)),
    outputs: [],
    stateMutability: findStateMutability(abiPiece),
  };
}

function parseFallback(
  abiPiece: RawAbiDefinition,
  registerStruct: (struct: StructType) => void
): FunctionWithoutInputDeclaration {
  debug(`Parsing fallback declaration`);

  return {
    name: 'fallback',
    inputs: [],
    outputs: parseOutputs(registerStruct, abiPiece.outputs),
    stateMutability: findStateMutability(abiPiece),
  };
}

function parseFunctionDeclaration(
  abiPiece: RawAbiDefinition,
  registerStruct: (struct: StructType) => void,
  documentation?: DocumentationResult
): FunctionDeclaration {
  debug(`Parsing function declaration "${abiPiece.name}"`);
  return {
    name: abiPiece.name,
    inputs: abiPiece.inputs.map(parseRawAbiParameter.bind(null, registerStruct)),
    outputs: parseOutputs(registerStruct, abiPiece.outputs),
    stateMutability: findStateMutability(abiPiece),
    documentation: getFunctionDocumentation(abiPiece, documentation),
  };
}

function parseRawAbiParameter(
  registerStruct: (struct: StructType) => void,
  rawAbiParameter: RawAbiParameter
): AbiParameter {
  return {
    name: rawAbiParameter.name,
    type: parseRawAbiParameterType(rawAbiParameter, registerStruct),
  };
}

const isStructType = (evmType: EvmType): evmType is StructType =>
  evmType.type === 'array' || evmType.type === 'tuple';

function parseRawAbiParameterType(
  rawAbiParameter: RawAbiParameter,
  registerStruct: (struct: StructType) => void
): EvmType {
  const components =
    rawAbiParameter.components &&
    rawAbiParameter.components.map((component) => ({
      name: component.name,
      type: parseRawAbiParameterType(component, registerStruct),
    }));

  const parsed = parseEvmType(rawAbiParameter.type, components, rawAbiParameter.internalType);
  if (isStructType(parsed)) {
    if (
      'size' in parsed &&
      (parsed as any).size > 1 &&
      isStructType(parsed.itemType) &&
      parsed.structName
    ) {
      // We unwrap constant size struct arrays like `Item[4]` into `Item`.
      registerStruct({
        ...parsed.itemType,
        structName: parsed.structName.merge({
          identifier: parsed.structName.identifier.replace(new RegExp(`\\[${parsed.size}\\]$`), ''),
        }),
      });
    } else {
      registerStruct(parsed);
    }
  }
  return parsed;
}

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

export function extractBytecode(rawContents: string): BytecodeWithLinkReferences | undefined {
  // When there are some unlinked libraries, the compiler replaces their addresses in calls with
  // "link references". There are many different kinds of those, depending on compiler version and usage.
  // Examples:
  // * `__TestLibrary___________________________`
  //   (truffle with solc 0.4.x?, just the contract name)
  // * `__./ContractWithLibrary.sol:TestLibrar__`
  //   (solc 0.4.x, `${fileName}:${contractName}` truncated at 36 chars)
  // * `__$8809803722eff063c8527a84f57d60014e$__`
  //   (solc 0.5.x, ``solidityKeccak256(['string'], [`${fileName}:${contractName}`])``, truncated )
  const bytecodeRegex = /^(0x)?(([0-9a-fA-F][0-9a-fA-F])|(__[a-zA-Z0-9/\\:_$.-]{36}__))+$/;
  // First try to see if this is a .bin file with just the bytecode, otherwise a json
  if (rawContents.match(bytecodeRegex)) return extractLinkReferences(rawContents);

  let json;
  try {
    json = JSON.parse(rawContents);
  } catch {
    return undefined;
  }

  if (!json) return undefined;

  function tryMatchBytecode(obj: any | undefined): any | undefined {
    if (obj && obj.match instanceof Function) {
      return obj.match(bytecodeRegex);
    }
  }

  // `json.evm.bytecode` often has more information than `json.bytecode`, needs to be checked first
  if (tryMatchBytecode(json.evm?.bytecode?.object)) {
    return extractLinkReferences(json.evm.bytecode.object, json.evm.bytecode.linkReferences);
  }

  // handle json schema of @0x/sol-compiler
  if (tryMatchBytecode(json.compilerOutput?.evm?.bytecode?.object)) {
    return extractLinkReferences(
      json.compilerOutput.evm.bytecode.object,
      json.compilerOutput.evm.bytecode.linkReferences
    );
  }

  // handle json schema of @foundry/forge
  if (tryMatchBytecode(json.bytecode?.object)) {
    return extractLinkReferences(json.bytecode.object, json.bytecode.linkReferences);
  }

  if (tryMatchBytecode(json.bytecode)) {
    return extractLinkReferences(json.bytecode, json.linkReferences);
  }

  return undefined;
}

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

function extractLinkReferences(
  _bytecode: string,
  linkReferencesObj?: any
): BytecodeWithLinkReferences {
  const bytecode = ensure0xPrefix(_bytecode);
  // See comment in `extractBytecode` for explanation.
  const allLinkReferencesRegex = /__[a-zA-Z0-9/\\:_$.-]{36}__/g;
  const allReferences = bytecode.match(allLinkReferencesRegex);
  if (!allReferences) return { bytecode };

  const uniqueReferences = Array.from(new Set(allReferences));
  const refToNameMap = linkReferencesObj
    ? extractLinkReferenceContractNames(linkReferencesObj)
    : {};
  const linkReferences = uniqueReferences.map((reference) =>
    refToNameMap[reference] ? { reference, name: refToNameMap[reference] } : { reference }
  );

  return { bytecode, linkReferences };
}

// Returns mapping from link reference (bytecode fake address) to readable contract name
function extractLinkReferenceContractNames(linkReferences: any): Dictionary<string> {
  // `evm.bytecode.linkReferences` example:
  // {
  //   "ContractWithLibrary.sol": {
  //     "TestLibrary": [
  //       { "length": 20, "start": 151 },
  //       { "length": 20, "start": 177 },
  //     ],
  //   },
  // },
  const nameMap: Dictionary<string> = {};
  Object.keys(linkReferences).forEach((contractFile) =>
    Object.keys(linkReferences[contractFile]).forEach((contractName) => {
      const contractPath = `${contractFile}:${contractName}`;
      const contractRef = `__$${keccak_256(contractPath).slice(0, 34)}$__`;
      nameMap[contractRef] = contractPath;
    })
  );
  return nameMap;
}

export function ensure0xPrefix(hexString: string): string {
  if (hexString.startsWith('0x')) return hexString;
  return `0x${hexString}`;
}

export function isConstant(fn: FunctionDeclaration): boolean {
  return (
    (fn.stateMutability === 'pure' || fn.stateMutability === 'view') &&
    fn.inputs.length === 0 &&
    fn.outputs.length === 1
  );
}

export function isConstantFn(fn: FunctionDeclaration): boolean {
  return (fn.stateMutability === 'pure' || fn.stateMutability === 'view') && !isConstant(fn);
}
