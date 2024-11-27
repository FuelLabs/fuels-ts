// #region instantiating-wallets-6
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const jsonWallet = `{"id":"83d1792f-3230-496a-92af-3b44a1524fd6","version":3,"address":"ada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644","crypto":{"cipher":"aes-128-ctr","mac":"6911499ec31a6a6d240220971730374396efd666bd34123d4e3ce85e4cf248c6","cipherparams":{"iv":"40576cbd4f7c84e88b0532320e23b425"},"ciphertext":"3e5e77f23444aa86b397dbc62e14d8b7d3fd7c7fe209e066bb7df17eca398129","kdf":"scrypt","kdfparams":{"dklen":32,"n":8192,"p":1,"r":8,"salt":"b046520d85090ee2abd6285174f37bc01e28846b6bb5edc03ae5f7c13aec03d2"}}}`;

const password = 'password';

const wallet: WalletUnlocked = await Wallet.fromEncryptedJson(
  jsonWallet,
  password
);
// #endregion instantiating-wallets-6

console.log('Wallet should be defined', wallet);
