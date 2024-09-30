// #region full
import { AssetId, getRandomB256, Provider, Wallet } from 'fuels';
import { EchoAssetIdFactory } from '../typegend';
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';

// #region asset-id-1
const bits256 = getRandomB256();

let assetId: AssetId = {
  bits: bits256,
};
// #endregion asset-id-1
const provider = await Provider.create(LOCAL_NETWORK_URL);

let wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await EchoAssetIdFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

// #region asset-id-3
const { value } = await contract.functions.echo_asset_id_comparison(assetId).simulate();

expect(value).toBeTruthy();
// #endregion asset-id-3
// #endregion full
