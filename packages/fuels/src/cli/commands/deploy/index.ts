import type { FuelsConfig } from '../../types';

import { deployContracts } from './deployContracts';
import { saveContractIds } from './saveContractIds';

export async function deploy(config: FuelsConfig) {
  const contractIds = await deployContracts(config);
  await saveContractIds(contractIds, config.output);
  config.onDeploy?.(config, contractIds);
  return contractIds;
}
