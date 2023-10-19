import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';

import { debug } from '../../utils/logger';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  deployConfig: DeployContractOptions
) {
  debug(`Deploying contract for ABI: ${abiPath}`);

  const bytecode = await readFileSync(binaryPath);
  const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();

  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const contractFactory = new ContractFactory(bytecode, abi, wallet);

  // eslint-disable-next-line no-param-reassign
  deployConfig.gasPrice = deployConfig.gasPrice ?? gasPrice;

  const contract = await contractFactory.deployContract(deployConfig);
  return contract.id.toB256();
}
