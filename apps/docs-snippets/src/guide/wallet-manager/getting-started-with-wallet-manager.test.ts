import { WalletManager } from '@fuel-ts/wallet-manager';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

describe(__filename, () => {
  it('instantiates the WalletManager', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // #region getting-started-with-wallet-manager-1
    const walletManager = new WalletManager();
    // #endregion getting-started-with-wallet-manager-1

    // #region getting-started-with-wallet-manager-2
    const password = 'my-password';

    await walletManager.unlock(password);
    // #endregion getting-started-with-wallet-manager-2

    // #region getting-started-with-wallet-manager-3
    const myWallet = Wallet.generate({
      provider,
    });

    const privateKey = myWallet.privateKey;

    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
      title: 'My first private key vault',
      provider,
    });
    // #endregion getting-started-with-wallet-manager-3

    // #region getting-started-with-wallet-manager-4
    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
      title: 'My second private key vault',
      provider,
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

    expect(vaults).toStrictEqual([
      {
        title: 'My first private key vault',
        type: 'privateKey',
        vaultId: 0,
      },
      {
        title: 'My second private key vault',
        type: 'privateKey',
        vaultId: 1,
      },
    ]);

    // #region getting-started-with-wallet-manager-7
    const retrievedWallet = walletManager.getWallet(myWallet.address);
    // #endregion getting-started-with-wallet-manager-7

    expect(retrievedWallet.address.equals(myWallet.address)).toBeTruthy();
    expect(vaults.length).toBeGreaterThan(0);
  });
});
