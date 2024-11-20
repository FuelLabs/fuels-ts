import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnContextFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await ReturnContextFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region forward
const amountToForward = 10;

const { waitForResult } = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [amountToForward, provider.getBaseAssetId()],
  })
  .call();

const { value } = await waitForResult();

console.log('forwarded amount:', value.toNumber());
// forwarded amount: 10
// #endregion forward
