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

// Create and fund the predicate
const predicate = new Predicate<[string]>({
  bytecode: PredicateSigning.bytecode,
  abi: PredicateSigning.abi,
  provider,
  data: [signer.address.toB256()],
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

// Estimate and fund the request
request.addWitness('0x');
await request.autoCost(predicate, {
  signatureCallback: (txRequest) => txRequest.addAccountWitnesses(signer),
});

// Add the signer as a witness
await request.addAccountWitnesses(signer);

// Send the transaction
const res = await provider.sendTransaction(request);
await res.waitForResult();

// #endregion multiple-signers-4
console.log('balance', (await receiver.getBalance()).toNumber());
