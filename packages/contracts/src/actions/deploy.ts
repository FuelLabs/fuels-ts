/* eslint-disable no-restricted-syntax */
import { createWallet, deployContract, getBinaryPath, getContractCamelCase } from '../services';
import type { LoadedConfig, ContractDeployed } from '../types';
import { getDeployConfig, logSection, saveContractIds } from '../utils';

export async function deploy(config: LoadedConfig) {
  const wallet = createWallet(config.privateKey, config.providerUrl);
  logSection(`🔗 Deploying contracts to ${wallet.provider.url}...`);
  const contracts: Array<ContractDeployed> = [];

  for (const contractPath of config.contracts) {
    const binaryPath = await getBinaryPath(contractPath);
    const contractName = await getContractCamelCase(contractPath);
    const deployConfig = getDeployConfig(config.deployConfig, {
      contracts: Array.from(contracts),
      contractName,
      contractPath,
    });
    const contractId = await deployContract(wallet, binaryPath, deployConfig);

    contracts.push({
      name: contractName,
      contractId,
    });
  }

  logSection('🟦 Save contract ids...');
  await saveContractIds(contracts, config.output);

  return contracts;
}
