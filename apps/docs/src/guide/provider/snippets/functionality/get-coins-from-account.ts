// #region getCoins-2
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = provider.getBaseAssetId();

const { coins } = await wallet.getCoins(baseAssetId);
// [
//   { amount: bn(100), assetId: baseAssetId },
//   ...
// ]
// #endregion getCoins-2

console.log('coinsFromWallet', coins);
