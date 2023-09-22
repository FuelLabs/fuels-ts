import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';

import { log } from '../../utils/logger';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  deployConfig?: DeployContractOptions
) {
  log('Read binary file from:');
  log(binaryPath);
  const bytecode = await readFileSync(binaryPath);

  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const contractFactory = new ContractFactory(bytecode, abi, wallet);

  log('Deploy contract');
  const contract = await contractFactory.deployContract(deployConfig);

  log('Contract successfully deployed!');
  return contract.id.toB256();
}
