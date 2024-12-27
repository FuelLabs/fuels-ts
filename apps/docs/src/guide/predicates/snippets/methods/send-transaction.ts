// #region sendTransaction
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);

await fundPredicate.waitForResult();

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(100),
});

// Get the resources available to send from the predicate.
const predicateCoins = await predicate.getResourcesToSpend([
  { amount: 2000, assetId: baseAssetId },
]);

// Add the predicate input and resources.
transactionRequest.addResources(predicateCoins);

const txCost = await predicate.getTransactionCost(transactionRequest);

transactionRequest.gasLimit = txCost.gasUsed;
transactionRequest.maxFee = txCost.maxFee;

await predicate.fund(transactionRequest, txCost);

// Send the transaction using the predicate
const result = await predicate.sendTransaction(transactionRequest);

await result.waitForResult();
// #endregion sendTransaction

const { isStatusSuccess } = await result.waitForResult();

console.log('Send transaction to be successful', isStatusSuccess);
