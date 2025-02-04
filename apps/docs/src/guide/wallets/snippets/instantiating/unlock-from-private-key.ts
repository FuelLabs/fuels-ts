// #region instantiating-wallets-7
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const address =
  '0x4cb2b5d2bdbcc8dbdbf91cd00be3e2deedb0ea0f34c969c0ed741a1925111a87';
const privateKey =
  '0x9deba03f08676716e3a4247797672d8008a5198d183048be65415ef89447b890';

const lockedWallet: WalletLocked = Wallet.fromAddress(address);

const wallet: WalletUnlocked = lockedWallet.unlock(privateKey);
// #endregion instantiating-wallets-7

console.log('Wallet should be defined', wallet);
console.log('Wallet private key should be defined', wallet.privateKey);
