import {
  getBinaryPath,
  getABIPath,
  getContractName,
  getContractCamelCase,
  getStorageSlotsPath,
  readForcToml,
  getClosestForcTomlDir,
} from '../../config/forcUtils';
import type { FuelsConfig, DeployedContract } from '../../types';
import { debug, log } from '../../utils/logger';

import { createWallet } from './createWallet';
import { deployContract } from './deployContracts';
import { getDeployConfig } from './getDeployConfig';
import { saveContractIds } from './saveContractIds';

export async function deploy(config: FuelsConfig) {
  const contracts: DeployedContract[] = [];

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying contracts to: ${wallet.provider.url}`);

  const contractsLen = config.contracts.length;

  for (let i = 0; i < contractsLen; i++) {
    const contractPath = config.contracts[i];
    const forcTomlPath = getClosestForcTomlDir(contractPath);
    const binaryPath = getBinaryPath(contractPath, config);
    const abiPath = getABIPath(contractPath, config);
    const storageSlotsPath = getStorageSlotsPath(contractPath, config);
    const projectName = getContractName(contractPath);
    const contractName = getContractCamelCase(contractPath);
    const tomlContents = readForcToml(forcTomlPath);
    const deployConfig = await getDeployConfig(config.deployConfig, {
      contracts: Array.from(contracts),
      contractName,
      contractPath,
    });

    // TODO: Implement deploy case for Scripts and Predicates
    /**
     * Example:
     *   const scriptId = await deployScript(...)
     *   const predicateId = await deployPredicate(...)
     *
     * Notes: final implementations for both may be identical.
     */
    const contractId = await deployContract(
      wallet,
      binaryPath,
      abiPath,
      storageSlotsPath,
      deployConfig,
      contractPath,
      tomlContents
    );

    debug(`Contract deployed: ${projectName} - ${contractId}`);

    contracts.push({
      name: contractName,
      contractId,
    });
  }

  await saveContractIds(contracts, config.output);
  config.onDeploy?.(config, contracts);

  return contracts;
}
