// #region instantiating-wallets-10
import type { WalletLocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS, provider);
// #endregion instantiating-wallets-10

console.log('Wallet should be defined', wallet);
