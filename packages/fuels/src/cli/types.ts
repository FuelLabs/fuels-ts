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
      data: DeployedContract[];
    }
  | {
      type: Commands.dev;
      data: unknown;
    }
  | {
      type: Commands.init;
      data: unknown;
    };

export type DeployedContract = {
  name: string;
  contractId: string;
};

export type ContractDeployOptions = {
  contracts: DeployedContract[];
  contractName: string;
  contractPath: string;
};

export type OptionsFunction = (
  options: ContractDeployOptions
) => DeployContractOptions | Promise<DeployContractOptions>;

export type UserFuelsConfig = {
  /** Relative directory path to Forc workspace */
  workspace?: string;
  /** List of relative directory paths to Sway contracts */
  contracts?: string[];
  /** List of relative directory paths to Sway predicates */
  predicates?: string[];
  /** List of relative directory paths to Sway scripts */
  scripts?: string[];
  /** Relative directory path for generating Typescript definitions */
  output: string;

  /**
   * Wallet private key, used when deploying contracts.
   * Should ideally come from env — `process.env.MY_PRIVATE_KEY`
   */
  privateKey?: string;

  /**
   * Contracts will be deployed using this provider.
   * Default: http://localhost:4000
   */
  providerUrl?: string;

  /** Relative filepath to custom `chainConfig.json` to be used when initializing a Fuel Core node */
  chainConfig?: string;

  /** Static of dyanmic deploy configs to be used when deploying contracts */
  deployConfig?: DeployContractOptions | OptionsFunction;

  /** Opt-in or out from using builtin Forc binaries */
  useBuiltinForc?: boolean;

  /** Opt-in or out from using builtin Fuel Core binaries */
  useBuiltinFuelCore?: boolean;

  /** If set to false, you will need to spin up a Fuel core node by yourself */
  autoStartFuelCore?: boolean;

  /**
   * Port to use when starting a `fuel-core` node
   * Default: first free port, starting from 4000
   */
  fuelCorePort?: number;

  /**
   * Aditional forc build flags to be used when compiling contracts.
   * Default: []
   * Example:
   *  forcBuildFlags: ['--release'];
   */
  forcBuildFlags?: string[];

  /**
   * Function callback, will be called after a successful run
   * @param event - The event that triggered this execution
   * @param config - The loaded `fuels.config.ts`
   */
  onSuccess?: (event: CommandEvent, config: FuelsConfig) => void;

  /**
   * Function callback, will be called in case of errors
   * @param error - Original error object
   * @param config - Configuration in use
   */
  onFailure?: (event: Error, config: FuelsConfig) => void;
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
      | 'providerUrl'
      | 'forcBuildFlags'
    >
  > & {
    basePath: string;
    configPath: string;
    buildMode: 'debug' | 'release';
  };
