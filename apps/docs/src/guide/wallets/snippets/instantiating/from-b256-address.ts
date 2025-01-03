// #region instantiating-wallets-8
import type { B256Address, WalletLocked } from 'fuels';
import { Wallet } from 'fuels';

const address: B256Address = `0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f`;

const wallet: WalletLocked = Wallet.fromAddress(address);
// #endregion instantiating-wallets-8

console.log('Wallet should be defined', wallet);
