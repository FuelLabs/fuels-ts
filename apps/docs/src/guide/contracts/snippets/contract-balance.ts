// #region example
import type { AssetId } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { TransferToAddressFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const { waitForResult: waitForDeploy } =
  await TransferToAddressFactory.deploy(wallet);
const { contract } = await waitForDeploy();

const amountToForward = 40;
const amountToTransfer = 10;
const baseAssetId = await provider.getBaseAssetId();

const recipient = Wallet.generate({
  provider,
});

const asset: AssetId = {
  bits: baseAssetId,
};

const { waitForResult } = await contract.functions
  .transfer(amountToTransfer, asset, recipient.address.toB256())
  .callParams({
    forward: [amountToForward, baseAssetId],
  })
  .call();

await waitForResult();

const contractBalance = await contract.getBalance(baseAssetId);
console.log(
  'contract balance reduced by amountToTransfer',
  contractBalance.toNumber() === amountToForward - amountToTransfer
);
// #endregion example
