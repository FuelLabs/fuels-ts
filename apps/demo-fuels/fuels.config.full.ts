/* eslint-disable no-console */
import { createConfig } from 'fuels';
import type { CommandEvent, ContractDeployOptions, FuelsConfig } from 'fuels/src/cli/types';

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
  // Default: http://127.0.0.1:4000/graphql
  providerUrl: 'http://network:port/graphql',
  // #endregion providerUrl

  // #region chainConfig
  chainConfig: './my/custom/chainConfig.json',
  // #endregion chainConfig

  // #region autoStartFuelCore
  autoStartFuelCore: true,
  // #endregion autoStartFuelCore

  // #region fuelCorePort
  // Default: first free port, starting from 4000
  fuelCorePort: 4000,
  // #endregion fuelCorePort

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
      gasPrice: 1,
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

  // #region onSuccess
  onSuccess: (event: CommandEvent, config: FuelsConfig) => {
    console.log('fuels:onSuccess', { event, config });
  },
  // #endregion onSuccess

  // #region onFailure
  onFailure: (error: Error, config: FuelsConfig) => {
    console.log('fuels:onFailure', { error, config });
  },
  // #endregion onFailure

  // #region useBuiltInForc
  // Default: undefined
  useBuiltinForc: false,
  // #endregion useBuiltInForc

  // #region useBuiltInFuelCore
  // Default: undefined
  useBuiltinFuelCore: false,
  // #endregion useBuiltInFuelCore
});

export const simpleDeployConfig = createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  // #region deployConfig-obj
  deployConfig: {
    gasPrice: 1,
  },
  // #endregion deployConfig-obj
});
