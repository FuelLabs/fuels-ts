import type { BytesLike } from '@ethersproject/bytes';
import type { CreateTransactionRequestLike } from '@fuel-ts/providers';
import type { StorageSlot } from '@fuel-ts/transactions';

export type DeployContractOptions = {
  salt?: BytesLike;
  storageSlots?: StorageSlot[];
  stateRoot?: BytesLike;
} & CreateTransactionRequestLike;

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

export type FuelsConfig = {
  workspace?: string;
  contracts?: Array<string>;
  predicates?: Array<string>;
  scripts?: Array<string>;
  output: string;

  privateKey?: string;
  providerUrl?: string;
  chainConfig?: string;
  deployConfig?: DeployContractOptions | OptionsFunction;

  useSystemForc?: boolean;
  useSystemFuelCore?: boolean;
  spinUpFuelNode?: boolean;

  onFailure?: (error: Error, config: LoadedConfig) => void;
  onSuccess?: (event: ActionEvent, config: LoadedConfig) => void;
};

export type LoadedConfig = {
  basePath: string;

  workspace?: string;
  contracts: Array<string>;
  predicates: Array<string>;
  scripts: Array<string>;
  output: string;

  privateKey?: string;
  providerUrl?: string;
  chainConfig?: string;
  deployConfig?: DeployContractOptions | OptionsFunction;

  useSystemForc?: boolean;
  useSystemFuelCore?: boolean;
  shouldAutoStartFuelCoreNode?: boolean;

  onFailure?: (error: Error, config: LoadedConfig) => void;
  onSuccess?: (event: ActionEvent, config: LoadedConfig) => void;
};
