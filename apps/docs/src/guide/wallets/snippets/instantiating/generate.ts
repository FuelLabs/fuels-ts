// #region instantiating-wallets-1
import { Wallet } from 'fuels';
import type { WalletUnlocked } from 'fuels';

const wallet: WalletUnlocked = Wallet.generate();
// #endregion instantiating-wallets-1

console.log('Wallet should be defined', wallet);
