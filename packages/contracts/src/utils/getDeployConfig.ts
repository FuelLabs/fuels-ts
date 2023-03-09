import type { DeployContractOptions, DeployOptions, OptionsFunction } from '../types';

export async function getDeployConfig(
  deployConfig: DeployContractOptions | OptionsFunction | undefined,
  options: DeployOptions
) {
  let config: DeployContractOptions | undefined;

  if (typeof deployConfig === 'function') {
    config = await deployConfig(options);
  } else {
    config = deployConfig;
  }

  return config;
}
