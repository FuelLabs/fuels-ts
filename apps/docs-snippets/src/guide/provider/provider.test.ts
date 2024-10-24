import { Provider, ScriptTransactionRequest, WalletUnlocked, Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

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

  it('fetches the base asset ID', async () => {
    const recipientAddress = Address.fromRandom();
    using launched = await launchTestNode();

    const mockedProvider = await Provider.create(launched.provider.url);
    vi.spyOn(Provider, 'create').mockResolvedValueOnce(mockedProvider);

    // #region provider-getBaseAssetId
    // #import { Provider, ScriptTransactionRequest };

    const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/v1/graphql';

    // Fetch the base asset ID using the provider
    const provider = await Provider.create(FUEL_NETWORK_URL);
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
