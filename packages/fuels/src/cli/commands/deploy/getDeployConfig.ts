import type { DeployContractOptions } from '@fuel-ts/contract';

import type { ContractDeployOptions, OptionsFunction } from '../../types';

export async function getDeployConfig(
  deployConfig: DeployContractOptions | OptionsFunction,
  options: ContractDeployOptions
) {
  let config: DeployContractOptions;

  if (typeof deployConfig === 'function') {
    config = await deployConfig(options);
  } else {
    config = deployConfig;
  }

  return config;
}
