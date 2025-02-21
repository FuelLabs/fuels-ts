import { bn } from '@fuel-ts/math';

import type { NodeInfo, SerializedNodeInfo } from '../provider';

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
