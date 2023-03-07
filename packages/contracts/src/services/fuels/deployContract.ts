import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ContractFactory } from '@fuel-ts/contract';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';

import type { DeployContractOptions } from '../../types';
import { log } from '../../utils/logger';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  deployConfig?: DeployContractOptions
) {
  log('Read binary file from:');
  log(binaryPath);
  const bytecode = readFileSync(binaryPath);
  const contractFactory = new ContractFactory(bytecode, [] as JsonAbi, wallet);

  log('Deploy contract');
  const contract = await contractFactory.deployContract(deployConfig);

  log('Contract successfully deployed!');
  return contract.id.toB256();
}
