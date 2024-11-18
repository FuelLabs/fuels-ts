// #region instantiating-wallets-3
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const mnemonic =
  'section gospel lady april mouse huge prosper boy urge fox tackle orient';

const wallet: WalletUnlocked = Wallet.fromMnemonic(mnemonic);
// #endregion instantiating-wallets-3

console.log('Wallet should be defined', wallet);
