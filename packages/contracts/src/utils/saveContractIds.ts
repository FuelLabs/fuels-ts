import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

import type { ContractDeployed, LoadedConfig } from '../types';

import { log } from './logger';

export async function saveContractIds(contracts: Array<ContractDeployed>, config: LoadedConfig) {
  const contractsMap = contracts.reduce(
    (cConfig, { name, contractId }) => ({
      ...cConfig,
      [name]: contractId,
    }),
    {}
  );
  const path = resolve(config.basePath, config.output);
  const filePath = resolve(path, 'contracts.json');
  log('save contract ids at:');
  log(filePath);
  await mkdir(path, { recursive: true });
  await writeFile(filePath, JSON.stringify(contractsMap, null, 2));
}
