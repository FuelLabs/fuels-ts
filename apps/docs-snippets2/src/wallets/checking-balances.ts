// #region full
// #region checking-balances-1
import type { BN } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY, WALLET_PVT_KEY_2 } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const myWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// The returned amount is a BigNumber
const balance: BN = await myWallet.getBalance(provider.getBaseAssetId());

console.log('balance', balance);
// #endregion checking-balances-1

// #region checking-balances-2
const myOtherWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const { balances } = await myOtherWallet.getBalances();
console.log('balances:', balances);
// #endregion checking-balances-2
// #endregion full
