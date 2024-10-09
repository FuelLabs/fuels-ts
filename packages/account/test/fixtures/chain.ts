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
  latestBlock: {
    id: '0xb9e55ced368c8d8f1aa487d33e97043e5891406792ea5d61f7807d0441d34722',
    height: '234',
    header: {
      time: '4611686020152758037',
      applicationHash: '0x9b4b3f3021fec42b2d946b2c6547841e379716122f78a6f22d65f51d6e1a2746',
      daHeight: '0',
      eventInboxRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      messageOutboxRoot: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      prevRoot: '0x68a08304aa13a972e471d3b15e9a59d18a50301c3990840ed4282b2e7b6a9008',
      stateTransitionBytecodeVersion: '0',
      transactionsCount: '1',
      transactionsRoot: '0x4d9e0e3cda1af0c5bbf3dff9af9025ee2e264cc88bdef9dd103fb3a96d0a21ba',
    },
    transactions: [
      {
        id: '0x304fb90a1a9897d839dcd9a5b93739ca6045638fc6520e2cf5735dd84b2de4a7',
      },
    ],
  },
};
