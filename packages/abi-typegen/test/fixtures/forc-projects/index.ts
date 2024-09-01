import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

import type { JsonAbiOld } from '../../../src';
import type { JsonAbi } from '../../../src/types/interfaces/JsonAbiNew';
import { transpileAbi } from '../../../src/utils/transpile-abi';

export enum AbiTypegenProjectsEnum {
  ARRAY_OF_ENUMS = 'array-of-enums',
  ARRAY_WITH_GENERICS = 'array-with-generics',
  BYTES = 'bytes',
  ENUM_OF_ENUMS = 'enum-of-enums',
  ENUM_OF_STRUCTS = 'enum-of-structs',
  ENUM_SIMPLE = 'enum-simple',
  ENUM_SIMPLE_NATIVE = 'enum-simple-native',
  EVM_ADDRESS = 'evm-address',
  FN_VOID = 'fn-void',
  FULL = 'full',
  MINIMAL = 'minimal',
  MINIMAL_WITH_CONFIGURABLE = 'minimal-with-configurable',
  OPTION_SIMPLE = 'option-simple',
  PREDICATE = 'predicate',
  PREDICATE_WITH_CONFIGURABLE = 'predicate-with-configurable',
  RAW_SLICE = 'raw-slice',
  SCRIPT = 'script',
  SCRIPT_WITH_CONFIGURABLE = 'script-with-configurable',
  STD_STRING = 'std-string',
  STRUCT_NESTED = 'struct-nested',
  STRUCT_SIMPLE = 'struct-simple',
  STRUCT_WITH_ARRAY = 'struct-with-array',
  TUPLE_SIMPLE = 'tuple-simple',
  VECTOR_SIMPLE = 'vector-simple',
}

export const getTypegenForcProject = <T extends boolean = false>(
  project: AbiTypegenProjectsEnum,
  { transpile }: { transpile: T } = { transpile: false as T }
) => {
  const result = getForcProject<T extends true ? JsonAbiOld : JsonAbi>({
    projectDir: join(__dirname, project),
    projectName: project,
    build: 'release',
  });

  if (transpile) {
    result.abiContents = transpileAbi(result.abiContents);
  }

  return result;
};
