import type { GqlNodeInfoFragment } from '../../src/providers/__generated__/operations';

export const MOCK_NODE_INFO: GqlNodeInfoFragment = {
  utxoValidation: true,
  vmBacktrace: true,
  maxTx: '4064',
  maxGas: '1000000000',
  txPoolStats: {
    totalGas: '100000000000',
    totalSize: '10000000000000',
    txCount: '100',
  },
  maxDepth: '10',
  nodeVersion: '0.22.0',
};
