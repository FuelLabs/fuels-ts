import { join } from 'path';
import type { ContractsConfig } from 'src/types';

export function getFolderName(contractPath: string) {
  const folderName = contractPath.split('/').slice(-1)[0];
  return folderName;
}

export function getBinaryName(contractPath: string) {
  const folderName = getFolderName(contractPath);
  return join(contractPath, `/out/debug/${folderName}.bin`);
}

export function getABIName(contractPath: string) {
  const folderName = getFolderName(contractPath);
  return join(contractPath, `/out/debug/${folderName}-abi.json`);
}

export function getArtifactPaths(contracts: ContractsConfig['contracts']) {
  return contracts.map((contract) => getABIName(contract.path));
}
