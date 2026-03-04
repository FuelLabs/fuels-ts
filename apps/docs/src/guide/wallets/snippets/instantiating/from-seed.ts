// #region instantiating-wallets-4
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const seed =
  '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

const wallet: WalletUnlocked = Wallet.fromSeed(seed);
// #endregion instantiating-wallets-4

console.log('Wallet should be defined', wallet);
