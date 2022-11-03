import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';
import { ArrayType } from '../types/ArrayType';
import { B256Type } from '../types/B256Type';
import { BoolType } from '../types/BoolType';
import { EnumType } from '../types/EnumType';
import { GenericType } from '../types/GenericType';
import { OptionType } from '../types/OptionType';
import { RawUntypedPtr } from '../types/RawUntypedPtr';
import { StrType } from '../types/StrType';
import { StructType } from '../types/StructType';
import { TupleType } from '../types/TupleType';
import { U16Type } from '../types/U16Type';
import { U32Type } from '../types/U32Type';
import { U64Type } from '../types/U64Type';
import { U8Type } from '../types/U8Type';
import { VectorType } from '../types/VectorType';

export function shouldSkipAbiType(params: { rawAbiType: IRawAbiTypeRoot }) {
  const ignoreList = ['()', 'struct RawVec'];
  const shouldSkip = ignoreList.indexOf(params.rawAbiType.type) >= 0;
  return shouldSkip;
}

export function makeType(params: { rawAbiType: IRawAbiTypeRoot }) {
  const { rawAbiType } = params;
  const { type } = rawAbiType;

  const allTypeClasses = [
    ArrayType,
    B256Type,
    BoolType,
    EnumType,
    GenericType,
    OptionType,
    RawUntypedPtr,
    StrType,
    StructType,
    TupleType,
    U16Type,
    U32Type,
    U64Type,
    U8Type,
    VectorType,
  ];

  const TypeClass = allTypeClasses.find((tc) => tc.isSuitableFor(params));

  if (!TypeClass) {
    throw new Error(`Type not found: ${type}`);
  }

  return new TypeClass(params);
}

export function parseTypes(params: { rawAbiTypes: IRawAbiTypeRoot[] }) {
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
