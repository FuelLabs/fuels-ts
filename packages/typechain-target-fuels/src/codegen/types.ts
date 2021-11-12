/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { AbiOutputParameter, AbiParameter } from '../parser/abiParser';
import type { SvmOutputType, SvmType, TupleType } from '../parser/parseSvmTypes';

import { STRUCT_POSTFIX } from './reserved-keywords';

interface GenerateTypeOptions {
  returnResultObject?: boolean;
  useStructs?: boolean; // uses struct type for first depth, if false then generates first depth tuple types
}

export function generateInputTypes(
  input: Array<AbiParameter>,
  options: GenerateTypeOptions
): string {
  if (input.length === 0) {
    return '';
  }

  return `${input
    .map(
      (input, index) => `${input.name || `arg${index}`}: ${generateInputType(input.type, options)}`
    )
    .join(', ')}, `;
}

// https://docs.ethers.io/ethers.js/html/api-contract.html#types
export function generateInputType(svmType: SvmType, options: GenerateTypeOptions = {}): string {
  switch (svmType.type) {
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
      return 'BigNumberish';
    case 'b256':
    case 'address':
      return 'string';
    case 'byte':
      return 'BytesLike';
    case 'array':
      return `[${Array(svmType.size).fill(generateInputType(svmType.itemType)).join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      if (svmType.structName && options.useStructs) {
        return `${svmType.structName}${STRUCT_POSTFIX}`;
      }
      return generateTupleType(svmType, (svmType) =>
        generateInputType(svmType, { ...options, useStructs: true })
      );
    case 'unknown':
      return 'any';
    default:
      return 'any';
  }
}

export function generateOutputType(svmType: SvmOutputType): string {
  switch (svmType.type) {
    case 'u8':
    case 'u16':
      return 'number';
    case 'u32':
    case 'u64':
      return 'BigNumber';
    case 'b256':
    case 'address':
      return 'string';
    case 'byte':
      return 'BytesLike';
    case 'array':
      return `[${Array(svmType.size).fill(generateOutputType(svmType.itemType)).join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      // TODO: Update when transaction outputs are finished
      return generateOutputComplexType(svmType.components);
    case 'unknown':
      return 'any';
    case 'void':
      return 'void';
    default:
      return 'any';
  }
}

export function generateTupleType(
  tuple: TupleType,
  generator: (svmType: SvmType) => string
): string {
  return `{${tuple.components
    .map((component) => `${component.name}: ${generator(component.type)}`)
    .join(',')}}`;
}

/**
 * Always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 * */
export function generateOutputComplexType(components: AbiOutputParameter[]): string {
  const existingOutputComponents = [
    generateOutputComplexTypeAsArray(components),
    generateOutputComplexTypesAsObject(components),
  ].filter(Boolean);
  return existingOutputComponents.join(' & ');
}

export function generateOutputComplexTypeAsArray(components: AbiOutputParameter[]): string {
  return `[${components.map((t) => generateOutputType(t.type)).join(', ')}]`;
}

export function generateOutputComplexTypesAsObject(
  components: AbiOutputParameter[]
): string | undefined {
  const namedElements = components.filter((e) => !!e.name);
  if (namedElements.length > 0) {
    return `{${namedElements.map((t) => `${t.name}: ${generateOutputType(t.type)}`).join(',')} }`;
  }
  return undefined;
}
