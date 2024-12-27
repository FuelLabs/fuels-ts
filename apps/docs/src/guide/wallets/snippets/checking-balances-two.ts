// #region checking-balances-2
import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY_2, LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const myOtherWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const { balances } = await myOtherWallet.getBalances();
// #endregion checking-balances-2
console.log('balances:', balances);
