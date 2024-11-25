// #region signing-2
import {
  Address,
  Provider,
  ScriptTransactionRequest,
  Signer,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiverAddress = Address.fromRandom();

const request = new ScriptTransactionRequest({
  gasLimit: 10000,
});

request.addCoinOutput(receiverAddress, 1000, provider.getBaseAssetId());

const txCost = await sender.getTransactionCost(request);

request.gasLimit = txCost.gasUsed;
request.maxFee = txCost.maxFee;

await sender.fund(request, txCost);

const signedTransaction = await sender.signTransaction(request);
const transactionId = request.getTransactionId(provider.getChainId());

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
