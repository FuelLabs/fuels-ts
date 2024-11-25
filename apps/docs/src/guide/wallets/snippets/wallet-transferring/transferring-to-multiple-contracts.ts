// #region transferring-assets-5
import type { ContractTransferParams } from 'fuels';
import { Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, EchoValuesFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = provider.getBaseAssetId();
const assetA = TestAssetId.A.value;

const deploy1 = await CounterFactory.deploy(sender);
const deploy2 = await EchoValuesFactory.deploy(sender);

const { contract: contract1 } = await deploy1.waitForResult();
const { contract: contract2 } = await deploy2.waitForResult();

const contractTransferParams: ContractTransferParams[] = [
  {
    contractId: contract1.id,
    amount: 999,
    assetId: baseAssetId,
  },
  {
    contractId: contract1.id,
    amount: 550,
    assetId: assetA,
  },
  {
    contractId: contract2.id,
    amount: 200,
    assetId: assetA,
  },
];

const transfer = await sender.batchTransferToContracts(contractTransferParams);
await transfer.waitForResult();
// #endregion transferring-assets-5
