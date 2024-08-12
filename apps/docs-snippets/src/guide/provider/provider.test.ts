import { Provider, ScriptTransactionRequest, sleep, WalletUnlocked, Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

function decorateResponseWithCustomLogic(response: Response) {
  return response;
}

/**
 * @group node
 * @group browser
 */
describe('Provider', () => {
  it('base examples', async () => {
    using launched = await launchTestNode();

    const mockedProvider = await Provider.create(launched.provider.url);
    vi.spyOn(Provider, 'create').mockResolvedValueOnce(mockedProvider);

    // #region provider-definition
    // #import { Provider, WalletUnlocked };

    const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';

    // Create the provider
    const provider = await Provider.create(FUEL_NETWORK_URL);

    // Querying the blockchain
    const { consensusParameters } = provider.getChain();

    // Create a new wallet
    const wallet = WalletUnlocked.generate({ provider });

    // Get the balances of the wallet (this will be empty until we have assets)
    const { balances } = await wallet.getBalances();
    // []
    // #endregion provider-definition

    expect(provider).toBeDefined();
    expect(provider).toBeInstanceOf(Provider);
    expect(consensusParameters).toBeDefined();
    expect(consensusParameters).toBeInstanceOf(Object);
    expect(balances).toEqual([]);
  });

  test('options: requestMiddleware', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;

    // #region options-requestMiddleware
    // synchronous request middleware
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request: RequestInit) => {
        request.credentials = 'omit';

        return request;
      },
    });

    // asynchronous request middleware
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: async (request: RequestInit) => {
        const credentials = await fetchSomeExternalCredentials();
        request.headers ??= {};
        (request.headers as Record<string, string>).auth = credentials;

        return request;
      },
    });
    // #endregion options-requestMiddleware
  });

  it('options: timeout', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;

    // #region options-timeout
    await Provider.create(FUEL_NETWORK_URL, {
      timeout: 30000, // will abort if request takes 30 seconds to complete
    });
    // #endregion options-timeout
  });

  it('options: retryOptions', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;

    // #region options-retryOptions
    await Provider.create(FUEL_NETWORK_URL, {
      retryOptions: {
        maxRetries: 5,
        baseDelay: 100,
        backoff: 'linear',
      },
    });
    // #endregion options-retryOptions
  });

  it('options: fetch', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;

    // #region options-fetch
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url: string, requestInit: RequestInit | undefined) => {
        // do something
        await sleep(100);

        // native fetch
        const response = await fetch(url, requestInit);

        const updatedResponse = decorateResponseWithCustomLogic(response);

        return updatedResponse;
      },
    });
    // #endregion options-fetch
  });

  it('options: resourceCacheTTL', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;
    // #region options-cache-utxo
    const provider = await Provider.create(FUEL_NETWORK_URL, {
      resourceCacheTTL: 5000, // cache resources (Coin's and Message's) for 5 seconds
    });
    // #endregion options-cache-utxo

    expect(provider).toBeDefined();
  });

  it('fetches the base asset ID', async () => {
    const recipientAddress = Address.fromRandom();
    using launched = await launchTestNode();

    const mockedProvider = await Provider.create(launched.provider.url);
    vi.spyOn(Provider, 'create').mockResolvedValueOnce(mockedProvider);

    // #region provider-getBaseAssetId
    // #import { Provider, ScriptTransactionRequest };

    const NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';

    // Fetch the base asset ID using the provider
    const provider = await Provider.create(NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    // 0x...

    // Create a transaction request
    const transactionRequest = new ScriptTransactionRequest();
    // Use the base asset for an operation
    transactionRequest.addCoinOutput(recipientAddress, 100, baseAssetId);
    // #endregion provider-getBaseAssetId

    expect(baseAssetId).toBeDefined();
  });

  it('using operations', async () => {
    using launched = await launchTestNode();

    const FUEL_NETWORK_URL = launched.provider.url;

    // #region operations
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const chain = await provider.operations.getChain();
    const nodeInfo = await provider.operations.getNodeInfo();
    // #endregion operations

    expect(chain).toBeDefined();
    expect(nodeInfo).toBeDefined();
  });
});
