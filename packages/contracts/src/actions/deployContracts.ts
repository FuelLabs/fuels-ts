/* eslint-disable no-restricted-syntax */
import { getDeployConfig } from 'src/helpers/deployConfig';
import type { ContractsConfig, ContractDeployed } from 'src/types';

import { deployContractBinary } from './deployContractBinary';
import { getWalletInstance } from './getWalletInstance';

export async function deployContracts(config: ContractsConfig) {
  const wallet = await getWalletInstance();
  const contracts: Array<ContractDeployed> = [];

  for (const { name, path, deployConfig } of config.contracts) {
    const contractOptions = getDeployConfig(config, deployConfig, contracts);

    contracts.push({
      name,
      contractId: await deployContractBinary(wallet, path, contractOptions),
    });
  }

  return contracts;
}
