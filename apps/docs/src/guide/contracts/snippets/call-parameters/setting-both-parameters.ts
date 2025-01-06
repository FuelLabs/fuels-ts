import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnContextFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await ReturnContextFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region setting-both-parameters
const contractCallGasLimit = 4_000;
const transactionGasLimit = 100_000;

const call = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [10, await provider.getBaseAssetId()],
    gasLimit: contractCallGasLimit,
  })
  .txParams({
    gasLimit: transactionGasLimit,
  })
  .call();
// #endregion setting-both-parameters

const {
  transactionResult: { isStatusSuccess },
} = await call.waitForResult();
console.log('tx successful', isStatusSuccess);
