import {
  getBinaryPath,
  getABIPath,
  getContractName,
  getContractCamelCase,
} from '../../config/forcUtils';
import type { FuelsConfig, DeployedContract } from '../../types';
import { debug, log } from '../../utils/logger';

import { createWallet } from './createWallet';
import { deployContract } from './deployContract';
import { getDeployConfig } from './getDeployConfig';
import { saveContractIds } from './saveContractIds';

export async function deploy(config: FuelsConfig) {
  const contracts: DeployedContract[] = [];

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying contracts to: ${wallet.provider.url}`);

  const contractsLen = config.contracts.length;

  for (let i = 0; i < contractsLen; i++) {
    const contractPath = config.contracts[i];
    const binaryPath = getBinaryPath(contractPath);
    const abiPath = getABIPath(contractPath);
    const projectName = getContractName(contractPath);
    const contractName = getContractCamelCase(contractPath);
    const deployConfig = await getDeployConfig(config.deployConfig, {
      contracts: Array.from(contracts),
      contractName,
      contractPath,
    });

    const contractId = await deployContract(wallet, binaryPath, abiPath, deployConfig);

    debug(`Contract deployed: ${projectName} - ${contractId}`);

    contracts.push({
      name: contractName,
      contractId,
    });
  }

  await saveContractIds(contracts, config.output);

  return contracts;
}
