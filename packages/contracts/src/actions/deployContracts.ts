/* eslint-disable no-restricted-syntax */
import { getDeployConfig } from '../helpers/deployConfig';
import { getProjectNameCamelCase, getWorkspaceFiles } from '../helpers/sway';
import { logSection, log } from '../log';
import type { ContractsConfig, ContractDeployed } from '../types';

import { deployContractBinary } from './deployContractBinary';
import { getWalletInstance } from './getWalletInstance';

export async function deployContracts(config: ContractsConfig) {
  const wallet = await getWalletInstance(config);
  const contracts: Array<ContractDeployed> = [];
  let contractsConfig = config.contracts || [];

  logSection(`🔗 Deploying contracts to ${config.providerUrl}...`);

  if (config.workspace) {
    const contractsPaths = await getWorkspaceFiles(config.workspace);
    contractsConfig = contractsPaths.map((path) => ({ path }));
  }

  for (const { name, path, deployConfig } of contractsConfig) {
    const cofig = getDeployConfig(config, deployConfig, contracts);
    contracts.push({
      name: name || (await getProjectNameCamelCase(path)),
      contractId: await deployContractBinary(wallet, path, cofig),
    });
    log('');
  }

  return contracts;
}
