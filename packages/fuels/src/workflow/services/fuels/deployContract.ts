import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { readFile } from 'fs/promises';

import { log } from '../../utils';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  deployConfig?: DeployContractOptions
) {
  log('Read binary file from:');
  log(binaryPath);
  const bytecode = await readFile(binaryPath);

  const abi = JSON.parse((await readFile(abiPath)).toString());
  const contractFactory = new ContractFactory(bytecode, abi, wallet);

  log('Deploy contract');
  const contract = await contractFactory.deployContract(deployConfig);

  log('Contract successfully deployed!');
  return contract.id.toB256();
}
