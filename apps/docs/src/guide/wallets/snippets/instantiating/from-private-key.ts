// #region instantiating-wallets-2
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const privateKey =
  '0x36ca81ba70f3e04b7cc8780bff42d907ebca508097d4ae3df5147c93fd217f7c';

const wallet: WalletUnlocked = Wallet.fromPrivateKey(privateKey);
// #endregion instantiating-wallets-2

console.log('Wallet should be defined', wallet);
