import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { hexlify } from '../index';
import { normalizeString } from '../utils/normalizeString';

interface IGetForcProjectParams {
  projectDir: string;
  projectName: string;
}

export const getProjectDebugDir = (params: IGetForcProjectParams) =>
  join(params.projectDir, 'out', 'debug');

export const getProjectTempDir = (params: IGetForcProjectParams) =>
  join(getProjectDebugDir(params), '__temp__');

export const getProjectAbiPath = (params: IGetForcProjectParams) =>
  join(getProjectDebugDir(params), `${params.projectName}-abi.json`);

export const getProjectBinPath = (params: IGetForcProjectParams) =>
  join(getProjectDebugDir(params), `${params.projectName}.bin`);

export const getProjectStorageSlotsPath = (params: IGetForcProjectParams) =>
  join(getProjectDebugDir(params), `${params.projectName}-storage_slots.json`);

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
  const debugDir = getProjectDebugDir(params);
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

  const inputGlobal = `${debugDir}/*-abi.json`;

  return {
    name: params.projectName,
    storageSlots,
    normalizedName,
    debugDir,
    tempDir,
    binPath,
    binHexlified,
    abiPath,
    abiName,
    abiContents,
    inputGlobal,
  };
};
