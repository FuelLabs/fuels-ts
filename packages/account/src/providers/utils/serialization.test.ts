import { setupTestProviderAndWallets } from '../../test-utils';

import {
  deserializeChain,
  serializeChain,
  deserializeNodeInfo,
  serializeNodeInfo,
} from './serialization';

describe('Serialization', () => {
  describe('ChainInfo', () => {
    it('should serialize and deserialize chain info', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;
      const { chain } = await provider.operations.getChain();

      const deserializedChainInfo = deserializeChain(chain);
      const serializedChainInfo = serializeChain(deserializedChainInfo);

      expect(serializedChainInfo).toEqual(chain);
    });
  });

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
});
