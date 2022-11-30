import { readFileSync } from 'fs';
import type { JsonAbi, WalletUnlocked } from 'fuels';
import { ContractFactory } from 'fuels';
import path from 'path';
import { getABIName, getBinaryName } from 'src/helpers/sway';
import { log } from 'src/log';
import type { DeployContractOptions } from 'src/types';

export async function deployContractBinary(
  wallet: WalletUnlocked,
  binaryPath: string,
  deployConfig?: DeployContractOptions
) {
  const binaryFilePath = path.join(binaryPath, getBinaryName(binaryPath));
  const abiFilePath = path.join(binaryPath, getABIName(binaryPath));

  log('read binary file from: ', binaryFilePath);
  const bytecode = readFileSync(binaryFilePath);
  const abiJSON = JSON.parse(readFileSync(abiFilePath).toString()) as JsonAbi;
  const contractFactory = new ContractFactory(bytecode, abiJSON, wallet);

  log('deploy contract');
  const contract = await contractFactory.deployContract({
    gasLimit: 1_000_000,
    storageSlots: [],
    ...deployConfig,
  });

  log('contract successful deployed');
  return contract.id.toB256();
}
