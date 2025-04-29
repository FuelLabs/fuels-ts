import { hexlify } from '@fuel-ts/utils';
import { ASSET_A } from '@fuel-ts/utils/test-utils';

import { setupTestProviderAndWallets } from '../../test-utils';
import Provider from '../provider';

import {
  deserializeChain,
  serializeChain,
  deserializeNodeInfo,
  serializeNodeInfo,
  serializeProviderCache,
  deserializeProviderCache,
  type TransactionSummaryJson,
} from './serialization';

/**
 * @group node
 * @group browser
 */
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

    it('should be able to convert to JSON and back and be unchanged', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;
      const { chain } = await provider.operations.getChain();
      const deserializedChainInfo = deserializeChain(chain);
      const serializedChainInfo = serializeChain(deserializedChainInfo);

      const jsonChainInfo = JSON.parse(JSON.stringify(serializedChainInfo));

      expect(jsonChainInfo).toEqual(serializedChainInfo);
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

    it('should be able to convert to JSON and back and be unchanged', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;
      const { nodeInfo } = await provider.operations.getNodeInfo();
      const deserializedNodeInfo = deserializeNodeInfo(nodeInfo);
      const serializedNodeInfo = serializeNodeInfo(deserializedNodeInfo);

      const jsonNodeInfo = JSON.parse(JSON.stringify(serializedNodeInfo));

      expect(jsonNodeInfo).toEqual(serializedNodeInfo);
    });
  });

  describe('ProviderCache', () => {
    it('should serialize and deserialize provider cache', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      await provider.init();

      const cache = await serializeProviderCache(provider);
      const deserializedCache = deserializeProviderCache(cache);

      const { consensusParametersTimestamp, chain, nodeInfo } = deserializedCache;
      expect(consensusParametersTimestamp).toEqual(provider.consensusParametersTimestamp);
      // @ts-expect-error - ignore private cache
      expect(chain).toEqual(Provider.chainInfoCache[provider.url]);
      // @ts-expect-error - ignore private cache
      expect(nodeInfo).toEqual(Provider.nodeInfoCache[provider.url]);
    });

    it('should be able to convert to JSON and back and be unchanged', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;
      const cache = await serializeProviderCache(provider);
      const jsonCache = JSON.parse(JSON.stringify(cache));

      expect(jsonCache).toEqual(cache);
    });
  });

  describe('TransactionSummary', () => {
    it('should be able to convert to JSON and back and be unchanged', async () => {
      using launched = await setupTestProviderAndWallets();
      const {
        provider,
        wallets: [sender, receiver],
      } = launched;
      const chainId = await provider.getChainId();
      const request = await sender.createTransfer(receiver.address, 1000, ASSET_A);
      const { gasPrice, rawReceipts } = await provider.getTransactionCost(request);
      const serializedTransactionSummary: TransactionSummaryJson = {
        gasPrice: gasPrice.toString(),
        receipts: rawReceipts,
        id: request.getTransactionId(chainId),
        transactionBytes: hexlify(request.toTransactionBytes()),
      };

      const jsonTransactionSummary = JSON.parse(JSON.stringify(serializedTransactionSummary));

      expect(jsonTransactionSummary).toEqual(serializedTransactionSummary);
    });
  });
});
