import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ReturnContextFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await ReturnContextFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region cost-estimation-1
const cost = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [100, baseAssetId],
  })
  .getTransactionCost();

console.log('costs', cost);
// #endregion cost-estimation-1

// #region cost-estimation-2
const scope = contract.multiCall([
  contract.functions.return_context_amount().callParams({
    forward: [100, baseAssetId],
  }),
  contract.functions.return_context_amount().callParams({
    forward: [300, baseAssetId],
  }),
]);

const txCost = await scope.getTransactionCost();

console.log('costs', txCost);
// #endregion cost-estimation-2
