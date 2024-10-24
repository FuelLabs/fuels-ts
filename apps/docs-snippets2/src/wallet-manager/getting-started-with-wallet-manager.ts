/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { WalletManager, Wallet, Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

// #region getting-started-with-wallet-manager-1

// Initialize a WalletManager
const walletManager = new WalletManager();
// #endregion getting-started-with-wallet-manager-1

// #region getting-started-with-wallet-manager-2
const password = 'my-password';

await walletManager.unlock(password);
// #endregion getting-started-with-wallet-manager-2

// #region getting-started-with-wallet-manager-3
// Initialize a Provider
const provider = await Provider.create(LOCAL_NETWORK_URL);
const myWallet = Wallet.generate({
  provider,
});

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

console.log(vaults);
// #endregion getting-started-with-wallet-manager-5

// #region getting-started-with-wallet-manager-6

// #endregion getting-started-with-wallet-manager-6

// #region getting-started-with-wallet-manager-7
const retrievedWallet = walletManager.getWallet(myWallet.address);
// #endregion getting-started-with-wallet-manager-7

// #endregion full
