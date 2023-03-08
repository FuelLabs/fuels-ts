import { readFile } from 'fs/promises';
import camelCase from 'lodash.camelcase';
import { join } from 'path';
import toml from 'toml';

import type { ForcToml } from './types';

export const forcFiles = new Map<string, ForcToml>();

export async function readForcToml(path: string) {
  const forcPath = join(path, './Forc.toml');

  // Read Forc file and store in cache
  if (!forcFiles.has(forcPath)) {
    const forcFile = await readFile(forcPath, 'utf8');
    const tomlParsed = toml.parse(forcFile);
    forcFiles.set(forcPath, tomlParsed);
  }

  return forcFiles.get(forcPath) as ForcToml;
}

export async function getContractName(contractPath: string) {
  const { project } = await readForcToml(contractPath);
  return project.name;
}

export async function getContractCamelCase(contractPath: string) {
  const projectName = await getContractName(contractPath);
  return camelCase(projectName);
}

export async function getBinaryPath(contractPath: string) {
  const projectName = await getContractName(contractPath);
  return join(contractPath, `/out/debug/${projectName}.bin`);
}

export async function getABIPath(contractPath: string) {
  const projectName = await getContractName(contractPath);
  return join(contractPath, `/out/debug/${projectName}-abi.json`);
}

export async function getABIPaths(paths: Array<string>) {
  return Promise.all(paths.map((path) => getABIPath(path)));
}
