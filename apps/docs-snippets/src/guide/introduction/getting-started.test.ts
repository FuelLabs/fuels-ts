import { FUEL_LATEST_TESTNET_URL, FUEL_NETWORK_URL, Provider, Wallet } from "fuels";

/**
 * @group node
 * @group browser
 */
describe(__filename, () => {
  beforeAll(() => {
    // Avoids using the actual network.
    vi.spyOn(Provider, 'create')
      .mockImplementationOnce(
        () => Provider.create(FUEL_NETWORK_URL)
      )
  })

  it('can connect to testnet', async () => {
    // #region connecting-to-the-testnet
    // #import { Provider, Wallet, FUEL_LATEST_TESTNET_URL };

    // Setup a provider, with the Testnet URL.
    // > FUEL_LATEST_TESTNET_URL=https://beta-5.fuel.network/graphql
    const provider = await Provider.create(FUEL_LATEST_TESTNET_URL);
    
    // Create our Testnet wallet (with a private key).
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    // Perform a balance check.
    const balances = await wallet.getBalances()
    // [{ assetId: '0x', amount: 42 }, ...]
    // #endregion connecting-to-the-testnet

    expect(balances).toBeTruthy();
    expect(balances).toBeInstanceOf(Array);
  })
})