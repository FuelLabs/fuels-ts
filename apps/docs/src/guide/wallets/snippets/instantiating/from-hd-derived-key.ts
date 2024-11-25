// #region instantiating-wallets-5
import type { WalletUnlocked } from 'fuels';
import { HDWallet, Wallet } from 'fuels';

const seed =
  '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

const extendedKey = HDWallet.fromSeed(seed).toExtendedKey();

const wallet: WalletUnlocked = Wallet.fromExtendedKey(extendedKey);
// #endregion instantiating-wallets-5

console.log('Wallet should be defined', wallet);
