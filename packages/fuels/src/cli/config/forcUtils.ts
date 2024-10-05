import { FuelError } from '@fuel-ts/errors';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import camelCase from 'lodash.camelcase';
import { join } from 'path';
import toml from 'toml';

import type { FuelsConfig } from '../types';

export type ForcToml = {
  project: {
    authors?: string[];
    entry: string;
    license: string;
    name: string;
  };
  workspace: {
    members: string[];
  };
  dependencies: {
    [key: string]: string;
  };
  proxy?: {
    enabled: boolean;
    address?: string;
  };
};

export enum SwayType {
  contract = 'contract',
  script = 'script',
  predicate = 'predicate',
  library = 'library',
}

export const swayFiles = new Map<string, SwayType>();

export const getClosestForcTomlDir = (dir: string): string => {
  let forcPath = join(dir, 'Forc.toml');

  if (existsSync(forcPath)) {
    return forcPath;
  }

  const parent = join(dir, '..');
  forcPath = getClosestForcTomlDir(parent);

  if (parent === '/' && !existsSync(forcPath)) {
    const msg = `TOML file not found:\n  ${dir}`;
    throw new FuelError(FuelError.CODES.CONFIG_FILE_NOT_FOUND, msg);
  }

  return forcPath;
};

export function readForcToml(contractPath: string) {
  if (!existsSync(contractPath)) {
    throw new FuelError(
      FuelError.CODES.CONFIG_FILE_NOT_FOUND,
      `TOML file not found:\n  ${contractPath}`
    );
  }

  const forcPath = getClosestForcTomlDir(contractPath);

  if (!existsSync(forcPath)) {
    throw new FuelError(
      FuelError.CODES.CONFIG_FILE_NOT_FOUND,
      `TOML file not found:\n  ${forcPath}`
    );
  }

  const forcFile = readFileSync(forcPath, 'utf8');
  return toml.parse(forcFile) as ForcToml;
}

export function setForcTomlProxyAddress(contractPath: string, address: string) {
  const forcPath = getClosestForcTomlDir(contractPath);
  const tomlPristine = readFileSync(forcPath).toString();
  const tomlJson = readForcToml(forcPath);

  const isProxyEnabled = tomlJson.proxy?.enabled;
  const hasProxyAddress = tomlJson.proxy?.address;

  // never override address
  if (isProxyEnabled && hasProxyAddress) {
    return address;
  }

  // injects address into toml string
  const replaceReg = /(\[proxy\][\s\S]+^enabled.+$)/gm;
  const replaceStr = `$1\naddress = "${address}"`;
  const modifiedToml = tomlPristine.replace(replaceReg, replaceStr);

  writeFileSync(forcPath, modifiedToml);

  return address;
}

export function readSwayType(path: string) {
  const forcToml = readForcToml(path);
  const entryFile = forcToml.project.entry || 'main.sw';
  const swayEntryPath = join(path, 'src', entryFile);

  if (!swayFiles.has(swayEntryPath)) {
    const swayFile = readFileSync(swayEntryPath, 'utf8');
    const swayTypeLines = Object.values(SwayType).map((type) => `${type};`);
    const swayType = swayFile
      .split('\n')
      .find((line) => swayTypeLines.some((swayTypeLine) => line === swayTypeLine))
      ?.split(';')[0];
    swayFiles.set(swayEntryPath, swayType as SwayType);
  }

  return swayFiles.get(swayEntryPath) as SwayType;
}

export function getContractName(contractPath: string) {
  const { project } = readForcToml(contractPath);
  return project.name;
}

export function getScriptName(scriptPath: string) {
  const { project } = readForcToml(scriptPath);
  return project.name;
}

export function getPredicateName(predicatePath: string) {
  const { project } = readForcToml(predicatePath);
  return project.name;
}

export function getContractCamelCase(contractPath: string) {
  const projectName = getContractName(contractPath);
  return camelCase(projectName);
}

export function getBinaryPath(contractPath: string, { buildMode }: FuelsConfig) {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${buildMode}/${projectName}.bin`);
}

export function getABIPath(contractPath: string, { buildMode }: FuelsConfig) {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${buildMode}/${projectName}-abi.json`);
}

export function getABIPaths(paths: string[], config: FuelsConfig) {
  return Promise.all(paths.map((path) => getABIPath(path, config)));
}

export const getStorageSlotsPath = (contractPath: string, { buildMode }: FuelsConfig) => {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${buildMode}/${projectName}-storage_slots.json`);
};

export const getScriptDeployedBinHash = (scriptPath: string, { buildMode }: FuelsConfig) => {
  const projectName = getScriptName(scriptPath);
  return join(scriptPath, `out/${buildMode}/${projectName}-deployed-bin-hash`);
};

export const getScriptLoaderBytecode = (scriptPath: string, { buildMode }: FuelsConfig) => {
  const projectName = getScriptName(scriptPath);
  return join(scriptPath, `out/${buildMode}/${projectName}.deployed.bin`);
};
