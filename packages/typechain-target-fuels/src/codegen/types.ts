/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { AbiOutputParameter, AbiParameter } from '../parser/abiParser';
import type {
  EnumType,
  StructType,
  SvmOutputType,
  SvmType,
  TupleType,
} from '../parser/parseSvmTypes';

interface GenerateTypeOptions {
  returnResultObject?: string;
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
    // If return result object exists them
    // return it instead of void
    if (options.returnResultObject) {
      return options.returnResultObject;
    }
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
      return `[${Array(svmType.size)
        .fill(generateInputType(svmType.itemType, { useStructs: true }))
        .join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      return generateTupleType(svmType, (svmType) =>
        generateInputType(svmType, { ...options, useStructs: true })
      );
    case 'enum':
      if (svmType.structName && options.useStructs) {
        return `${svmType.structName}Input`;
      }
      return generateEnumType(svmType, (svmType) =>
        generateInputType(svmType, { ...options, useStructs: true })
      );
    case 'struct':
      if (svmType.structName && options.useStructs) {
        return `${svmType.structName}Input`;
      }
      return generateStructType(svmType, (svmType) =>
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
  if (options.returnResultObject) {
    return options.returnResultObject;
  }

  switch (svmType.type) {
    case 'u8':
    case 'u16':
      return 'number';
    case 'u32':
    case 'u64':
      return 'bigint';
    case 'b256':
    case 'address':
      return 'string';
    case 'byte':
      return 'BytesLike';
    case 'array':
      return `[${Array(svmType.size)
        .fill(generateOutputType(svmType.itemType, { useStructs: true }))
        .join(', ')}]`;
    case 'bool':
      return 'boolean';
    case 'string':
      return 'string';
    case 'tuple':
      return generateTupleType(svmType, (svmType) =>
        generateOutputType(svmType, { ...options, useStructs: true })
      );
    case 'enum':
      if (svmType.structName && options.useStructs) {
        return `${svmType.structName}Output`;
      }
      return generateEnumType(svmType, (svmType) =>
        generateOutputType(svmType, { ...options, useStructs: true })
      );
    case 'struct':
      if (svmType.structName && options.useStructs) {
        return `${svmType.structName}Output`;
      }
      return generateStructType(svmType, (svmType) =>
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

export function generateTupleType(
  tuple: TupleType,
  generator: (svmType: SvmType) => string
): string {
  return `[${tuple.components.map((component) => generator(component.type)).join(', ')}]`;
}

export function generateStructType(
  struct: StructType,
  generator: (svmType: SvmType) => string
): string {
  return `{${struct.components
    .map((component) => `${component.name}: ${generator(component.type)}`)
    .join(', ')}}`;
}

export function generateEnumType(_enum: EnumType, generator: (svmType: SvmType) => string): string {
  return `Partial<{${_enum.components
    .map((component) => `${component.name}: ${generator(component.type)}`)
    .join(', ')}}>`;
}
