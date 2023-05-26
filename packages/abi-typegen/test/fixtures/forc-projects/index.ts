import { getForcProject } from '@fuel-ts/utils/test';
import { join } from 'path';

import type { IRawAbi } from '../../../src/index';

export enum ForcProjectsEnum {
  ARRAY_OF_ENUMS = 'array-of-enums',
  ARRAY_WITH_GENERICS = 'array-with-generics',
  ENUM_OF_ENUMS = 'enum-of-enums',
  ENUM_OF_STRUCTS = 'enum-of-structs',
  ENUM_SIMPLE = 'enum-simple',
  ENUM_SIMPLE_NATIVE = 'enum-simple-native',
  FN_VOID = 'fn-void',
  FULL = 'full',
  MINIMAL = 'minimal',
  OPTION_SIMPLE = 'option-simple',
  PREDICATE = 'predicate',
  SCRIPT = 'script',
  STRUCT_NESTED = 'struct-nested',
  STRUCT_SIMPLE = 'struct-simple',
  STRUCT_WITH_ARRAY = 'struct-with-array',
  TUPLE_SIMPLE = 'tuple-simple',
  VECTOR_SIMPLE = 'vector-simple',
}

export const getProjectResources = (project: ForcProjectsEnum) =>
  getForcProject<IRawAbi>(join(__dirname, project));
