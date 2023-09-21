/* eslint-disable no-restricted-syntax */
import {
  createWallet,
  deployContract,
  getABIPath,
  getBinaryPath,
  getContractCamelCase,
  getContractName,
} from '../services';
import type { ParsedFuelsConfig, ContractDeployed } from '../types';
import { getDeployConfig, log, logSection, saveContractIds } from '../utils';

export async function deploy(config: ParsedFuelsConfig) {
  const contracts: Array<ContractDeployed> = [];

  if (config.contracts.length === 0) {
    logSection('🔗 No contracts to deploy');
    return [];
  }

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  logSection(`🔗 Deploying contracts to ${wallet.provider.url}...`);

  for (const contractPath of config.contracts) {
    const binaryPath = await getBinaryPath(contractPath);
    const abiPath = await getABIPath(contractPath);
    const projectName = await getContractName(contractPath);
    const contractName = await getContractCamelCase(contractPath);
    const deployConfig = await getDeployConfig(config.deployConfig, {
      contracts: Array.from(contracts),
      contractName,
      contractPath,
    });

    const contractId = await deployContract(wallet, binaryPath, abiPath, deployConfig);

    log(`Contract: ${projectName} - ${contractId}`);
    contracts.push({
      name: contractName,
      contractId,
    });
  }

  logSection('🟦 Save contract ids...');

  await saveContractIds(contracts, config.output);

  return contracts;
}
