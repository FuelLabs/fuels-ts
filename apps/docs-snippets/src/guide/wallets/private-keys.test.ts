import type { WalletLocked, WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Signer, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  let provider: Provider;
  let wallet: WalletUnlocked;
  let privateKey: string;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = Wallet.generate({ provider });
    privateKey = wallet.privateKey;
  });

  it('wallet-from-private-key', () => {
    const lockedWallet: WalletLocked = wallet.lock();
    const PRIVATE_KEY = privateKey;

    // #region wallet-from-private-key
    // unlock an existing unlocked wallet
    let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
    // or directly from a private key
    unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion wallet-from-private-key

    expect(unlockedWallet.address).toStrictEqual(wallet.address);
  });

  it('signer-address', () => {
    const PRIVATE_KEY = privateKey;

    // #region signer-address
    const signer = new Signer(PRIVATE_KEY);
    // #endregion signer-address

    expect(wallet.address).toStrictEqual(signer.address);
  });
});
