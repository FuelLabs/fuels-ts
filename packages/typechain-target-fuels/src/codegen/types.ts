/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { AbiOutputParameter, AbiParameter } from '../parser/abiParser';
import { normalizeName } from '../parser/parseSvmTypes';
import type { SvmOutputType, SvmType, TupleType } from '../parser/parseSvmTypes';

interface GenerateTypeOptions {
  returnResultObject?: boolean;
  useStructs?: boolean; // uses struct type for first depth, if false then generates first depth tuple types
}

/**
 * Generates the Typescript types for given function
 */
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

/**
 * Generates the Typescript types for given function
 */
export function generateOutputTypes(
  output: Array<AbiOutputParameter>,
  options: GenerateTypeOptions = {}
): string {
  if (output.length === 0) {
    return 'void';
  }

  const outputs = output.map((output) => generateOutputType(output.type, options));

  if (outputs.length > 1) {
    return `[${outputs.join(',')}]`;
  }

  return outputs[0];
}

/**
 * Maps Input SvmTypes to TS types
 * https://docs.ethers.io/ethers.js/html/api-contract.html#types
 */
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
        return `${svmType.structName}Input`;
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

/**
 * Maps Output SvmTypes to TS types
 * https://docs.ethers.io/ethers.js/html/api-contract.html#types
 */
export function generateOutputType(
  svmType: SvmOutputType,
  options: GenerateTypeOptions = {}
): string {
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
      if (svmType.structName && options.useStructs) {
        return svmType.structName;
      }
      return generateTupleType(svmType, (svmType) =>
        generateOutputType(svmType, { ...options, useStructs: true })
      );
    case 'unknown':
      return 'any';
    case 'void':
      return 'void';
    default:
      return 'any';
  }
}

/**
 * Maps Tuple SvmTypes to TS types
 * https://docs.ethers.io/ethers.js/html/api-contract.html#types
 */
export function generateTupleType(
  tuple: TupleType,
  generator: (svmType: SvmType) => string
): string {
  return `{${tuple.components
    .map((component) => `${component.name}: ${generator(component.type)}`)
    .join(', ')}}`;
}
