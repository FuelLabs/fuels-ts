import { readFile } from 'fs/promises';
import camelCase from 'lodash.camelcase';
import { join } from 'path';
import toml from 'toml';

import type { ContractsConfig, ForcToml } from '../types';

export async function getForcFile(contractPath: string) {
  const forcFile = await readFile(join(contractPath, './Forc.toml'), 'utf8');
  const tomlParsed = toml.parse(forcFile);
  return tomlParsed as ForcToml;
}

export async function getWorkspaceFiles(workspacePaht: string) {
  const {
    workspace: { members },
  } = await getForcFile(workspacePaht);
  return members.map((member) => join(workspacePaht, member));
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

export async function getArtifactPaths2(paths: Array<string>) {
  return Promise.all(paths.map((path) => getABIPath(path)));
}
