import { ArrayType } from '../abi/types/ArrayType';
import { B256Type } from '../abi/types/B256Type';
import { B512Type } from '../abi/types/B512Type';
import { BoolType } from '../abi/types/BoolType';
import { EnumType } from '../abi/types/EnumType';
import { GenericType } from '../abi/types/GenericType';
import { OptionType } from '../abi/types/OptionType';
import { RawUntypedPtr } from '../abi/types/RawUntypedPtr';
import { StrType } from '../abi/types/StrType';
import { StructType } from '../abi/types/StructType';
import { TupleType } from '../abi/types/TupleType';
import { U16Type } from '../abi/types/U16Type';
import { U32Type } from '../abi/types/U32Type';
import { U64Type } from '../abi/types/U64Type';
import { U8Type } from '../abi/types/U8Type';
import { VectorType } from '../abi/types/VectorType';

export const supportedTypes = [
  ArrayType,
  B256Type,
  B512Type,
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
