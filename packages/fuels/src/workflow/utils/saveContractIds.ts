import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

import type { ContractDeployed } from '../types';

import { log } from './logger';

export async function saveContractIds(contracts: Array<ContractDeployed>, output: string) {
  const contractsMap = contracts.reduce(
    (cConfig, { name, contractId }) => ({
      ...cConfig,
      [name]: contractId,
    }),
    {}
  );
  const filePath = resolve(output, 'contracts.json');
  log('save contract ids at:');
  log(filePath);
  await mkdir(output, { recursive: true });
  await writeFile(filePath, JSON.stringify(contractsMap, null, 2));
}
