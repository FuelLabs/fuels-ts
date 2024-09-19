import type { WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import type { DeployContractOptions } from '@fuel-ts/contract';
import { existsSync, readFileSync } from 'fs';

import type { ForcToml } from '../../config/forcUtils';
import { debug } from '../../utils/logger';

export async function deployContract(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  storageSlotsPath: string,
  deployConfig: DeployContractOptions,
  tomlContents: ForcToml
) {
  debug(`Deploying contract for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);

  if (existsSync(storageSlotsPath)) {
    const storageSlots = JSON.parse(readFileSync(storageSlotsPath, 'utf-8'));
    // eslint-disable-next-line no-param-reassign
    deployConfig.storageSlots = storageSlots;
  }

  console.log('TOML', tomlContents);
  // console.log('TOML', tomlContents?.proxy?.enabled);
  // console.log('TOML', tomlContents?.proxy?.address);

  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const contractFactory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult } = await contractFactory.deploy(deployConfig);
  const { contract } = await waitForResult();

  return contract.id.toB256();
}
