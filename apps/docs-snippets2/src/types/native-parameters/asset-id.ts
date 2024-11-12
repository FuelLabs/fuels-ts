import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { InputOutputTypesFactory } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region asset-id-input
const assetId =
  '0x0cfabde7bbe58d253cf3103d8f55d26987b3dc4691205b9299ac6826c613a2e2';
const assetIdInput = { bits: assetId };
// #endregion asset-id-input

const response5 = await contract.functions.asset_id(assetIdInput).get();

// #region asset-id-output
const assetIdOutput = response5.value;
const assetIdFromOutput: string = assetIdOutput.bits;
// #endregion asset-id-output

console.log('equals', assetIdFromOutput === assetId);
