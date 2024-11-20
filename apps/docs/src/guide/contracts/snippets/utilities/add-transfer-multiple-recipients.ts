// #region add-transfer-2
import type { TransferParams } from 'fuels';
import { Provider, Wallet } from 'fuels';
import { ASSET_A, ASSET_B } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoValuesFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await EchoValuesFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const recipient1 = Wallet.generate({ provider });
const recipient2 = Wallet.generate({ provider });

const transferParams: TransferParams[] = [
  {
    destination: recipient1.address,
    amount: 100,
    assetId: provider.getBaseAssetId(),
  },
  { destination: recipient1.address, amount: 400, assetId: ASSET_A },
  { destination: recipient2.address, amount: 300, assetId: ASSET_B },
];

const { waitForResult } = await contract.functions
  .echo_u64(100)
  .addBatchTransfer(transferParams)
  .call();

await waitForResult();
// #endregion add-transfer-2

const recipientBalanceBaseAsset = await recipient1.getBalance(
  provider.getBaseAssetId()
);
const recipientBalanceAssetA = await recipient1.getBalance(ASSET_A);
const recipientBalanceAssetB = await recipient2.getBalance(ASSET_B);

console.log(
  'Recipient 1 balance (base asset)',
  recipientBalanceBaseAsset.toNumber()
);
console.log('Recipient 1 balance (asset A)', recipientBalanceAssetA.toNumber());
console.log('Recipient 2 balance (asset B)', recipientBalanceAssetB.toNumber());
