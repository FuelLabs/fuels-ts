import { WalletManager } from '@fuel-ts/wallet-manager';
import { Wallet } from 'fuels';

describe(__filename, () => {
  it('should instantiate and use a WalletManager just fine', async () => {
    // #region getting-started-with-wallet-manager-1
    const walletManager = new WalletManager();
    // #endregion getting-started-with-wallet-manager-1

    // #region getting-started-with-wallet-manager-2
    const password = 'my-password';

    await walletManager.unlock(password);
    // #endregion getting-started-with-wallet-manager-2

    // #region getting-started-with-wallet-manager-3
    const myWallet = Wallet.generate();

    const privateKey = myWallet.privateKey;

    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
      title: 'My first private key vault',
    });
    // #endregion getting-started-with-wallet-manager-3

    // #region getting-started-with-wallet-manager-4
    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
      title: 'My second private key vault',
    });
    // #endregion getting-started-with-wallet-manager-4

    // #region getting-started-with-wallet-manager-5
    const vaults = walletManager.getVaults();

    // #context console.log(vaults);
    // #endregion getting-started-with-wallet-manager-5

    // #region getting-started-with-wallet-manager-6
    // #context [
    // #context   {
    // #context     title: 'My first private key vault',
    // #context     type: 'privateKey',
    // #context     vaultId: 0
    // #context   },
    // #context   {
    // #context     title: 'My second private key vault',
    // #context     type: 'privateKey',
    // #context     vaultId: 1
    // #context   }
    // #context ]
    // #endregion getting-started-with-wallet-manager-6

    // #region getting-started-with-wallet-manager-7
    const retrievedWallet = walletManager.getWallet(myWallet.address);
    // #endregion getting-started-with-wallet-manager-7

    expect(retrievedWallet.address.equals(myWallet.address)).toBeTruthy();
    expect(vaults.length).toBeGreaterThan(0);
  });
});
