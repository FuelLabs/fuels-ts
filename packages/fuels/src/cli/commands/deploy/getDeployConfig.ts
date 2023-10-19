import type { DeployContractOptions } from '@fuel-ts/contract';

import type { DeployOptions, OptionsFunction } from '../../types';

export async function getDeployConfig(
  deployConfig: DeployContractOptions | OptionsFunction,
  options: DeployOptions
) {
  let config: DeployContractOptions;

  if (typeof deployConfig === 'function') {
    config = await deployConfig(options);
  } else {
    config = deployConfig;
  }

  return config;
}
