import type { GqlChainInfoFragmentFragment } from '../../src/__generated__/operations';

export const MOCK_CHAIN: GqlChainInfoFragmentFragment = {
  __typename: 'ChainInfo',
  name: 'local_testnet',
  daHeight: '234',
  peerCount: 0,
  consensusParameters: {
    __typename: 'ConsensusParameters',
    txParams: {
      __typename: 'TxParameters',
      maxInputs: '255',
      maxOutputs: '255',
      maxWitnesses: '255',
      maxGasPerTx: '500000000',
      maxSize: '17825792',
    },
    scriptParams: {
      __typename: 'ScriptParameters',
      maxScriptLength: '1048576',
      maxScriptDataLength: '1048576',
    },
    contractParams: {
      __typename: 'ContractParameters',
      contractMaxSize: '16777216',
      maxStorageSlots: '255',
    },
    predicateParams: {
      __typename: 'PredicateParameters',
      maxPredicateLength: '1048576',
      maxPredicateDataLength: '1048576',
      maxGasPerPredicate: '100000000',
      maxMessageDataLength: '1048576',
    },
    feeParams: {
      __typename: 'FeeParameters',
      gasPerByte: '4',
      gasPriceFactor: '1000000000',
    },
    baseAssetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
    chainId: '0',
  },
  latestBlock: {
    __typename: 'Block',
    id: '0xb9e55ced368c8d8f1aa487d33e97043e5891406792ea5d61f7807d0441d34722',
    header: { __typename: 'Header', height: '234', time: '4611686020122537935' },
    transactions: [
      {
        __typename: 'Transaction',
        id: '0x304fb90a1a9897d839dcd9a5b93739ca6045638fc6520e2cf5735dd84b2de4a7',
      },
    ],
  },
};
