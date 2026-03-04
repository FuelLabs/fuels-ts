import type { AssetId } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoAssetIdFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoAssetIdFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const assetId: AssetId = {
  bits: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
};

const { value } = await contract.functions
  .echo_asset_id_comparison(assetId)
  .get();
// #endregion snippet-1
console.log('value', value);
