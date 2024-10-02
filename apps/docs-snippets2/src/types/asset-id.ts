// #region full
import type { AssetId } from 'fuels';
import { getRandomB256, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoAssetIdFactory } from '../typegend';

// #region asset-id-1
const bits256 = getRandomB256();

const assetId: AssetId = {
  bits: bits256,
};
// #endregion asset-id-1
const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoAssetIdFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();
assetId.bits = '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c';

// #region asset-id-3
const { value: value1 } = await contract.functions.echo_asset_id_comparison(assetId).get();

expect(value1).toBeTruthy();
// #endregion asset-id-3

// #region asset-id-4
const { value: value2 } = await contract.functions.echo_asset_id().get();

expect(value2).toEqual(assetId);
// #endregion asset-id-4
// #endregion full
