// #region encrypting-and-decrypting-json-wallets-2
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

/**
 * @group node
 */
const provider = await Provider.create(LOCAL_NETWORK_URL);

const newJsonWallet = await Wallet.generate({
  provider,
}).encrypt('my-password');

// Load the encrypted wallet from a file
// const jsonWallet = fs.readFileSync('secure-path/my-wallet.json', 'utf-8');

// Decrypt the wallet
const newPassword = 'my-password';
const decryptedWallet = await Wallet.fromEncryptedJson(
  newJsonWallet,
  newPassword,
  provider
);

// Use the decrypted wallet
const myBalance = await decryptedWallet.getBalance();
// #endregion encrypting-and-decrypting-json-wallets-2
console.log('myBalance', myBalance);
