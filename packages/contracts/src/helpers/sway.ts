import { readFile } from 'fs/promises';
import camelCase from 'lodash.camelcase';
import { join } from 'path';
import toml from 'toml';

import type { ContractsConfig, ForcToml } from '../types';

export async function getForcFile(contractPath: string) {
  const forcFile = await readFile(join(contractPath, './Forc.toml'), 'utf8');
  return toml.parse(forcFile) as ForcToml;
}

export async function getProjectName(contractPath: string) {
  const { project } = await getForcFile(contractPath);
  return project.name;
}

export async function getProjectNameCamelCase(contractPath: string) {
  const projectName = await getProjectName(contractPath);
  return camelCase(projectName);
}

export async function getBinaryPath(contractPath: string) {
  const projectName = await getProjectName(contractPath);
  return join(contractPath, `/out/debug/${projectName}.bin`);
}

export async function getABIPath(contractPath: string) {
  const projectName = await getProjectName(contractPath);
  return join(contractPath, `/out/debug/${projectName}-abi.json`);
}

export async function getArtifactPaths(contracts: ContractsConfig['contracts']) {
  return Promise.all(contracts.map((contract) => getABIPath(contract.path)));
}
