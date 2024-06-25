/* eslint-disable no-console */
import { createConfig } from 'fuels';
import type { ContractDeployOptions, DeployedContract, FuelsConfig } from 'fuels';

const MY_FIRST_DEPLOYED_CONTRACT_NAME = '';

export default createConfig({
  // #region workspace
  workspace: './sway-programs',
  // #endregion workspace

  // #region contracts
  contracts: ['./sway-programs/contracts'],
  // #endregion contracts

  // #region predicates
  predicates: ['./sway-programs/predicates'],
  // #endregion predicates

  // #region scripts
  scripts: ['./sway-programs/scripts'],
  // #endregion scripts

  // #region output
  output: './src/sway-programs-api',
  // #endregion output

  // #region privateKey
  privateKey: '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
  // #endregion privateKey

  // #region providerUrl
  // Default: http://127.0.0.1:4000/v1/graphql
  providerUrl: 'http://network:port/v1/graphql',
  // #endregion providerUrl

  // #region snapshotDir
  snapshotDir: './my/snapshot/dir',
  // #endregion snapshotDir

  // #region autoStartFuelCore
  autoStartFuelCore: true,
  // #endregion autoStartFuelCore

  // #region fuelCorePort
  // Default: first free port, starting from 4000
  fuelCorePort: 4000,
  // #endregion fuelCorePort

  // #region forcBuildFlags
  // Default: []
  forcBuildFlags: ['--release'],
  // #endregion forcBuildFlags

  // #region deployConfig-fn
  deployConfig: async (options: ContractDeployOptions) => {
    // ability to fetch data remotely
    await Promise.resolve(`simulating remote data fetch`);

    // get contract by name
    const { contracts } = options;

    const contract = contracts.find(({ name }) => {
      const found = name === MY_FIRST_DEPLOYED_CONTRACT_NAME;
      return found;
    });

    if (!contract) {
      throw new Error('Contract not found!');
    }

    return {
      storageSlots: [
        {
          key: '0x..',
          /**
           * Here we could initialize a storage slot,
           * using the relevant contract ID.
           */
          value: contract.contractId,
        },
      ],
    };
  },
  // #endregion deployConfig-fn

  // #region onBuild
  onBuild: (config: FuelsConfig) => {
    console.log('fuels:onBuild', { config });
  },
  // #endregion onBuild

  // #region onDeploy
  // #import { DeployedContract, FuelsConfig };

  onDeploy: (config: FuelsConfig, data: DeployedContract[]) => {
    console.log('fuels:onDeploy', { config, data });
  },
  // #endregion onDeploy

  // #region onDev
  onDev: (config: FuelsConfig) => {
    console.log('fuels:onDev', { config });
  },
  // #endregion onDev

  // #region onNode
  onNode: (config: FuelsConfig) => {
    console.log('fuels:onNode', { config });
  },
  // #endregion onNode

  // #region onFailure
  onFailure: (config: FuelsConfig, error: Error) => {
    console.log('fuels:onFailure', { config, error });
  },
  // #endregion onFailure

  // #region forcPath
  // Default: 'forc',
  forcPath: '~/.fuelup/bin/forc',
  // #endregion forcPath

  // #region fuelCorePath
  // Default: 'fuel-core'
  fuelCorePath: '~/.fuelup/bin/fuel-core',
  // #endregion fuelCorePath
});

export const simpleDeployConfig = createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  // #region deployConfig-obj
  deployConfig: {},
  // #endregion deployConfig-obj
});
