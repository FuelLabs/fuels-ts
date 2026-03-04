// #region signing-2
import {
  Address,
  Provider,
  ScriptTransactionRequest,
  Signer,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiverAddress = Address.fromRandom();

const request = new ScriptTransactionRequest();

const transferAmount = 1000;

request.addCoinOutput(
  receiverAddress,
  transferAmount,
  await provider.getBaseAssetId()
);

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

const signedTransaction = await sender.signTransaction(assembledRequest);
const transactionId = request.getTransactionId(await provider.getChainId());

const recoveredAddress = Signer.recoverAddress(
  transactionId,
  signedTransaction
);

request.updateWitnessByOwner(recoveredAddress, signedTransaction);

const tx = await provider.sendTransaction(request);
await tx.waitForResult();
// #endregion signing-2

const result = await tx.waitForResult();
console.log('Transaction should be successful', result.isStatusSuccess);
