// #region multiple-signers-4
import { Predicate, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';
import { PredicateSigning } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);

const amountToReceiver = 100;
const witnessIndex = 0;

// Create and fund the predicate
const predicate = new PredicateSigning({
  provider,
  data: [signer.address.toB256(), witnessIndex],
});
const baseAssetId = await provider.getBaseAssetId();

const tx = await sender.transfer(predicate.address, 200_000, baseAssetId);
await tx.waitForResult();

// Create the transaction request
const request = new ScriptTransactionRequest();
request.addCoinOutput(receiver.address, amountToReceiver, baseAssetId);

// Get the predicate resources and add them and predicate data to the request
const resources = await predicate.getResourcesToSpend([
  {
    assetId: baseAssetId,
    amount: amountToReceiver,
  },
]);
request.addResources(resources);

let signature = await signer.signTransaction(request);
const signatureIndex = request.addWitness(signature);

// Estimate and fund the request
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: predicate,
  accountCoinQuantities: [
    {
      amount: '0',
      assetId: baseAssetId,
      account: predicate,
      changeOutputAccount: predicate,
    },
  ],
});

signature = await signer.signTransaction(assembledRequest);
assembledRequest.updateWitness(signatureIndex, signature);

// Send the transaction
const res = await provider.sendTransaction(assembledRequest, {
  estimateTxDependencies: false,
});
await res.waitForResult();

// #endregion multiple-signers-4
console.log('balance', (await receiver.getBalance()).toNumber());
