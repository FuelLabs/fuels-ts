// #region signing-3
import { Address, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiverAddress = Address.fromRandom();

const transferAmount = 1000;

const request = new ScriptTransactionRequest();

request.addCoinOutput(receiverAddress, 1000, await provider.getBaseAssetId());

const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: sender,
  accountCoinQuantities: [
    {
      amount: transferAmount,
      assetId: await provider.getBaseAssetId(),
      account: sender,
      changeOutputAccount: sender,
    },
  ],
});

const tx = await sender.sendTransaction(assembledRequest);
await tx.waitForResult();
// #endregion signing-3

const result = await tx.waitForResult();
console.log('Transaction should be successful', result.isStatusSuccess);
