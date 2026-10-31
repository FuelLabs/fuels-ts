import { bn, Predicate, Provider, ScriptTransactionRequest, Wallet, ZeroBytes32 } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum, SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new Predicate({
  bytecode: SimplePredicate.bytecode,
  abi: SimplePredicate.abi,
  data: [ZeroBytes32],
  provider,
});

// Fund the predicate
const fundTx = await wallet.transfer(predicate.address, bn(100_000));
await fundTx.waitForResult();

// #region estimate-gas-price
// Estimate the gas price for the next 10 blocks
const gasPrice = await provider.estimateGasPrice(10);
// #endregion estimate-gas-price

// #region estimate-predicates
const request = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const baseAssetId = await provider.getBaseAssetId();

// Add predicate resources to the transaction
const predicateCoins = await predicate.getResourcesToSpend([
  { amount: 2000, assetId: baseAssetId },
]);
request.addResources(predicateCoins);

// Estimate gas used by predicates in the transaction
const estimatedRequest = await provider.estimatePredicates(request);
// #endregion estimate-predicates

// #region estimate-predicates-and-gas-price
// Estimate both predicates and gas price in a single call
const { transactionRequest, gasPrice: estimatedGasPrice } =
  await provider.estimatePredicatesAndGasPrice(request, 10);
// #endregion estimate-predicates-and-gas-price
