import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { hexlify } from '../index';
import { normalizeString } from '../utils/normalizeString';

interface IGetForcProjectParams {
  projectDir: string;
  projectName: string;
  build: 'debug' | 'release';
}

export const getProjectBuildDir = (params: IGetForcProjectParams) =>
  join(params.projectDir, 'out', params.build);
export const getProjectReleaseDir = (params: IGetForcProjectParams) =>
  join(params.projectDir, 'out', params.build);
export const getProjectTempDir = (params: IGetForcProjectParams) =>
  join(getProjectBuildDir(params), '__temp__');

export const getProjectAbiPath = (params: IGetForcProjectParams) =>
  join(getProjectBuildDir(params), `${params.projectName}-abi.json`);

export const getProjectBinPath = (params: IGetForcProjectParams) =>
  join(getProjectBuildDir(params), `${params.projectName}.bin`);

export const getProjectStorageSlotsPath = (params: IGetForcProjectParams) =>
  join(getProjectBuildDir(params), `${params.projectName}-storage_slots.json`);

export const getProjectAbiName = (params: IGetForcProjectParams) => `${params.projectName}-abi`;

export const getProjectNormalizedName = (params: IGetForcProjectParams) =>
  normalizeString(params.projectName);

export const getProjectAbi = (params: IGetForcProjectParams) => {
  const projectPath = getProjectAbiPath(params);
  const abiContents = JSON.parse(readFileSync(projectPath, 'utf-8'));
  return abiContents;
};

export const getProjectStorageSlots = (params: IGetForcProjectParams) => {
  const storageSlotsFilePath = getProjectStorageSlotsPath(params);
  if (!existsSync(storageSlotsFilePath)) {
    return [];
  }
  const storageSlots = JSON.parse(readFileSync(storageSlotsFilePath, 'utf-8'));
  return storageSlots;
};

export const getForcProject = <T = unknown>(params: IGetForcProjectParams) => {
  const buildDir = getProjectBuildDir(params);
  const tempDir = getProjectTempDir(params);
  const binPath = getProjectBinPath(params);
  const binHexlified = hexlify(readFileSync(binPath));
  const abiPath = getProjectAbiPath(params);
  const abiName = getProjectAbiName(params);
  const abiContents: T = getProjectAbi(params);
  const normalizedName = getProjectNormalizedName(params);
  const storageSlots: Array<{
    key: string;
    value: string;
  }> = getProjectStorageSlots(params);

  const inputGlobal = `${buildDir}/*-abi.json`;

  return {
    name: params.projectName,
    storageSlots,
    normalizedName,
    buildDir,
    tempDir,
    binPath,
    binHexlified,
    abiPath,
    abiName,
    abiContents,
    inputGlobal,
  };
};
