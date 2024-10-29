// #region wallet-transferring-6
import type { TransferParams } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const recipient1 = Wallet.generate({ provider });
const recipient2 = Wallet.generate({ provider });

const someOtherAssetId =
  '0x0101010101010101010101010101010101010101010101010101010101010101';
const transfersToMake: TransferParams[] = [
  {
    amount: 100,
    destination: recipient1.address,
    assetId: provider.getBaseAssetId(),
  },
  {
    amount: 200,
    destination: recipient2.address,
    assetId: provider.getBaseAssetId(),
  },
  {
    amount: 300,
    destination: recipient2.address,
    assetId: someOtherAssetId,
  },
];

const tx = await sender.batchTransfer(transfersToMake);
await tx.waitForResult();
// #endregion wallet-transferring-6

const { isStatusSuccess } = await tx.waitForResult();

console.log('Transaction should be successful', isStatusSuccess);
