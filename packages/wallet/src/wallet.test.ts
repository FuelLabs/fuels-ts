import { Wallet } from './wallet';
import type { WalletUnlocked } from './wallets';

describe('Wallet', () => {
  let wallet: WalletUnlocked;

  beforeAll(() => {
    wallet = Wallet.generate();
  });

  it('Instantiate a new wallet', async () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Unlock a locked wallet', async () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    expect(lockedWallet.address).toEqual(wallet.address);
  });

  it('Unlock a locked wallet', async () => {
    const lockedWallet = Wallet.fromAddress(wallet.address);
    const unlockedWallet = lockedWallet.unlock(wallet.privateKey);
    expect(unlockedWallet.address).toEqual(lockedWallet.address);
    expect(unlockedWallet.privateKey).toEqual(wallet.privateKey);
  });
});
