import type { DeployContractOptions } from '@fuel-ts/contract';

export enum Commands {
  build = 'build',
  deploy = 'deploy',
  dev = 'dev',
  init = 'init',
}

export type CommandEvent =
  | {
      type: Commands.build;
      data: unknown;
    }
  | {
      type: Commands.deploy;
      data: ContractDeployed[];
    }
  | {
      type: Commands.dev;
      data: unknown;
    }
  | {
      type: Commands.init;
      data: unknown;
    };

export type ContractDeployed = {
  name: string;
  contractId: string;
};

export type DeployOptions = {
  contracts: ContractDeployed[];
  contractName: string;
  contractPath: string;
};

export type OptionsFunction = (
  options: DeployOptions
) => DeployContractOptions | Promise<DeployContractOptions>;

export type UserFuelsConfig = {
  workspace?: string;
  contracts?: string[];
  predicates?: string[];
  scripts?: string[];
  output: string;

  privateKey?: string;
  providerUrl?: string;
  chainConfig?: string;
  deployConfig?: DeployContractOptions | OptionsFunction;

  useBuiltinForc?: boolean;
  useBuiltinFuelCore?: boolean;
  autoStartFuelCore?: boolean;
  fuelCorePort?: number;

  onFailure?: (error: Error, config: FuelsConfig) => void;
  onSuccess?: (event: CommandEvent, config: FuelsConfig) => void;
};

export type FuelsConfig = UserFuelsConfig &
  Required<
    Pick<
      UserFuelsConfig,
      | 'contracts'
      | 'predicates'
      | 'scripts'
      | 'deployConfig'
      | 'useBuiltinForc'
      | 'useBuiltinFuelCore'
      | 'autoStartFuelCore'
      | 'fuelCorePort'
      | 'providerUrl'
    >
  > & {
    basePath: string;
  };
