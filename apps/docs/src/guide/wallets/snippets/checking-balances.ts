// #region checking-balances-1
import type { BN } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const myWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// The returned amount is a BigNumber
const balance: BN = await myWallet.getBalance(provider.getBaseAssetId());

// #endregion checking-balances-1
console.log('balance', balance);
