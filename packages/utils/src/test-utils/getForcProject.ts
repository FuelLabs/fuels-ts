import { hexlify } from '@ethersproject/bytes';
import { readFileSync } from 'fs';
import { basename, join } from 'path';

import { normalize } from '../utils/normalize';

export interface IGetForcProjectParams {
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

export const getProjectAbiName = (params: IGetForcProjectParams) => `${params.projectName}-abi`;

export const getProjectNormalizedName = (params: IGetForcProjectParams) =>
  normalize(params.projectName);

export const getProjectAbi = (params: IGetForcProjectParams) => {
  const projectPath = getProjectAbiPath(params);
  const abiContents = JSON.parse(readFileSync(projectPath, 'utf-8'));
  return abiContents;
};

export const getForcProject = <T = unknown>(projectDir: string) => {
  const projectName = basename(projectDir);

  const params: IGetForcProjectParams = {
    projectDir,
    projectName,
  };

  const debugDir = getProjectDebugDir(params);
  const tempDir = getProjectTempDir(params);
  const binPath = getProjectBinPath(params);
  const binHelixfied = hexlify(readFileSync(binPath));
  const abiPath = getProjectAbiPath(params);
  const abiName = getProjectAbiName(params);
  const abiContents: T = getProjectAbi(params);
  const normalizedName = getProjectNormalizedName(params);

  const inputGlobal = `${debugDir}/*-abi.json`;

  return {
    name: projectName,
    normalizedName,
    debugDir,
    tempDir,
    binPath,
    binHelixfied,
    abiPath,
    abiName,
    abiContents,
    inputGlobal,
  };
};
