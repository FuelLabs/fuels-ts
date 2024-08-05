import { FuelError } from '@fuel-ts/errors';
import { readFileSync, existsSync } from 'fs';
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
};

export enum SwayType {
  contract = 'contract',
  script = 'script',
  predicate = 'predicate',
  library = 'library',
}

export const forcFiles = new Map<string, ForcToml>();

export const swayFiles = new Map<string, SwayType>();

export function readForcToml(path: string) {
  const forcPath = join(path, './Forc.toml');

  if (!existsSync(forcPath)) {
    throw new FuelError(
      FuelError.CODES.CONFIG_FILE_NOT_FOUND,
      `TOML file not found:\n  ${forcPath}`
    );
  }

  if (!forcFiles.has(forcPath)) {
    const forcFile = readFileSync(forcPath, 'utf8');
    const tomlParsed = toml.parse(forcFile);
    forcFiles.set(forcPath, tomlParsed);
  }

  const tomlContents = forcFiles.get(forcPath) as ForcToml;

  return tomlContents;
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
