import { readFileSync, existsSync } from 'fs';
import camelCase from 'lodash.camelcase';
import { join } from 'path';
import toml from 'toml';

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
}

export enum BuildMode {
  RELEASE = 'release',
  DEBUG = 'debug',
}

export const forcFiles = new Map<string, ForcToml>();

export const swayFiles = new Map<string, SwayType>();

export function readForcToml(path: string) {
  const forcPath = join(path, './Forc.toml');

  if (!existsSync(forcPath)) {
    throw new Error(`Toml file not found:\n  ${forcPath}`);
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
    const [swayType] = swayFile.split(';\n');
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

export function getBinaryPath(contractPath: string, mode: BuildMode) {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${mode}/${projectName}.bin`);
}

export function getABIPath(contractPath: string, mode: BuildMode) {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${mode}/${projectName}-abi.json`);
}

export function getABIPaths(paths: string[], mode: BuildMode) {
  return Promise.all(paths.map((path) => getABIPath(path, mode)));
}

export const getStorageSlotsPath = (contractPath: string, mode: BuildMode) => {
  const projectName = getContractName(contractPath);
  return join(contractPath, `/out/${mode}/${projectName}-storage_slots.json`);
};
