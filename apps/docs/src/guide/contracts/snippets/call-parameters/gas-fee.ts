import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnContextFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await ReturnContextFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region gas-fee
try {
  await contract.functions
    .return_context_amount()
    .callParams({
      forward: [10, await provider.getBaseAssetId()],
      gasLimit: 1,
    })
    .call();
} catch (e) {
  console.log('error', e);
  // error _FuelError: The transaction reverted with reason: "OutOfGas"
}
// #endregion gas-fee
