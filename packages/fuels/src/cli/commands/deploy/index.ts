import {
  getBinaryPath,
  getABIPath,
  getContractName,
  getContractCamelCase,
} from '../../config/forcUtils';
import type { ParsedFuelsConfig, ContractDeployed } from '../../types';
import { debug, log, warn } from '../../utils/logger';

import { createWallet } from './createWallet';
import { deployContract } from './deployContract';
import { getDeployConfig } from './getDeployConfig';
import { saveContractIds } from './saveContractIds';

export async function deploy(config: ParsedFuelsConfig) {
  const contracts: ContractDeployed[] = [];

  if (config.contracts.length === 0) {
    warn('No contracts to deploy');
    return [];
  }

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying contracts to: ${wallet.provider.url}`);

  /**
   * Ideally, this would have been done with Promise.all(...), but
   * deploying contracts in parallel could cause UTXO conflicts,
   * so we resort back to the [restrict] async for/each usage
   */
  // eslint-disable-next-line no-restricted-syntax
  for (const contractPath of config.contracts) {
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
