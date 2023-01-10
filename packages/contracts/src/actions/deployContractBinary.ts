import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ContractFactory } from '@fuel-ts/contract';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';

import { getABIPath, getBinaryPath } from '../helpers/sway';
import { log } from '../log';
import type { DeployContractOptions } from '../types';

export async function deployContractBinary(
  wallet: WalletUnlocked,
  binaryPath: string,
  deployConfig?: DeployContractOptions
) {
  const binaryFilePath = getBinaryPath(binaryPath);
  const abiFilePath = getABIPath(binaryPath);

  log('read binary file from:');
  log(binaryFilePath);
  const bytecode = readFileSync(binaryFilePath);
  const abiJSON = JSON.parse(readFileSync(abiFilePath, 'utf8').toString()) as JsonAbi;
  const contractFactory = new ContractFactory(bytecode, abiJSON, wallet);

  log('deploy contract');
  const contract = await contractFactory.deployContract(deployConfig);

  log('contract successful deployed!');
  return contract.id.toB256();
}
