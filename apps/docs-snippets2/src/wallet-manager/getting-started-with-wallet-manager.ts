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

// #context console.log(vaults);
// #endregion getting-started-with-wallet-manager-5

// #region getting-started-with-wallet-manager-6

console.assert(
  JSON.stringify(vaults) ===
    JSON.stringify([
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
    ]),
  'Vaults do not match expected structure'
);
// #endregion getting-started-with-wallet-manager-6

// #region getting-started-with-wallet-manager-7
const retrievedWallet = walletManager.getWallet(myWallet.address);
console.assert(retrievedWallet.address.equals(myWallet.address), 'Wallets do not match');
console.assert(vaults.length > 0, 'Vaults length should be greater than 0');
// #endregion getting-started-with-wallet-manager-7

// #endregion full
