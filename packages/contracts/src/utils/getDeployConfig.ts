import type { DeployContractOptions, DeployOptions, OptionsFunction } from '../types';

export function getDeployConfig(
  deployConfig: DeployContractOptions | OptionsFunction | undefined,
  options: DeployOptions
) {
  let config: DeployContractOptions | undefined;
  if (typeof deployConfig === 'function') {
    config = deployConfig(options);
  }
  return config;
}
