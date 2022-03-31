import { WalletManager } from './wallet-manager';

describe('Wallet Manager', () => {
  it('Initiate lock', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.lock(password);

    expect(walletManager).toBeTruthy();
    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.state).toBe(null);
  });
});
