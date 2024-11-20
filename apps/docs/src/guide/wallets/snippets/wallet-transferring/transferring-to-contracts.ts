// #region transferring-assets-4
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await CounterFactory.deploy(sender);
const { contract } = await deploy.waitForResult();

const amountToTransfer = 400;
const assetId = provider.getBaseAssetId();
const contractId = contract.id;

const tx = await sender.transferToContract(
  contractId,
  amountToTransfer,
  assetId
);

await tx.waitForResult();
// #endregion transferring-assets-4

console.log('balance', (await contract.getBalance(assetId)).toNumber() !== 0);
