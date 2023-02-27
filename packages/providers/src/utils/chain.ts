import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

import type { GqlChainInfoFragmentFragment } from '../__generated__/operations';

import { createOperations } from './operations';

/**
 * Chain information
 */
export type ChainInfo = {
  name: string;
  baseChainHeight: BN;
  peerCount: number;
  consensusParameters: {
    contractMaxSize: BN;
    maxInputs: BN;
    maxOutputs: BN;
    maxWitnesses: BN;
    maxGasPerTx: BN;
    maxScriptLength: BN;
    maxScriptDataLength: BN;
    maxStorageSlots: BN;
    maxPredicateLength: BN;
    maxPredicateDataLength: BN;
    gasPriceFactor: BN;
    gasPerByte: BN;
    maxMessageDataLength: BN;
  };
  latestBlock: {
    id: string;
    height: BN;
    time: string;
    transactions: Array<{ id: string }>;
  };
};

const processGqlChain = (chain: GqlChainInfoFragmentFragment): ChainInfo => {
  const { name, baseChainHeight, peerCount, consensusParameters, latestBlock } = chain;

  return {
    name,
    baseChainHeight: bn(baseChainHeight),
    peerCount,
    consensusParameters: {
      contractMaxSize: bn(consensusParameters.contractMaxSize),
      maxInputs: bn(consensusParameters.maxInputs),
      maxOutputs: bn(consensusParameters.maxOutputs),
      maxWitnesses: bn(consensusParameters.maxWitnesses),
      maxGasPerTx: bn(consensusParameters.maxGasPerTx),
      maxScriptLength: bn(consensusParameters.maxScriptLength),
      maxScriptDataLength: bn(consensusParameters.maxScriptDataLength),
      maxStorageSlots: bn(consensusParameters.maxStorageSlots),
      maxPredicateLength: bn(consensusParameters.maxPredicateLength),
      maxPredicateDataLength: bn(consensusParameters.maxPredicateDataLength),
      gasPriceFactor: bn(consensusParameters.gasPriceFactor),
      gasPerByte: bn(consensusParameters.gasPerByte),
      maxMessageDataLength: bn(consensusParameters.maxMessageDataLength),
    },
    latestBlock: {
      id: latestBlock.id,
      height: bn(latestBlock.header.height),
      time: latestBlock.header.time,
      transactions: latestBlock.transactions.map((i) => ({
        id: i.id,
      })),
    },
  };
};

export const getChain = async (url: string): Promise<ChainInfo> => {
  const { getChain: getChainOperation } = createOperations(url);
  const { chain } = await getChainOperation();

  return processGqlChain(chain);
};
