export const stringRegEx = /str\[(?<length>[0-9]+)\]/;
export const arrayRegEx = /\[(?<item>[\w\s]+);\s*(?<length>[0-9]+)\]/;
export const structRegEx = /^struct (?<name>\w+)$/;
export const enumRegEx = /^enum (?<name>\w+)$/;
export const tupleRegEx = /^\((?<items>.*)\)$/;

export declare type SvmType =
  | BoolType
  | U8intType
  | U16intType
  | U32intType
  | U64intType
  | ByteType
  | B256Type
  | AddressType
  | StringType
  | ArrayType
  | TupleType
  | EnumType
  | StructType
  | UnknownType;

export type DatumType = StructType | EnumType | TupleType;
/**
 * Like SvmType but with void
 */
export declare type SvmOutputType = SvmType | VoidType;

export declare type BoolType = {
  type: 'bool';
  originalType: string;
};
export declare type U8intType = {
  type: 'u8';
  bits: 8;
  originalType: string;
};
export declare type U16intType = {
  type: 'u16';
  bits: 16;
  originalType: string;
};
export declare type U32intType = {
  type: 'u32';
  bits: 32;
  originalType: string;
};
export declare type U64intType = {
  type: 'u64';
  bits: 64;
  originalType: string;
};
export declare type ByteType = {
  type: 'byte';
  size: 1;
  originalType: string;
};
export declare type B256Type = {
  type: 'b256';
  originalType: string;
};
export declare type AddressType = {
  type: 'address';
  originalType: string;
};
export declare type StringType = {
  type: 'string';
  size: number;
  originalType: string;
};
export declare type ArrayType = {
  type: 'array';
  itemType: SvmType;
  size?: number;
  originalType: string;
};
export declare type TupleType = {
  type: 'tuple';
  structName: string;
  components: SvmSymbol[];
  originalType: string;
};
export declare type EnumType = {
  type: 'enum';
  structName: string;
  components: SvmSymbol[];
  originalType: string;
};
export declare type StructType = {
  type: 'struct';
  structName: string;
  components: SvmSymbol[];
  originalType: string;
};

export declare type UnknownType = {
  type: 'unknown';
  originalType: string;
};

export declare type VoidType = {
  type: 'void';
};

export declare type SvmSymbol = {
  type: SvmType;
  name: string;
};

/**
 * Converts valid file names to valid javascript symbols and does best effort to make them readable.
 * Example: ds-token.test becomes DsTokenTest
 */
export function normalizeName(rawName: string): string {
  const transformations: ((s: string) => string)[] = [
    (s) => s.replace(/\s+/g, '-'), // spaces to - so later we can automatically convert them
    (s) => s.replace(/\./g, '-'), // replace "."
    (s) => s.replace(/_/g, '-'), // replace "_"
    (s) => s.replace(/-[a-z]/g, (match) => match.substr(-1).toUpperCase()), // delete '-' and capitalize the letter after them
    (s) => s.replace(/-/g, ''), // delete any '-' left
    (s) => s.replace(/^\d+/, ''), // removes leading digits
    (s) => s.charAt(0).toUpperCase() + s.slice(1),
  ];

  const finalName = transformations.reduce((s, t) => t(s), rawName);

  if (finalName === '') {
    throw new Error(`Can't guess class name, please rename file: ${rawName}`);
  }

  return finalName;
}

/**
 * Parses the SvmType from the JSON ABI; recusively on non-primatives
 */
export function parseSvmType(rawType: string, components?: SvmSymbol[], name?: string): SvmType {
  const stringMatch = rawType.match(stringRegEx);
  if (stringMatch !== null) {
    const length = stringMatch[1];

    return {
      type: 'string',
      size: parseInt(length, 10),
      originalType: rawType,
    };
  }

  const arrayMatch = rawType.match(arrayRegEx);
  if (arrayMatch !== null) {
    const type = arrayMatch[1];
    const length = arrayMatch[2];
    return {
      type: 'array',
      itemType: parseSvmType(type, components),
      size: parseInt(length, 10),
      originalType: rawType,
    };
  }

  // If type starts with struct/enum we can treat it as tuple.
  // In this way, the parser can process all components from the struct.
  const structMatch = structRegEx.exec(rawType)?.groups;
  if (structMatch) {
    if (!components) throw new Error(`${rawType} specified without components!`);
    return {
      type: 'struct',
      components,
      originalType: rawType,
      structName: structMatch.name,
    };
  }

  const enumMatch = enumRegEx.exec(rawType)?.groups;
  if (enumMatch) {
    if (!components) throw new Error(`${rawType} specified without components!`);
    return {
      type: 'enum',
      components,
      originalType: rawType,
      structName: enumMatch.name,
    };
  }

  const tupleMatch = tupleRegEx.exec(rawType)?.groups;
  if (tupleMatch) {
    if (!components) throw new Error(`${rawType} specified without components!`);
    return {
      type: 'tuple',
      components,
      originalType: rawType,
      structName: normalizeName(name || ''),
    };
  }

  switch (rawType) {
    case 'u8':
      return { type: 'u8', bits: 8, originalType: rawType };
    case 'u16':
      return { type: 'u16', bits: 16, originalType: rawType };
    case 'u32':
      return { type: 'u32', bits: 32, originalType: rawType };
    case 'u64':
      return { type: 'u64', bits: 64, originalType: rawType };
    case 'bool':
      return { type: 'bool', originalType: rawType };
    case 'address':
      return { type: 'address', originalType: rawType };
    case 'b256':
      return { type: 'b256', originalType: rawType };
    case 'byte':
      return { type: 'byte', size: 1, originalType: rawType };
    default:
  }

  return { type: 'unknown', originalType: rawType };
}
