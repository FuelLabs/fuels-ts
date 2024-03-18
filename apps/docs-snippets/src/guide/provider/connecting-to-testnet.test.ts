import type { WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Signer, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('provider-testnet', async () => {
    // #region provider-testnet
    // #import { Provider, WalletUnlocked, Wallet, Signer };

    const provider = await Provider.create('https://beta-5.fuel.network/graphql');
    
    // Setup a private key
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';

    // Create the wallet, passing provider
    const wallet: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    
    // Validate the address
    const signer = new Signer(PRIVATE_KEY);
    expect(wallet.address).toEqual(signer.address);
    // #endregion provider-testnet
  })

  it('provider-local', async () => {
    // #region provider-local
    // #import { Provider, WalletUnlocked, FUEL_NETWORK_URL, Wallet, Signer };

    const localProvider = await Provider.create(FUEL_NETWORK_URL);

    // Setup a private key
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';

    // Create the wallet, passing provider
    const wallet: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY, localProvider);

    const signer = new Signer(PRIVATE_KEY);
    expect(wallet.address).toEqual(signer.address);
    // #endregion provider-local
  })
})