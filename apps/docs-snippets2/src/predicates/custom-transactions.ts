// #region predicate-custom-transaction
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { ConfigurablePin } from '../typegend';
import type { ConfigurablePinInputs } from '../typegend/predicates/ConfigurablePin';

// Setup
const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });
const assetId = provider.getBaseAssetId();
const amountToFundPredicate = 300_000;
const amountToReceiver = 100_000;

// Instantiate the predicate using valid predicate data, aka the pin we need
// to send the funds to the receiver
const data: ConfigurablePinInputs = [1337];
const predicate = new ConfigurablePin({ provider, data });

// Fund the predicate, so that we can send these funds via predicate logic
// to the receiver
const fundPredicateTx = await sender.transfer(
  predicate.address,
  amountToFundPredicate,
  assetId
);
await fundPredicateTx.waitForResult();
const initialPredicateBalance = await predicate.getBalance(assetId);

// Instantiate the script request
const customRequest = new ScriptTransactionRequest();

// Get the predicate resources that we would like to transfer
const predicateResources = await predicate.getResourcesToSpend([
  { assetId, amount: amountToReceiver },
]);

// Add the resources for the transfer of the asset to the receiver. The resources
// adds the required inputs, and the output is for the transfer to the receiver address
customRequest.addResources(predicateResources);
customRequest.addCoinOutput(receiver.address, amountToReceiver, assetId);

// Estimate the transaction cost and fund accordingly
const txCost = await predicate.getTransactionCost(customRequest);
customRequest.gasLimit = txCost.gasUsed;
customRequest.maxFee = txCost.maxFee;
await predicate.fund(customRequest, txCost);

// Submit the transaction and await it's result
const predicateTx = await predicate.sendTransaction(customRequest);
await predicateTx.waitForResult();
// #endregion predicate-custom-transaction

console.log(
  'initialPredicateBalance to equal amountToFundPredicate',
  initialPredicateBalance.toNumber() === amountToFundPredicate
);
const { isStatusSuccess } = await predicateTx.waitForResult();
console.log('Predicate TX has been successful', isStatusSuccess);
