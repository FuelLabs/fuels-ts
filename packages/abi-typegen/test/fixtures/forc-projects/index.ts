import { readFileSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

import type { IRawAbi } from '../../../src/index';
import { normalizeName } from '../../../src/utils/normalize';

export enum ForcProjectsEnum {
  ARRAY_OF_ENUMS = 'array-of-enums',
  ARRAY_WITH_GENERICS = 'array-with-generics',
  ENUM_OF_ENUMS = 'enum-of-enums',
  ENUM_OF_STRUCTS = 'enum-of-structs',
  ENUM_SIMPLE = 'enum-simple',
  FN_VOID = 'fn-void',
  FULL = 'full',
  MINIMAL = 'minimal',
  OPTION_SIMPLE = 'option-simple',
  PREDICATE = 'predicate',
  SCRIPT = 'script',
  STRUCT_NESTED = 'struct-nested',
  STRUCT_SIMPLE = 'struct-simple',
  STRUCT_WITHARRAY = 'struct-with-array',
  TUPLE_SIMPLE = 'tuple-simple',
  VECTOR_SIMPLE = 'vector-simple',
}

export const getProjectDebugDir = (project: ForcProjectsEnum) =>
  join(__dirname, project, 'out', 'debug');

export const getProjectTempDir = (project: ForcProjectsEnum) =>
  join(getProjectDebugDir(project), '__types__');

export const getProjectAbiPath = (project: ForcProjectsEnum) =>
  join(getProjectDebugDir(project), `${project}-abi.json`);

export const getProjectBinPath = (project: ForcProjectsEnum) =>
  join(getProjectDebugDir(project), `${project}.bin`);

export const getProjectAbiName = (project: ForcProjectsEnum) => `${project}-abi`;

export const getProjectNormalizedName = (project: ForcProjectsEnum) => normalizeName(project);

export const getProjectAbi = (project: ForcProjectsEnum) => {
  const projectPath = getProjectAbiPath(project);
  const abiContents: IRawAbi = JSON.parse(readFileSync(projectPath, 'utf-8'));
  return abiContents;
};

export const getProjectResources = (project: ForcProjectsEnum) => {
  const debugDir = getProjectDebugDir(project);
  const tempDir = getProjectTempDir(project);
  const binPath = getProjectBinPath(project);
  const abiPath = getProjectAbiPath(project);
  const abiName = getProjectAbiName(project);
  const abiContents = getProjectAbi(project);
  const abiNormalizedName = getProjectNormalizedName(project);
  const inputGlobal = `${debugDir}/*-abi.json`;

  rimraf.sync(tempDir);

  return {
    debugDir,
    tempDir,
    binPath,
    abiPath,
    abiName,
    abiContents,
    abiNormalizedName,
    inputGlobal,
  };
};
