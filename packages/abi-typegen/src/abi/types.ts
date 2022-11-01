import type { IAbiTypeRoot } from './interfaces/IAbiType';
import type { IType } from './interfaces/IType';
import { ArrayType } from './types/ArrayType';
import { B256Type } from './types/B256Type';
import { BoolType } from './types/BoolType';
import { EnumType } from './types/EnumType';
import { GenericType } from './types/GenericType';
import { StrType } from './types/StrType';
import { StructType } from './types/StructType';
import { TupleType } from './types/TupleType';
import { U16Type } from './types/U16Type';
import { U32Type } from './types/U32Type';
import { U64Type } from './types/U64Type';
import { U8Type } from './types/U8Type';
import { VectorType } from './types/VectorType';

export function shouldSkipAbiType(params: { rawAbiType: IAbiTypeRoot }) {
  const ignoreList = ['()', 'struct RawVec'];
  const shouldSkip = ignoreList.indexOf(params.rawAbiType.type) >= 0;
  return shouldSkip;
}

export function makeType(params: { rawAbiType: IAbiTypeRoot }) {
  const { rawAbiType } = params;
  const { type } = rawAbiType;

  const allTypeClasses = [
    U8Type,
    U16Type,
    U32Type,
    U64Type,
    StrType,
    BoolType,
    B256Type,
    EnumType,
    TupleType,
    ArrayType,
    StructType,
    VectorType,
    GenericType,
  ];

  const TypeClass = allTypeClasses.find((tc) => tc.isSuitableFor(params));

  if (!TypeClass) {
    throw new Error(`Type not found: ${type}`);
  }

  return new TypeClass(params);
}

export function parseTypes(params: { rawAbiTypes: IAbiTypeRoot[] }) {
  const types: IType[] = [];

  // First we parse all ROOT nodes
  params.rawAbiTypes.forEach((rawAbiType) => {
    const skip = shouldSkipAbiType({ rawAbiType });
    if (!skip) {
      const parsedType = makeType({ rawAbiType });
      types.push(parsedType);
    }
  });

  // Then we parse all their components' [attributes]
  types.forEach((type) => {
    type.parseComponentsAttributes({ types });
  });

  return types;
}
