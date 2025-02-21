import { setupTestProviderAndWallets } from '../../test-utils';

import { deserializeChain, serializeChain } from './chain-info';

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
