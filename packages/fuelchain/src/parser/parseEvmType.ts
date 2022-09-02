/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import { logger } from '../utils/logger';

import { normalizeName } from './normalizeName';

// represent all possible EvmTypes using TypeScript's discriminating union
export type EvmType =
  | BooleanType
  | IntegerType
  | UnsignedIntegerType
  | StringType
  | BytesType
  | DynamicBytesType
  | AddressType
  | ArrayType
  | TupleType
  | UnknownType;

/**
 * Like EvmType but with void
 */
export type EvmOutputType = EvmType | VoidType;

export type StructType = ArrayType | TupleType;

export type BooleanType = { type: 'boolean'; originalType: string };
export type IntegerType = { type: 'integer'; bits: number; originalType: string };
export type UnsignedIntegerType = { type: 'uinteger'; bits: number; originalType: string };
export type StringType = { type: 'string'; originalType: string };
export type BytesType = { type: 'bytes'; size: number; originalType: string };
export type DynamicBytesType = { type: 'dynamic-bytes'; originalType: string };
export type AddressType = { type: 'address'; originalType: string };
export type ArrayType = {
  type: 'array';
  itemType: EvmType;
  size?: number;
  originalType: string;
  structName?: StructName;
};
export type TupleType = {
  type: 'tuple';
  components: EvmSymbol[];
  originalType: string;
  structName?: StructName;
};

// used only for output types
export type VoidType = { type: 'void' };

// used when type cannot be detected
export type UnknownType = { type: 'unknown'; originalType: string };

export class StructName {
  public readonly identifier: string;
  public readonly namespace?: string;

  constructor(_identifier: string, _namespace?: string) {
    this.identifier = normalizeName(_identifier);
    if (_namespace) this.namespace = normalizeName(_namespace);
  }

  toString() {
    if (this.namespace) {
      return `${this.namespace}.${this.identifier}`;
    }
    return this.identifier;
  }

  merge(other: Partial<StructName>) {
    return new StructName(other.identifier || this.identifier, other.namespace || this.namespace);
  }
}

export type EvmSymbol = {
  type: EvmType;
  name: string;
};

const isUIntTypeRegex = /^uint([0-9]*)$/;
const isIntTypeRegex = /^int([0-9]*)$/;
const isBytesTypeRegex = /^bytes([0-9]+)$/;

export function parseEvmType(
  rawType: string,
  components?: EvmSymbol[],
  internalType?: string
): EvmType {
  const lastChar = rawType[rawType.length - 1];

  // first we parse array type
  if (lastChar === ']') {
    let finishArrayTypeIndex = rawType.length - 2;
    while (rawType[finishArrayTypeIndex] !== '[') {
      finishArrayTypeIndex--;
    }

    const arraySizeRaw = rawType.slice(finishArrayTypeIndex + 1, rawType.length - 1);
    const arraySize = arraySizeRaw !== '' ? parseInt(arraySizeRaw) : undefined;

    const restOfTheType = rawType.slice(0, finishArrayTypeIndex);

    const result: ArrayType = {
      type: 'array',
      itemType: parseEvmType(restOfTheType, components, internalType),
      originalType: rawType,
    };
    if (arraySize) result.size = arraySize;
    const structName = extractStructNameIfAvailable(internalType);
    if (structName) result.structName = structName;

    return result;
  }

  // otherwise this has to be primitive type

  // deal with simple to parse types
  switch (rawType) {
    case 'bool':
      return { type: 'boolean', originalType: rawType };
    case 'address':
      return { type: 'address', originalType: rawType };
    case 'string':
      return { type: 'string', originalType: rawType };
    case 'byte':
      return { type: 'bytes', size: 1, originalType: rawType };
    case 'bytes':
      return { type: 'dynamic-bytes', originalType: rawType };
    case 'tuple':
      if (!components) throw new Error('Tuple specified without components!');
      const result: TupleType = { type: 'tuple', components, originalType: rawType };
      const structName = extractStructNameIfAvailable(internalType);
      if (structName) result.structName = structName;
      return result;
  }

  if (isUIntTypeRegex.test(rawType)) {
    const match = isUIntTypeRegex.exec(rawType);
    return { type: 'uinteger', bits: parseInt(match![1] || '256'), originalType: rawType };
  }

  if (isIntTypeRegex.test(rawType)) {
    const match = isIntTypeRegex.exec(rawType);
    return { type: 'integer', bits: parseInt(match![1] || '256'), originalType: rawType };
  }

  if (isBytesTypeRegex.test(rawType)) {
    const match = isBytesTypeRegex.exec(rawType);
    return { type: 'bytes', size: parseInt(match![1] || '1'), originalType: rawType };
  }

  if (internalType?.startsWith('enum')) {
    return parseEvmType('uint8'); // this is a best effort approach. Sometimes enums can be uint16 too. Read more: https://github.com/ethereum-ts/TypeChain/pull/281#discussion_r513303099
  }

  if (internalType?.startsWith('contract')) {
    return { type: 'address', originalType: rawType };
  }

  // unknown type
  logger.warn(
    `Could not parse type: ${rawType} with internal type: ${internalType}.\n\nPlease submit a GitHub Issue to the TypeChain team with the failing contract/library.`
  );

  return { type: 'unknown', originalType: rawType };
}

/** @internal */
export function extractStructNameIfAvailable(
  internalType: string | undefined
): StructName | undefined {
  if (internalType?.startsWith('struct ')) {
    // get rid of "struct " in the beginning
    let nameStr = internalType.slice(7);

    // get rid of all array signs at the end
    const arrayMarker = nameStr.match(/((?:\[\d*\])+)$/)?.[1];
    if (arrayMarker) {
      nameStr = nameStr.slice(0, nameStr.length - arrayMarker.length);
    }

    if (nameStr.indexOf('.') !== -1) {
      const [namespace, identifier] = nameStr.split('.');
      return new StructName(identifier, namespace);
    }

    return new StructName(nameStr);
  }
}
