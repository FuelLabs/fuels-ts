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
  | UnknownType;
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
 * Converts valid file names to valid javascript symbols and does best effort to make them readable. Example: ds-token.test becomes DsTokenTest
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

export function parseSvmType(rawType: string, components?: SvmSymbol[], name?: string): SvmType {
  const lastChar = rawType[rawType.length - 1];

  if (lastChar === ']') {
    let finishArrayTypeIndex = rawType.length - 2;
    while (rawType[finishArrayTypeIndex] !== '[') {
      finishArrayTypeIndex -= 1;
    }

    const arraySizeRaw = rawType.slice(finishArrayTypeIndex + 1, rawType.length - 1);
    const arraySize = arraySizeRaw !== '' ? parseInt(arraySizeRaw, 10) : 0;
    const restOfTheType = rawType.slice(0, finishArrayTypeIndex);

    if (restOfTheType === 'str') {
      return {
        type: 'string',
        size: arraySize,
        originalType: rawType,
      };
    }
    return {
      type: 'array',
      itemType: parseSvmType(restOfTheType, components),
      size: arraySize,
      originalType: rawType,
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
    case 'tuple':
      if (!components) throw new Error('Tuple specified without components!');
      return {
        type: 'tuple',
        components,
        originalType: rawType,
        structName: normalizeName(name || ''),
      };
    default:
  }

  return { type: 'unknown', originalType: rawType };
}
