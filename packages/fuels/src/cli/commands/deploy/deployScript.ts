import type { WalletUnlocked } from '@fuel-ts/account';
import type { DeployContractOptions } from '@fuel-ts/contract';
import { debug } from 'console';

import type { ForcToml } from '../../config/forcUtils';

export async function deployScript(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  storageSlotsPath: string,
  deployConfig: DeployContractOptions,
  contractPath: string,
  tomlContents: ForcToml
) {
  debug(`Deploying script for ABI: ${abiPath}`);

  // TODO: implement method
  // eslint-disable-next-line no-console
  console.log({
    wallet,
    binaryPath,
    abiPath,
    storageSlotsPath,
    deployConfig,
    contractPath,
    tomlContents,
  });

  return Promise.resolve('script-id');
}
