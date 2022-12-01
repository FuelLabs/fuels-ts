import type {
  ContractDeployed,
  ContractsConfig,
  DeployContractOptions,
  OptionsFunction,
} from '../types';

export function getDeployConfig(
  config: ContractsConfig,
  contractDeployConfig: DeployContractOptions | OptionsFunction | undefined,
  contracts: Array<ContractDeployed>
) {
  let deployConfig: DeployContractOptions | undefined;

  if (typeof contractDeployConfig === 'function') {
    deployConfig = contractDeployConfig(contracts);
  } else if (typeof contractDeployConfig === 'object') {
    deployConfig = contractDeployConfig;
  } else if (typeof config.deployConfig === 'object') {
    deployConfig = config.deployConfig;
  }

  return deployConfig;
}
