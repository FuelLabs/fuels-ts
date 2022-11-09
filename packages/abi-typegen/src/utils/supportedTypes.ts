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

export const supportedTypes = [
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
