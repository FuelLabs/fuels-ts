/* eslint-disable no-restricted-syntax */
import { getDeployConfig } from '../helpers/deployConfig';
import { getProjectNameCamelCase } from '../helpers/sway';
import { logSection } from '../log';
import type { ContractsConfig, ContractDeployed } from '../types';

import { deployContractBinary } from './deployContractBinary';
import { getWalletInstance } from './getWalletInstance';

export async function deployContracts(config: ContractsConfig) {
  const wallet = await getWalletInstance(config);
  const contracts: Array<ContractDeployed> = [];

  for (const { name, path, deployConfig } of config.contracts) {
    logSection(`🔗 Deploying contracts to ${config.providerUrl}...`);
    const cofig = getDeployConfig(config, deployConfig, contracts);
    contracts.push({
      name: name || (await getProjectNameCamelCase(path)),
      contractId: await deployContractBinary(wallet, path, cofig),
    });
  }

  return contracts;
}
