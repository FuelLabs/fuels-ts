import {
  GqlConsensusParametersVersion,
  GqlContractParametersVersion,
  GqlFeeParametersVersion,
  GqlPredicateParametersVersion,
  GqlScriptParametersVersion,
  GqlTxParametersVersion,
  type GqlChainInfoFragment,
} from '../../src/providers/__generated__/operations';

export const MOCK_CHAIN: GqlChainInfoFragment = {
  name: 'local_testnet',
  daHeight: '234',
  consensusParameters: {
    version: GqlConsensusParametersVersion.V1,
    txParams: {
      version: GqlTxParametersVersion.V1,
      maxInputs: '255',
      maxOutputs: '255',
      maxWitnesses: '255',
      maxGasPerTx: '5000000000',
      maxSize: '17825792',
      maxBytecodeSubsections: '255',
    },
    scriptParams: {
      version: GqlScriptParametersVersion.V1,
      maxScriptLength: '1048576',
      maxScriptDataLength: '1048576',
    },
    contractParams: {
      version: GqlContractParametersVersion.V1,
      contractMaxSize: '16777216',
      maxStorageSlots: '255',
    },
    predicateParams: {
      version: GqlPredicateParametersVersion.V1,
      maxPredicateLength: '1048576',
      maxPredicateDataLength: '1048576',
      maxGasPerPredicate: '100000000',
      maxMessageDataLength: '1048576',
    },
    feeParams: {
      version: GqlFeeParametersVersion.V1,

      gasPerByte: '4',
      gasPriceFactor: '1000000000',
    },
    baseAssetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
    chainId: '0',
    gasCosts: {
      ecr1: '3000',
      s256: {
        type: 'LightOperation',
        base: '2',
        unitsPerGas: '214',
      },
      contractRoot: {
        type: 'LightOperation',
        base: '75',
        unitsPerGas: '1',
      },
      stateRoot: {
        type: 'LightOperation',
        base: '412',
        unitsPerGas: '1',
      },
      vmInitialization: {
        type: 'HeavyOperation',
        base: '2000',
        gasPerUnit: '0',
      },
      newStoragePerByte: '1',
    },
  },
};
