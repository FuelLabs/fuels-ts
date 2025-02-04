// #region getBalances-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { balances } = await provider.getBalances(wallet.address);
// [
//   { amount: bn(42), assetId: baseAssetId } // total amount of baseAssetId
//   { amount: bn(100), assetId: assetIdA } // total amount of assetIdA
// ]
// #endregion getBalances-1

// #region getBalances-2
await wallet.getBalances();
// #endregion getBalances-2

console.log('balances', balances);
