// #region instantiating-wallets-9
import type { WalletLocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS);
wallet.connect(provider);
// #endregion instantiating-wallets-9

console.log('Wallet should be defined', wallet);
