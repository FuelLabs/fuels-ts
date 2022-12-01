import { join } from 'path';

import type { ContractsConfig } from '../types';

export function getFolderName(contractPath: string) {
  const folderName = contractPath.split('/').slice(-1)[0];
  return folderName;
}

export function getBinaryPath(contractPath: string) {
  const folderName = getFolderName(contractPath);
  return join(contractPath, `/out/debug/${folderName}.bin`);
}

export function getABIPath(contractPath: string) {
  const folderName = getFolderName(contractPath);
  return join(contractPath, `/out/debug/${folderName}-abi.json`);
}

export function getArtifactPaths(contracts: ContractsConfig['contracts']) {
  return contracts.map((contract) => getABIPath(contract.path));
}
