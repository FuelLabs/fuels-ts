import type { BigNumberish, CoinQuantity, WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, FUEL_NETWORK_URL, BaseAssetId, Wallet } from 'fuels';

describe(__filename, () => {
  test('it can work with wallets', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // #region wallets
    // #context import { Wallet, WalletLocked, WalletUnlocked } from 'fuels';

    // use the `generate` helper to make an Unlocked Wallet
    const myWallet: WalletUnlocked = Wallet.generate({
      provider,
    });

    // or use an Address to create a wallet
    const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);
    // #endregion wallets

    const PRIVATE_KEY = myWallet.privateKey;

    // #region wallet-locked-to-unlocked
    const lockedWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);
    // #region wallet-from-private-key
    // unlock an existing wallet
    let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
    // or directly from a private key
    unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion wallet-locked-to-unlocked
    // #endregion wallet-from-private-key

    // #region wallet-unlocked-to-locked
    const newlyLockedWallet = unlockedWallet.lock();
    // #endregion wallet-unlocked-to-locked

    // #region wallet-check-balance
    // #context import { Wallet, WalletUnlocked, BigNumberish} from 'fuels';
    const balance: BigNumberish = await myWallet.getBalance(BaseAssetId);
    // #endregion wallet-check-balance

    // #region wallet-check-balances
    // #context import { Wallet, WalletUnlocked, CoinQuantity} from 'fuels';
    const balances: CoinQuantity[] = await myWallet.getBalances();
    // #endregion wallet-check-balances

    expect(newlyLockedWallet.address).toEqual(someWallet.address);
    expect(balance).toBeTruthy();
    expect(balances.length).toEqual(0);
  });
});
