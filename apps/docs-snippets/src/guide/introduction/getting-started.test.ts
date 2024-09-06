import {, Provider, Wallet, WalletUnlocked } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Getting started', () => {
  it('can connect to a local network', async () => {
    using launched = await launchTestNode();

    const mockedProvider = await Provider.create(launched.provider.url);
    vi.spyOn(Provider, 'create').mockResolvedValueOnce(mockedProvider);

    // #region connecting-to-the-local-node
    // #import { Provider, Wallet };

    // Create a provider.
    const LOCAL_FUEL_NETWORK = `http://127.0.0.1:4000/v1/graphql`;
    const provider = await Provider.create(LOCAL_FUEL_NETWORK);

    // Create our wallet (with a private key).
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion connecting-to-the-local-node

    expect(provider).toBeTruthy();
    expect(provider).toBeInstanceOf(Provider);
    expect(wallet).toBeTruthy();
    expect(wallet).toBeInstanceOf(WalletUnlocked);
  });

  it('can connect to testnet', async () => {
    using launched = await launchTestNode();

    const mockedProvider = await Provider.create(launched.provider.url);
    vi.spyOn(Provider, 'create').mockResolvedValueOnce(mockedProvider);

    // #region connecting-to-the-testnet
    // #import { Provider, Wallet };

    // Create a provider, with the Latest Testnet URL.
    const provider = await Provider.create('https://testnet.fuel.network/v1/graphql');

    // Create our wallet (with a private key).
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    // Perform a balance check.
    const { balances } = await wallet.getBalances();
    // [{ assetId: '0x..', amount: bn(..) }, ..]
    // #endregion connecting-to-the-testnet

    expect(balances).toBeTruthy();
    expect(balances).toBeInstanceOf(Array);
  });
});
