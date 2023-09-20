import type { GqlNodeInfoFragmentFragment } from '../../src/__generated__/operations';

export const MOCK_NODE_INFO: GqlNodeInfoFragmentFragment = {
  __typename: 'NodeInfo',
  utxoValidation: true,
  vmBacktrace: true,
  minGasPrice: '0',
  maxTx: '4064',
  maxDepth: '10',
  nodeVersion: '0.20.4',
};
