import { setupTestProviderAndWallets } from '../../test-utils';

import { deserializeNodeInfo, serializeNodeInfo } from './node-info';

describe('NodeInfo', () => {
  it('should serialize and deserialize node info', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;
    const { nodeInfo } = await provider.operations.getNodeInfo();

    const deserializedNodeInfo = deserializeNodeInfo(nodeInfo);
    const serializedNodeInfo = serializeNodeInfo(deserializedNodeInfo);

    expect(serializedNodeInfo).toEqual(nodeInfo);
  });
});
