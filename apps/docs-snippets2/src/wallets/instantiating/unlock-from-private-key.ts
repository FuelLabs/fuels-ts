// #region instantiating-wallets-7
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const address =
  'fuel1fjett54ahnydhklerngqhclzmmkmp6s0xnykns8dwsdpjfg3r2rsfazpw5';
const privateKey =
  '0x9deba03f08676716e3a4247797672d8008a5198d183048be65415ef89447b890';

const lockedWallet: WalletLocked = Wallet.fromAddress(address);

const wallet: WalletUnlocked = lockedWallet.unlock(privateKey);
// #endregion instantiating-wallets-7

console.log('Wallet should be defined', wallet);
console.log('Wallet private key should be defined', wallet.privateKey);
