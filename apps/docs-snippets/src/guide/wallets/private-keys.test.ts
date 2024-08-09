import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Signer, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Private keys', () => {
  it('wallet-from-private-key', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    const lockedWallet: WalletLocked = testWallet.lock();
    const PRIVATE_KEY = privateKey;

    // #region wallet-from-private-key
    // unlock an existing unlocked wallet
    let unlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
    // or directly from a private key
    unlockedWallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
    // #endregion wallet-from-private-key

    expect(unlockedWallet.address).toStrictEqual(testWallet.address);
  });

  it('signer-address', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [testWallet],
    } = launched;
    const privateKey = testWallet.privateKey;

    const PRIVATE_KEY = privateKey;

    // #region signer-address
    const signer = new Signer(PRIVATE_KEY);
    // #endregion signer-address

    expect(testWallet.address).toStrictEqual(signer.address);
  });
});
