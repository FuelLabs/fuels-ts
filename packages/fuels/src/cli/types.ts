import type { DeployContractOptions } from '@fuel-ts/contract';

export enum Commands {
  build = 'build',
  deploy = 'deploy',
  dev = 'dev',
  init = 'init',
  versions = 'versions',
  node = 'node',
}

export type CommandEvent =
  | {
      type: Commands.build;
      data: void;
    }
  | {
      type: Commands.deploy;
      data: DeployedContract[];
    }
  | {
      type: Commands.dev;
      data: void;
    }
  | {
      type: Commands.init;
      data: void;
    }
  | {
      type: Commands.versions;
      data: void;
    }
  | {
      type: Commands.node;
      data: void;
    };

export type DeployedContract = {
  name: string;
  contractId: string;
};

export type DeployedScript = {
  path: string;
  blobId: string;
  loaderBytecode: Uint8Array;
  loaderBytecodeHexlified: string;
};

export type DeployedPredicate = {
  path: string;
  offset: number; // TODO: This should not be in this way it should be one offset per configurable
  predicateRoot: string;
  loaderBytecode: Uint8Array;
  loaderBytecodeHexlified: string;
};

export type ContractDeployOptions = {
  contracts: DeployedContract[];
  contractName: string;
  contractPath: string;
};

export type OptionsFunction = (
  options: ContractDeployOptions
) => DeployContractOptions | Promise<DeployContractOptions>;

export type FuelsEventListener<CType extends Commands> = (
  config: FuelsConfig,
  data: Extract<CommandEvent, { type: CType }>['data']
) => void;

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
   * Default: http://localhost:4000/v1/graphql
   */
  providerUrl?: string;

  /**
   * Relative path to directory containing custom configurations for `fuel-core`, such as:
   * - chainConfig.json
   * - metadata.json
   * - stateConfig.json
   */
  snapshotDir?: string;

  /** Static of dyanmic deploy configs to be used when deploying contracts */
  deployConfig?: DeployContractOptions | OptionsFunction;

  /** If set to false, you will need to spin up a Fuel core node by yourself */
  autoStartFuelCore?: boolean;

  /** If set, will use absolute path to forc binary  */
  forcPath?: string;

  /** If set, will use absolute path to forc binary  */
  fuelCorePath?: string;

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
   * Function callback, will be called after a successful build operation
   *
   * @param config - The loaded `fuels.config.ts`
   */
  onBuild?: FuelsEventListener<Commands.build>;

  /**
   * Function callback, will be called after a successful deploy operation
   *
   * @param config - The loaded `fuels.config.ts`
   * @param data - the deployed contracts
   */
  onDeploy?: FuelsEventListener<Commands.deploy>;

  /**
   * Function callback, will be called after a successful dev operation
   *
   * @param config - The loaded `fuels.config.ts`
   */
  onDev?: FuelsEventListener<Commands.dev>;

  /**
   * Function callback, will be called after a successful Node refresh operation
   *
   * @param config - The loaded `fuels.config.ts`
   */
  onNode?: FuelsEventListener<Commands.node>;

  /**
   * Function callback, will be called in case of errors
   * @param config - Configuration in use
   * @param error - Original error object
   */
  onFailure?: (config: FuelsConfig, error: Error) => void;
};

export type FuelsConfig = UserFuelsConfig &
  Required<
    Pick<
      UserFuelsConfig,
      | 'contracts'
      | 'predicates'
      | 'scripts'
      | 'deployConfig'
      | 'autoStartFuelCore'
      | 'forcPath'
      | 'fuelCorePath'
      | 'providerUrl'
      | 'forcBuildFlags'
    >
  > & {
    basePath: string;
    configPath: string;
    buildMode: 'debug' | 'release';
  };
