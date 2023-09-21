import { WalletManager } from '@fuel-ts/wallet-manager';
import { FUEL_NETWORK_URL, Provider } from 'fuels';

describe(__filename, () => {
  it('should', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    // #region locking-and-unlocking-wallet-manager-1
    const walletManager = new WalletManager();

    // #context const password = 'my-password';

    await walletManager.unlock(password);
    // #endregion locking-and-unlocking-wallet-manager-1

    const privateKey = '0xc7079e195cca2495e47b056115f850a8be1f2c4ffe2a806922accb36d2ff0dde';

    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
      provider,
    });

    // #region locking-and-unlocking-wallet-manager-2
    await walletManager.lock();
    // #endregion locking-and-unlocking-wallet-manager-2

    // #region locking-and-unlocking-wallet-manager-3
    await walletManager.unlock(password);
    // #endregion locking-and-unlocking-wallet-manager-3

    // #region locking-and-unlocking-wallet-manager-4
    const isLocked = walletManager.isLocked;

    // #context console.log(isLocked); // Outputs true if locked, false if unlocked
    // #endregion locking-and-unlocking-wallet-manager-4

    expect(isLocked).toBeFalsy();

    // #region locking-and-unlocking-wallet-manager-5
    const newPassword = 'my-new-password';

    await walletManager.updatePassphrase(password, newPassword);
    // #endregion locking-and-unlocking-wallet-manager-5

    // #region locking-and-unlocking-wallet-manager-6
    await walletManager.unlock(newPassword);

    // perform your tasks...

    walletManager.lock(); // Always lock your WalletManager when you're done
    // #endregion locking-and-unlocking-wallet-manager-6

    expect(walletManager).toBeTruthy();
    expect(isLocked).toBeFalsy();
  });
});
