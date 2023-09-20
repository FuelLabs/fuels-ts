import type { DeployContractOptions } from '@fuel-ts/contract';

export enum Commands {
  build = 'build',
  deploy = 'deploy',
  dev = 'dev',
  flow = 'flow',
  init = 'init',
  types = 'types',
}

export type ActionEvent =
  | {
      type: Commands.build;
      data: unknown;
    }
  | {
      type: Commands.deploy;
      data: Array<ContractDeployed>;
    }
  | {
      type: Commands.dev;
      data: unknown;
    }
  | {
      type: Commands.flow;
      data: Array<ContractDeployed>;
    }
  | {
      type: Commands.init;
      data: unknown;
    }
  | {
      type: Commands.types;
      data: unknown;
    };

export type ContractDeployed = {
  name: string;
  contractId: string;
};

export type DeployOptions = {
  contracts: Array<ContractDeployed>;
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

  useSystemForc?: boolean;
  useSystemFuelCore?: boolean;
  autoStartFuelCore?: boolean;
  fuelCorePort?: number;

  onFailure?: (error: Error, config: ParsedFuelsConfig) => void;
  onSuccess?: (event: ActionEvent, config: ParsedFuelsConfig) => void;
};

export type ParsedFuelsConfig = UserFuelsConfig &
  Required<
    Pick<
      UserFuelsConfig,
      | 'contracts'
      | 'predicates'
      | 'scripts'
      | 'deployConfig'
      | 'useSystemForc'
      | 'useSystemFuelCore'
      | 'autoStartFuelCore'
      | 'fuelCorePort'
      | 'providerUrl'
    >
  > & {
    basePath: string;
  };
