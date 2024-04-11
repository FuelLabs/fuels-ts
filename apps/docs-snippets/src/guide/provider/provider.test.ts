import { FUEL_NETWORK_URL, Provider, ScriptTransactionRequest, ZeroBytes32, sleep } from 'fuels';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

/**
 * @group node
 * @group browser
 */
describe('Provider', () => {
  it('can connect using pre-defined constants', async () => {
    // #region provider-definition
    // #import { Provider, FUEL_NETWORK_URL };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const { consensusParameters } = provider.getChain();
    // #endregion provider-definition

    expect(provider).toBeDefined();
    expect(provider).toBeInstanceOf(Provider);
    expect(consensusParameters).toBeDefined();
    expect(consensusParameters).toBeInstanceOf(Object);
  });

  it('can be given options', async () => {
    // #region provider-options
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url: string, requestInit: RequestInit | undefined) => {
        // do something
        await sleep(100);
        return fetch(url, requestInit);
      },
      timeout: 2000,
      cacheUtxo: 1500,
      requestMiddleware: async (request: RequestInit) => {
        const credentials = await fetchSomeExternalCredentials();
        request.headers ??= {};
        (request.headers as Record<string, string>).Authorization = credentials;

        return request;
      },
      retryOptions: {
        maxRetries: 5,
        baseDelay: 100,
        backoff: 'exponential',
      },
    });
    // #endregion provider-options
  });

  it('fetches the base asset ID', async () => {
    // #region provider-getBaseAssetId
    // #import { Provider, FUEL_NETWORK_URL, ScriptTransactionRequest };

    // Fetch the base asset ID using the provider
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    // 0x...

    // Create a transaction request and pass the base asset ID
    const transactionRequest = new ScriptTransactionRequest({ baseAssetId });
    // #endregion provider-getBaseAssetId

    expect(baseAssetId).toBe(ZeroBytes32);
    expect(transactionRequest.baseAssetId).toBe(baseAssetId);
  });

  it('using operations', async () => {
    // #region operations
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const chain = await provider.operations.getChain();
    const nodeInfo = await provider.operations.getNodeInfo();
    // #endregion operations

    expect(chain).toBeDefined();
    expect(nodeInfo).toBeDefined();
  });
});
