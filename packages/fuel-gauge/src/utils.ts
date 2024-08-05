import type { DeployContractConfig } from 'fuels/test-utils';
import { launchTestNode } from 'fuels/test-utils';

export async function launchTestContract<T extends DeployContractConfig>(config: T) {
  const {
    contracts: [contract],
    cleanup,
  } = await launchTestNode({
    contractsConfigs: [config],
  });
  return Object.assign(contract, {
    [Symbol.dispose]: cleanup,
  });
}
