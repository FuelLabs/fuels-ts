import { bn } from '@fuel-ts/math';

import type { ChainInfo, NodeInfo, SerializedChainInfo, SerializedNodeInfo } from '../provider';

/** @hidden */
export const deserializeChain = (chain: SerializedChainInfo): ChainInfo => {
  const { name, daHeight, consensusParameters } = chain;

  const {
    contractParams,
    feeParams,
    predicateParams,
    scriptParams,
    txParams,
    gasCosts,
    baseAssetId,
    chainId,
    version,
  } = consensusParameters;

  return {
    name,
    baseChainHeight: bn(daHeight),
    consensusParameters: {
      version,
      chainId: bn(chainId),
      baseAssetId,
      feeParameters: {
        version: feeParams.version,
        gasPerByte: bn(feeParams.gasPerByte),
        gasPriceFactor: bn(feeParams.gasPriceFactor),
      },
      contractParameters: {
        version: contractParams.version,
        contractMaxSize: bn(contractParams.contractMaxSize),
        maxStorageSlots: bn(contractParams.maxStorageSlots),
      },
      txParameters: {
        version: txParams.version,
        maxInputs: bn(txParams.maxInputs),
        maxOutputs: bn(txParams.maxOutputs),
        maxWitnesses: bn(txParams.maxWitnesses),
        maxGasPerTx: bn(txParams.maxGasPerTx),
        maxSize: bn(txParams.maxSize),
        maxBytecodeSubsections: bn(txParams.maxBytecodeSubsections),
      },
      predicateParameters: {
        version: predicateParams.version,
        maxPredicateLength: bn(predicateParams.maxPredicateLength),
        maxPredicateDataLength: bn(predicateParams.maxPredicateDataLength),
        maxGasPerPredicate: bn(predicateParams.maxGasPerPredicate),
        maxMessageDataLength: bn(predicateParams.maxMessageDataLength),
      },
      scriptParameters: {
        version: scriptParams.version,
        maxScriptLength: bn(scriptParams.maxScriptLength),
        maxScriptDataLength: bn(scriptParams.maxScriptDataLength),
      },
      gasCosts,
    },
  };
};

/** @hidden */
export const serializeChain = (chain: ChainInfo): SerializedChainInfo => {
  const { name, baseChainHeight, consensusParameters } = chain;

  const {
    contractParameters,
    feeParameters,
    predicateParameters,
    scriptParameters,
    txParameters,
    gasCosts,
    baseAssetId,
    chainId,
    version,
  } = consensusParameters;

  return {
    name,
    daHeight: baseChainHeight.toString(),
    consensusParameters: {
      version,
      chainId: chainId.toString(),
      baseAssetId,
      feeParams: {
        version: feeParameters.version,
        gasPerByte: feeParameters.gasPerByte.toString(),
        gasPriceFactor: feeParameters.gasPriceFactor.toString(),
      },
      contractParams: {
        version: contractParameters.version,
        contractMaxSize: contractParameters.contractMaxSize.toString(),
        maxStorageSlots: contractParameters.maxStorageSlots.toString(),
      },
      txParams: {
        version: txParameters.version,
        maxInputs: txParameters.maxInputs.toString(),
        maxOutputs: txParameters.maxOutputs.toString(),
        maxWitnesses: txParameters.maxWitnesses.toString(),
        maxGasPerTx: txParameters.maxGasPerTx.toString(),
        maxSize: txParameters.maxSize.toString(),
        maxBytecodeSubsections: txParameters.maxBytecodeSubsections.toString(),
      },
      predicateParams: {
        version: predicateParameters.version,
        maxPredicateLength: predicateParameters.maxPredicateLength.toString(),
        maxPredicateDataLength: predicateParameters.maxPredicateDataLength.toString(),
        maxGasPerPredicate: predicateParameters.maxGasPerPredicate.toString(),
        maxMessageDataLength: predicateParameters.maxMessageDataLength.toString(),
      },
      scriptParams: {
        version: scriptParameters.version,
        maxScriptLength: scriptParameters.maxScriptLength.toString(),
        maxScriptDataLength: scriptParameters.maxScriptDataLength.toString(),
      },
      gasCosts,
    },
  };
};

export const deserializeNodeInfo = (nodeInfo: SerializedNodeInfo): NodeInfo => {
  const { maxDepth, maxTx, nodeVersion, utxoValidation, vmBacktrace } = nodeInfo;

  return {
    maxDepth: bn(maxDepth),
    maxTx: bn(maxTx),
    nodeVersion,
    utxoValidation,
    vmBacktrace,
  };
};

export const serializeNodeInfo = (nodeInfo: NodeInfo): SerializedNodeInfo => {
  const { maxDepth, maxTx, nodeVersion, utxoValidation, vmBacktrace } = nodeInfo;

  return {
    maxDepth: maxDepth.toString(),
    maxTx: maxTx.toString(),
    nodeVersion,
    utxoValidation,
    vmBacktrace,
  };
};
