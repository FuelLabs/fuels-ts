import type { WalletLocked, WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider | undefined;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
  });

  it('wallets', () => {
    // #region wallets
    // #import { Wallet, WalletLocked, WalletUnlocked };

    // We can use the `generate` to create a new unlocked wallet.
    const myWallet: WalletUnlocked = Wallet.generate({ provider });

    // or use an Address to create a wallet
    const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);
    // #endregion wallets

    expect(myWallet.address).toBeTruthy();
    expect(someWallet.address).toBeTruthy();
  });

  it('wallet-locked-to-unlocked', () => {
    const myWallet: WalletUnlocked = Wallet.generate({ provider });
    const PRIVATE_KEY = myWallet.privateKey;

    // #region wallet-locked-to-unlocked
    // #import { Wallet, WalletLocked, WalletUnlocked };

    // Lock an existing wallet
    const lockedWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);

    // Unlock an existing wallet
    const unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
    // #endregion wallet-locked-to-unlocked

    expect(myWallet.address).toBeTruthy();
    expect(unlockedWallet.address).toEqual(myWallet.address);
  });

  it('wallet-unlocked-to-locked', () => {
    const unlockedWallet: WalletUnlocked = Wallet.generate({ provider });

    // #region wallet-unlocked-to-locked
    const newlyLockedWallet = unlockedWallet.lock();
    // #endregion wallet-unlocked-to-locked

    expect(unlockedWallet).toBeTruthy();
    expect(newlyLockedWallet.address).toEqual(unlockedWallet.address);
  });

  it('it can be created without a provider', async () => {
    // #region wallet-optional-provider
    // #context import { Wallet, WalletUnlocked } from 'fuels';

    // You can create a wallet, without a provider
    let unlockedWallet: WalletUnlocked = Wallet.generate();
    unlockedWallet = Wallet.fromPrivateKey(unlockedWallet.privateKey);

    // All non-provider dependent methods are available
    unlockedWallet.lock();

    // All provider dependent methods will throw
    await expect(() => unlockedWallet.getCoins()).rejects.toThrow(/Provider not set/);
    // #endregion wallet-optional-provider
  });
});
