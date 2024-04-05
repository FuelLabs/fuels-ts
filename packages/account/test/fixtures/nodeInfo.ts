import type { GqlNodeInfoFragmentFragment } from '../../src/providers/__generated__/operations';

export const MOCK_NODE_INFO: GqlNodeInfoFragmentFragment = {
  __typename: 'NodeInfo',
  utxoValidation: true,
  vmBacktrace: true,
  maxTx: '4064',
  maxDepth: '10',
  nodeVersion: '0.22.0',
};
