import type { ContractsConfig } from '../types';

import { buildContracts } from './buildContracts';
import { deployContracts } from './deployContracts';

export async function runAll(config: ContractsConfig) {
  await buildContracts(config);
  const contractIds = await deployContracts(config);
  return contractIds;
}
