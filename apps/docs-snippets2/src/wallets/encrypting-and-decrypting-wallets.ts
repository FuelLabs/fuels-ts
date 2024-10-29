/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
// #region encrypting-and-decrypting-json-wallets-1
import fs from 'fs';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.generate({ provider });

// Encrypt the wallet
const password = 'my-password';
const jsonWallet = await wallet.encrypt(password);

// Save the encrypted wallet to a file
// e.g. const jsonWallet = fs.writeFileSync('secure-path/my-wallet.json', jsonWallet);
// #endregion encrypting-and-decrypting-json-wallets-1

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
// #endregion full
/**
 * @group node
 */
console.log('myBalance', myBalance);
