import { setupTestProviderAndWallets } from '../../test-utils';
import Provider from '../provider';

import {
  deserializeChain,
  serializeChain,
  deserializeNodeInfo,
  serializeNodeInfo,
  serializeProviderCache,
  deserializeProviderCache,
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

  describe('ProviderCache', () => {
    it('should serialize and deserialize provider cache', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const cache = await serializeProviderCache(provider);
      const deserializedCache = deserializeProviderCache(cache);

      const { consensusParametersTimestamp, chain, nodeInfo } = deserializedCache;
      expect(consensusParametersTimestamp).toEqual(provider.consensusParametersTimestamp);
      // @ts-expect-error - ignore private cache
      expect(chain).toEqual(Provider.chainInfoCache[provider.url]);
      // @ts-expect-error - ignore private cache
      expect(nodeInfo).toEqual(Provider.nodeInfoCache[provider.url]);
    });
  });
});
